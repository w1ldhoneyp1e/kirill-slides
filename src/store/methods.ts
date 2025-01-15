import {
	type AddPictureAction,
	type ChangeObjectPositionAction,
	type ChangeObjectSizeAction,
	type ChangePresentationNameAction,
	type ChangeSlideBackgroundAction,
	type ChangeTextFontColorAction,
	type ChangeTextFontFamilyAction,
	type ChangeTextFontSizeAction,
	type ChangeTextFontWeightAction,
	type ChangeTextValueAction,
	type DeselectAction,
	type SetSelectionAction,
	type SetSlideIndexAction,
} from './redux/actions.js'
import {
	type BackgroundType,
	type EditorType,
	type PictureType,
	type PositionType,
	type SizeType,
	type SlideObjectType,
	type SlideType,
	type TextType,
} from './types.js'

// изменение названия презентации
function changePresentationName(
	editor: EditorType,
	action: ChangePresentationNameAction,
): EditorType {
	return {
		...editor,
		presentation: {
			...editor.presentation,
			name: action.payload.name,
		},
	}
}

// добавление/удаление слайда
function addSlide(editor: EditorType): EditorType {
	const newEditor = {
		...editor,
		presentation: {
			...editor.presentation,
			slides: [
				...editor.presentation.slides,
				{
					id: getUID(),
					contentObjects: [],
					background: getDefaultBackground(),
					position: null,
				},
			],
		},
	}
	return newEditor
}

function deleteSlide(editor: EditorType): EditorType {
	const slideId = editor.selection.selectedSlideId
	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: editor.presentation.slides.filter(slide => slide.id !== slideId),
		},
		selection: {
			...editor.selection,
			selectedSlideId: '',
		},
	}
}

// изменение позиции слайда в списке
function setSlideIndex(
	editor: EditorType,
	action: SetSlideIndexAction,
): EditorType {
	const {slides} = editor.presentation
	const slideToMove = slides.find(s => s.id === action.payload.id)!
	const baseIndex = slides.indexOf(slideToMove)

	const newSlides = [...slides]
	newSlides.splice(baseIndex, 1)
	newSlides.splice(action.payload.index, 0, slideToMove)

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

// изменение позиции слайда (координат)
function changeSlidePosition(
	editor: EditorType,
	{
		id,
		position,
	}: {
		id: string,
		position: PositionType | null,
	},
): EditorType {
	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === id) {
			return {
				...slide,
				position,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

// добавление/удаление текста и картинки
function addText(editor: EditorType): EditorType {
	const newText = getDefaultText()

	const newSlides = editor.presentation.slides.map(slide =>
		slide.id === editor.selection.selectedSlideId
			? {
				...slide,
				contentObjects: [...slide.contentObjects, newText],
			}
			: slide)

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function addPicture(editor: EditorType, action: {
	payload: {
		src: string,
		width: number,
		height: number,
	},
}): EditorType {
	const {
		src, width, height,
	} = action.payload
	const selectedSlideId = editor.selection.selectedSlideId

	if (!selectedSlideId) {
		console.warn('No slide selected for adding a picture.')
		return editor
	}

	const MAX_WIDTH = 841.89
	const MAX_HEIGHT = 595.28

	const widthRatio = MAX_WIDTH / width
	const heightRatio = MAX_HEIGHT / height
	const scale = Math.min(1, widthRatio, heightRatio) // Масштабируем, только если превышены пределы

	const newPic: PictureType = {
		id: getUID(),
		position: {
			x: 0,
			y: 0,
		},
		size: {
			width: width * scale,
			height: height * scale,
		},
		type: 'picture',
		src,
	}

	const newSlides = editor.presentation.slides.map(slide =>
		slide.id === selectedSlideId
			? {
				...slide,
				contentObjects: [...slide.contentObjects, newPic],
			}
			: slide,
	)

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function deleteObjects(editor: EditorType): EditorType {
	const slide = findSlideById(editor, editor.selection.selectedSlideId)
	console.log('slide ', slide)
	const newSlide = {
		...slide,
		contentObjects: slide.contentObjects.filter(obj =>
			!editor.selection.selectedObjIds.includes(obj.id)),
	}

	const newSlides = editor.presentation.slides.map(s => s.id === slide.id
		? newSlide
		: s)

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
		selection: {
			...editor.selection,
			selectedObjIds: [],
		},
	}
}

// изменение позиции текста/картинки
function changeObjectPosition(
	editor: EditorType,
	action: ChangeObjectPositionAction,
): EditorType {
	const newSlides = editor.presentation.slides.map(slide => {
		const hasTargetObject = slide.contentObjects.some(obj => obj.id === action.payload.id)

		if (hasTargetObject) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === action.payload.id
					? {
						...obj,
						position: action.payload.position,
					}
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}

		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}


// изменение размера текста/картинки
function changeObjectSize(
	editor: EditorType,
	action: ChangeObjectSizeAction,
): EditorType {
	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === action.payload.slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === action.payload.objId
					? setObjectSize(obj, action.payload.size)
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setObjectSize<T extends SlideObjectType>(object: T, size: SizeType): T {
	return {
		...object,
		size,
	}
}

// изменение текста
function changeTextValue(
	editor: EditorType,
	action: ChangeTextValueAction,
): EditorType {
	const {
		slideId,
		objId,
		value,
	} = action.payload

	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === objId
					? setTextValue(obj, value)
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setTextValue(obj: TextType | PictureType, newText: string): TextType | PictureType {
	return obj.type === 'text'
		? {
			...obj,
			value: newText,
		}
		: {...obj}
}

// изменение размера текста
function changeTextFontSize(
	editor: EditorType,
	action: ChangeTextFontSizeAction,
): EditorType {
	const {
		slideId,
		objId,
		fontSize,
	} = action.payload

	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === objId
					? setTextFontSize(obj, fontSize)
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setTextFontSize(obj: TextType | PictureType, newSize: number): TextType | PictureType {
	return obj.type === 'text'
		? {
			...obj,
			fontSize: newSize,
		}
		: {...obj}
}

// изменение семейства шрифтов у текста
function changeTextFontFamily(
	editor: EditorType,
	action: ChangeTextFontFamilyAction,
): EditorType {
	const {
		slideId,
		objId,
		fontFamily,
	} = action.payload

	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === objId
					? setTextFontFamily(obj, fontFamily)
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setTextFontFamily(obj: TextType | PictureType, newFontFamily: string): TextType | PictureType {
	return obj.type === 'text'
		? {
			...obj,
			fontFamily: newFontFamily,
		}
		: {...obj}
}

// изменение цвета текста
function changeTextColor(
	editor: EditorType,
	action: ChangeTextFontColorAction,
): EditorType {
	const {
		slideId,
		objId,
		fontColor,
	} = action.payload

	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === objId
					? setTextColor(obj, fontColor)
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setTextColor(obj: TextType | PictureType, newColor: string): TextType | PictureType {
	return obj.type === 'text'
		? {
			...obj,
			fontColor: newColor,
		}
		: {...obj}
}

function changeTextFontWeight(
	editor: EditorType,
	action: ChangeTextFontWeightAction,
): EditorType {
	const {
		slideId,
		objId,
		fontWeight,
	} = action.payload

	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			const newContentObjects = slide.contentObjects.map(obj =>
				obj.id === objId
					? {
						...obj,
						fontWeight,
					}
					: obj)

			return {
				...slide,
				contentObjects: newContentObjects,
			}
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

// изменение фона слайда
function changeSlideBackground(
	editor: EditorType,
	action: ChangeSlideBackgroundAction,
): EditorType {
	const {
		value,
		type,
	} = action.payload

	const slideId = editor.selection.selectedSlideId
	const newSlides = editor.presentation.slides.map(slide => {
		if (slide.id === slideId) {
			return setSlideBackground(slide, value, type)
		}
		return slide
	})

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	}
}

function setSlideBackground(slide: SlideType, value: string, type: string): SlideType {
	let newBackground: BackgroundType
	if (type === 'solid') {
		newBackground = {
			hexColor: value,
			type: 'solid',
		}
	}
	else if (type === 'image') {
		newBackground = {
			src: value,
			type: 'image',
		}
	}
	else {
		return slide
	}

	return {
		...slide,
		background: newBackground,
	}
}

// выбор объекта или слайда
function setSelection(
	editor: EditorType,
	action: SetSelectionAction,
): EditorType {
	switch (action.payload.type) {
		case 'slide':
			return {
				...editor,
				selection: {
					...editor.selection,
					selectedSlideId: action.payload.id,
				},
			}
		case 'object':
			return {
				...editor,
				selection: {
					...editor.selection,
					selectedObjIds: [...editor.selection.selectedObjIds, action.payload.id],
				},
			}
		default:
			return {...editor}
	}
}

function deselect(
	editor: EditorType,
	action: DeselectAction,
): EditorType {
	switch (action.payload.type) {
		case 'slide':
			return {
				...editor,
				selection: {
					...editor.selection,
					selectedSlideId: '',
				},
			}
		case 'object':
			return {
				...editor,
				selection: {
					...editor.selection,
					selectedObjIds: [],
				},
			}
		default:
			return {...editor}
	}
}

function findSlideById(editor: EditorType, id: string): SlideType {
	return editor.presentation.slides.find(s => s.id === id)!
}

function getUID(): string {
	return (
		Math.random().toString(36)
			.substring(2, 15)
		+ Math.random().toString(36)
			.substring(2, 15)
	)
}

function getDefaultBackground(): BackgroundType {
	const defaultSolid: BackgroundType = {
		hexColor: '#FFFFFF',
		type: 'solid',
	}
	return defaultSolid
}
function getDefaultText() {
	const defaultSize: SizeType = {
		width: 200,
		height: 100,
	}
	const defaultText: TextType = {
		id: getUID(),
		size: defaultSize,
		position: {
			x: 0,
			y: 0,
		},
		value: 'Default text',
		fontSize: 11,
		fontFamily: 'TimesNewRoman',
		fontColor: '#000000',
		type: 'text',
	}
	return defaultText
}


export {
	changePresentationName,
	addSlide,
	deleteSlide,
	changeSlidePosition,
	setSlideIndex,
	addText,
	addPicture,
	changeObjectPosition,
	changeObjectSize,
	changeTextValue,
	changeTextFontSize,
	changeTextFontFamily,
	changeTextColor,
	changeSlideBackground,
	getUID,
	getDefaultBackground,
	deleteObjects,
	setSelection,
	deselect,
	changeTextFontWeight,
}
