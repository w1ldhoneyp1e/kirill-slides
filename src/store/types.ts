type SizeType = {
    width: number,
    height: number
}
type PositionType = {
    x: number,
    y: number
}
type ChooseOptionType = {
    text: string,
    onClick: () => void,
    id: string
}
type ButtonType = {
    type: string,
    text: string,
    onClick: () => void,
    options: ChooseOptionType[],
    id: string,
}

type PresentationType = {
    id: string,
    name: string,
    slides: SlideType[]
}
type SlideType = {
    id: string,
    contentObjects: (TextType | PictureType)[],
    background: BackgroundType
}
 
type ObjectsSelectionType = {
    objectsIds: string[],
    slidesIds: string[]
}
type SlideObjectType = {
    id: string,
    position: PositionType,
    size: SizeType,
    type: string,
}
type TextType = SlideObjectType & {
    value: string,
    fontSize: number,
    fontFamily: string,
    hexColor: string
}
type PictureType = SlideObjectType & {
    src: string
}
type BackgroundType = SolidType | ImageType
type SolidType = {
    hexColor: string,
    type: 'solid'
}
type ImageType = {
    src: string,
    type: 'image'
}
type EditorType = {
    presentations: PresentationType[],
    currentPresentationId: string
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
};