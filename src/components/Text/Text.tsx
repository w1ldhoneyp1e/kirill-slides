import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {useObjectContextMenu} from '../../hooks/useObjectContextMenu'
import {
	type PositionType,
	type SizeType,
	type TextType,
} from '../../store/types'
import {isValidOffset} from '../../utils/isValidOffset'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {boundPosition} from '../../view/utils/boundPosition'
import {Popover} from '../Popover/Popover'
import {ResizeFrame} from '../ResizeFrame/ResizeFrame'
import styles from './Text.module.css'

type TextProps = {
	textId: string,
	slideId: string,
	parentRef: React.RefObject<HTMLDivElement>,
	scale: number,
}

const loadGoogleFont = async (fontFamily: string): Promise<void> => {
	if (!fontFamily || fontFamily === 'inherit') {
		return
	}

	const link = document.createElement('link')
	link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`
	link.rel = 'stylesheet'

	const existingLink = document.querySelector(`link[href="${link.href}"]`)
	if (existingLink) {
		return
	}

	document.head.appendChild(link)

	return new Promise((resolve, reject) => {
		link.onload = () => resolve()
		link.onerror = () => reject()
	})
}

function Text({
	textId,
	slideId,
	parentRef,
	scale,
}: TextProps) {
	const {
		deselect,
		setSelection,
		changeObjectPosition,
		changeTextValue,
	} = useAppActions()
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)
	const text = useAppSelector(
		editor => editor.presentation.slides
			.find(s => s.id === slideId)!.contentObjects
			.find(o => o.id === textId) as TextType,
	)

	const [size, setSize] = useState<SizeType>(text.size)
	const [position, setPosition] = useState<PositionType>(text.position)
	const [isEditing, setIsEditing] = useState(false)
	const [currentText, setCurrentText] = useState(text.value)
	const textRef = useRef<HTMLDivElement>(null)
	const isSelected = selectedObjects.includes(text.id)

	const onMouseMove = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
		const updatedPosition = boundPosition({
			x: text.position.x + delta.x,
			y: text.position.y + delta.y,
		}, parentRef, textRef)

		setPosition(updatedPosition)
	}, [parentRef, text.position])

	const onMouseUp = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
		const updatedPosition = boundPosition({
			x: text.position.x + delta.x,
			y: text.position.y + delta.y,
		}, parentRef, textRef)

		changeObjectPosition({
			id: text.id,
			position: updatedPosition,
		})
	}, [changeObjectPosition, parentRef, text.position, text.id])

	useDragAndDrop({
		ref: textRef,
		onMouseMove,
		onMouseUp,
	})

	const {
		handleContextMenu,
		position: cursorPosition,
		isOpen,
		handleClose,
		contextMenuItems,
	} = useObjectContextMenu()

	useEffect(() => {
		setPosition(text.position)
		setSize(text.size)
		setCurrentText(text.value)
	}, [text.position, text.size, text.value])

	useEffect(() => {
		if (text.fontFamily) {
			loadGoogleFont(text.fontFamily).catch(err => {
				console.error('Ошибка при загрузке шрифта:', err)
			})
		}
	}, [text.fontFamily])

	const handleDoubleClick = () => {
		if (!isEditing) {
			setIsEditing(true)
		}
	}

	const handleBlur = () => {
		changeTextValue({
			slideId,
			objId: textId,
			value: currentText,
		})
		setIsEditing(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentText(e.target.value)
	}

	const style = useMemo(() => ({
		top: position.y * scale,
		left: position.x * scale,
		color: text.fontColor,
		fontSize: text.fontSize * scale,
		width: size.width * scale,
		height: size.height * scale,
		fontFamily: text.fontFamily || 'inherit',
	}), [position.y, position.x, scale, text.fontColor, text.fontSize, size.width, size.height, text.fontFamily])

	return (
		<>
			<div
				ref={textRef}
				className={styles.text}
				style={style}
				onClick={e => e.stopPropagation()}
				onMouseDown={e => {
					deselect({
						type: 'object',
					})
					setSelection({
						type: 'object',
						id: text.id,
					})
					e.preventDefault()
				}}
				onDoubleClick={e => {
					if (!isEditing) {
						handleDoubleClick()
					}
					e.stopPropagation()
				}}
				onContextMenu={handleContextMenu}
			>
				{isEditing
					? (
						<textarea
							value={currentText}
							onChange={handleChange}
							onBlur={handleBlur}
							autoFocus={true}
							className={styles.textarea}
							onClick={e => e.stopPropagation()}
						/>
					)
					: (
						text.value
					)}
				{isOpen && cursorPosition && (
					<div onClick={e => e.stopPropagation()}>
						<Popover
							items={contextMenuItems}
							onClose={handleClose}
							position={cursorPosition}
						/>
					</div>
				)}
			</div>
			{isSelected && scale === 1
				? (
					<ResizeFrame
						parentRef={parentRef}
						objectId={text.id}
						slideId={slideId}
						setPosition={(_position: PositionType) => setPosition(_position)}
						position={position}
						setSize={(_size: SizeType) => setSize(_size)}
						size={size}
					/>
				)
				: null}
		</>
	)
}

export {Text}
