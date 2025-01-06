import {
	type ReactNode,
	useRef,
	useState,
} from 'react'
import {ChevronDown24px} from '../../assets/icons/ChevronDown24px'
import {Button} from '../Button/Button'
import {type PopoverItem, Popover} from '../Popover/Popover'

type SelectButtonOption = {
	text: string,
	onClick: () => void,
	icon?: ReactNode,
}

type SelectButtonProps = {
	options: SelectButtonOption[],
	defaultOptionIndex?: number,
	className?: string,
}

const SelectButton: React.FC<SelectButtonProps> = ({
	options,
	defaultOptionIndex = 0,
	className,
}) => {
	const [selectedIndex, setSelectedIndex] = useState(defaultOptionIndex)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const buttonRef = useRef<HTMLDivElement>(null)

	if (options.length < 2) {
		console.error('SelectButton requires at least two options.')
		return null
	}

	const handleOptionClick = (index: number) => {
		setSelectedIndex(index)
		options[index].onClick()
		setIsPopoverOpen(false)
	}

	const popoverItems: PopoverItem[] = options
		.map((option, index) => ({
			originalIndex: index,
			...option,
		}))
		.filter((_, index) => index !== selectedIndex)
		.map(({
			originalIndex, text, icon,
		}) => {
			if (icon) {
				return {
					type: 'icon-text',
					text,
					icon: icon as JSX.Element,
					onClick: () => handleOptionClick(originalIndex),
				} as PopoverItem
			}
			return {
				type: 'text',
				text,
				onClick: () => handleOptionClick(originalIndex),
			} as PopoverItem
		})

	return (
		<div
			className={className}
			ref={buttonRef}
		>
			<Button
				type="icon-text-icon"
				state="default"
				text={options[selectedIndex].text}
				icon={options[selectedIndex].icon || null}
				rightIcon={ChevronDown24px}
				onClick={() => {
					options[selectedIndex].onClick()
				}}
				onRightIconClick={() => {
					setIsPopoverOpen(!isPopoverOpen)
				}}
			/>
			{isPopoverOpen && (
				<Popover
					items={popoverItems}
					onClose={() => setIsPopoverOpen(false)}
					anchorRef={buttonRef}
				/>
			)}
		</div>
	)
}

export {
	SelectButton,
	type SelectButtonOption,
}
