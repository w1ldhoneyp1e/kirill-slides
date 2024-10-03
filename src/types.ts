type Size = {
    width: number,
    height: number
}
type Position = {
    x: number,
    y: number
}
type ChooseOption = {
    text: string,
    onClick: () => void,
    id: string
}
type Button = {
    type: string,
    text: string,
    onClick: () => void,
    options: ChooseOption[],
    id: string,
}
type Presentation = {
    id: string,
    name: string,
    slides: Slide[]
}
type Slide = {
    id: string,
    contentObjects: (TextObj | PictureObj)[],
    background: Background
}
 
type ObjectsSelection = {
    objectsIds: string[],
    slidesIds: string[]
}
type SlideObject = {
    id: string,
    position: Position,
    size: Size
}
type TextObj = SlideObject & {
    text: string,
    fontSize: number,
    family: string,
    hexColor: string
}
type PictureObj = SlideObject & {
    src: string
}
type Background = SolidBackground | ImageBackground
type SolidBackground = {
    hexColor: string,
    type: 'solid'
}
type ImageBackground = {
    src: string,
    type: 'image'
}

export type {
    Size,
    Button,
    ChooseOption,
    Position,
    Presentation,
    Slide,
    ObjectsSelection,
    SlideObject,
    TextObj,
    PictureObj,
    Background,
    SolidBackground,
    ImageBackground,
};