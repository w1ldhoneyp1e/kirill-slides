import { BackgroundType, PictureType, PositionType, PresentationType, SizeType, SlideType, SlideObjectType, TextType } from './types.js';

// изменение названия презентации
function changePresentationName(presentation: PresentationType, newName: string): PresentationType {
    return {
        ...presentation,
        name: newName
    }
}

// добавление/удаление слайда
function addSlide(presentation: PresentationType): PresentationType {
    const newPresentation = {
        ...presentation
    }
    const newSlide: SlideType = {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    };
    newPresentation.slides = [
        ...newPresentation.slides,
        newSlide
    ]
    return newPresentation
}

function deleteSlide(presentation: PresentationType, slideIdToDelete: string): PresentationType {
    const newPresentation: PresentationType = {
        ...presentation
    }
    newPresentation.slides = presentation.slides.filter((slide) => slide.id !== slideIdToDelete);
    return newPresentation;
}

// изменение позиции слайда
function changeSlidePosition(presentation: PresentationType, {slideId, positionToMove}: {slideId: string, positionToMove: number}): PresentationType {
    const newPresentation = {
        ...presentation
    }
    const collection: SlideType[] = newPresentation.slides
    const slideToMove = collection.find(s => s.id === slideId)!;
    const baseIndex = collection.indexOf(slideToMove);
    
    newPresentation.slides.splice(baseIndex, 1);
    newPresentation.slides.splice(positionToMove, 0, slideToMove);

    return newPresentation;
}

// добавление/удаление текста и картинки
function addText(presentation: PresentationType, id: string): PresentationType {
    const newText = getDefaultText();
    let newPresentation = {
        ...presentation
    }
    const wantedSlide: SlideType = findSlideById(presentation.slides, id);
    wantedSlide.contentObjects.push(newText)

    newPresentation = updateSlide(newPresentation, wantedSlide)
    
    return newPresentation;
}

function addPicture(presentation: PresentationType, {id, src}: {id: string, src: string}): PresentationType {
    let newPresentation = {
        ...presentation
    }
    const wantedSlide: SlideType = findSlideById(newPresentation.slides, id);
    const newPic: PictureType = {
        id: getUID(),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 200,
            height: 200
        },
        type: 'picture',
        src: src
    };
    wantedSlide.contentObjects.push(newPic)

    newPresentation = updateSlide(newPresentation, wantedSlide)

    return newPresentation;
}
// изменение позиции текста/картинки
function changeObjectPosition(
    presentation: PresentationType, 
    {slideId, objId, position}: 
    {slideId: string, objId: string, position: PositionType}): PresentationType {
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setObjectPosition(obj, position)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setObjectPosition<T extends SlideObjectType>(object: T, position: PositionType): T {
    return {
        ...object,
        position,
    };
}

// изменение размера текста/картинки
function changeObjectSize(
    presentation: PresentationType, 
    {slideId, objId, size}: 
    {slideId: string, objId: string, size: SizeType}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setObjectSize(obj, size)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setObjectSize<T extends SlideObjectType>(object: T, size: SizeType): T {
    return {
        ...object,
        size,
    };
}

// изменение текста
function changeTextValue(
    presentation: PresentationType, 
    {slideId, objId, value}: 
    {slideId: string, objId: string, value: string}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextValue(obj, value)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setTextValue(obj: TextType | PictureType, newText: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, value: newText}
    : {...obj}
}

// изменение размера текста
function changeTextFontSize(
    presentation: PresentationType, 
    {slideId, objId, fontSize}: 
    {slideId: string, objId: string, fontSize: number}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextFontSize(obj, fontSize)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setTextFontSize(obj: TextType | PictureType, newSize: number): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, fontSize: newSize}
    : {...obj}
}

// изменение семейства шрифтов у текста
function changeTextFontFamily(
    presentation: PresentationType, 
    {slideId, objId, fontFamily}: 
    {slideId: string, objId: string, fontFamily: string}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextFontFamily(obj, fontFamily)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setTextFontFamily(obj: TextType | PictureType, newFontFamily: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, fontFamily: newFontFamily}
    : {...obj}
}
// изменение цвета текста
function changeTextColor(
    presentation: PresentationType, 
    {slideId, objId, newColor}: 
    {slideId: string, objId: string, newColor: string}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    const thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextColor(obj, newColor)
    thisSlide.contentObjects[indexOfObj] = obj
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setTextColor(obj: TextType | PictureType, newColor: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, hexColor: newColor}
    : {...obj}
}

// изменение фона слайда
function changeSlideBackground(
    presentation: PresentationType, 
    {slideId, value, type}: 
    {slideId: string, value: string, type: string}): PresentationType{
    const newPresentation = {
        ...presentation
    }
    let thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    thisSlide = setSlideBackground(thisSlide, value, type)
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setSlideBackground(slide: SlideType, value: string, type: string): SlideType {
    let newBackground: BackgroundType;
    if (type === 'solid') {
        newBackground = {
            hexColor: value,
            type: 'solid',
        }
        return {
            ...slide,
            background: newBackground,
        };
    }
    if (type === 'image') {
        newBackground = {
            src: value,
            type: 'image',
        }
        return {
            ...slide,
            background: newBackground,
        };
    }
    return {
        ...slide,
    };
}

function getUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getDefaultBackground(): BackgroundType {
    const defaultSolid: BackgroundType = {
        hexColor: '#000000',    //
        type: 'solid'
    };
    return defaultSolid;
}
function getDefaultText() {
    const defaultPosition: PositionType = {
        x: 0,
        y: 0,
    };
    const defaultSize: SizeType = {
        width: 0,
        height: 0,
    };
    const defaultText: TextType = {
        id: getUID(),
        position: defaultPosition,
        size: defaultSize,
        value: 'Default text',
        fontSize: 11,
        fontFamily: 'TimesNewRoman',
        hexColor: '#000000',
        type: 'text',
    };
    return defaultText;
}

// function findPresentationById(presentations: PresentationType[], id: string): PresentationType {
//     return presentations.find(s => s.id === id)!;
// }

function findSlideById(collection: SlideType[], id: string): SlideType {
    return collection.find(s => s.id === id)!
}
// function updatePresentation(editor: Editor, presentation: PresentationType): Editor {
//     const newEditor = {
//         ...editor
//     }
//     const presentationToUpdate = newEditor.presentations.find(p => p.id === presentation.id)!;
//     const index = newEditor.presentations.indexOf(presentationToUpdate);
    
//     newEditor.presentations.splice(index, 1, presentation);

//     return newEditor;
// }
function updateSlide(presentation: PresentationType, slide: SlideType): PresentationType {
    const newPresentation = {
        ...presentation
    }
    const slideToUpdate = newPresentation.slides.find(s => s.id === slide.id)!;
    const index = newPresentation.slides.indexOf(slideToUpdate);
    
    newPresentation.slides.splice(index, 1, slide);

    return newPresentation
}

export {
    changePresentationName,
    addSlide,
    deleteSlide,
    changeSlidePosition,
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
};