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
    SlideObjectType,
    TextType,
    PictureType,
    BackgroundType,
    SolidType,
    ImageType,
    EditorType,
    SelectionType,
}
