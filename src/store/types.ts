type SizeType = {
	width: number
	height: number
}
type PositionType = {
	x: number
	y: number
}
type SelectionType = {
	selectedSlideId: string
	selectedObjIds: string[]
}
type ChooseOptionType = {
	text: string
	onClick: () => void
	id: string
}
type ButtonType = {
	type: string
	text: string
	onClick: () => void
	options: ChooseOptionType[]
	id: string
	isDisable: boolean
}

type PresentationType = {
	id: string
	name: string
	slides: SlideType[]
}
type SlideType = {
	id: string
	contentObjects: (TextType | PictureType)[]
	background: BackgroundType
	position: PositionType | null
}

type ObjectsSelectionType = {
	objectsIds: string[]
	slidesIds: string[]
}
type SlideObjectType = {
	id: string
	size: SizeType,
	position: PositionType,
}
type TextType = SlideObjectType & {
	value: string
	fontSize: number
	fontFamily: string
	hexColor: string
	type: 'text'
}
type PictureType = SlideObjectType & {
	src: string
	type: 'picture'
}
type BackgroundType = SolidType | ImageType
type SolidType = {
	hexColor: string
	type: 'solid'
}
type ImageType = {
	src: string
	type: 'image'
}
type EditorType = {
	presentation: PresentationType
	selection: SelectionType
}

export type {
    SizeType,
    PositionType,
    PresentationType,
    SlideType,
    ObjectsSelectionType,
    SlideObjectType,
    TextType,
    PictureType,
    BackgroundType,
    SolidType,
    ImageType,
    ButtonType,
    EditorType,
    ChooseOptionType,
    SelectionType,
}
