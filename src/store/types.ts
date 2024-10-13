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
    contentObjects: (Text | Picture)[],
    background: Background
}
 
type ObjectsSelection = {
    objectsIds: string[],
    slidesIds: string[]
}
type SlideObject = {
    id: string,
    position: Position,
    size: Size,
    type: string,
}
type Text = SlideObject & {
    value: string,
    fontSize: number,
    fontFamily: string,
    hexColor: string
}
type Picture = SlideObject & {
    src: string
}
type Background = Solid | Image
type Solid = {
    hexColor: string,
    type: 'solid'
}
type Image = {
    src: string,
    type: 'image'
}
type Editor = {
    presentations: Presentation[],
    currentPresentationId: string
}

export type {
    Size,
    Position,
    Presentation,
    Slide,
    ObjectsSelection,
    SlideObject,
    Text,
    Picture,
    Background,
    Solid,
    Image,
    Button,
    Editor,
};