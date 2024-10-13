import { Background, Picture, Position, Presentation, Size, Slide, SlideObject, Text } from './types.js';

// изменение названия презентации
function changePresentationName(presentation: Presentation, newName: string): Presentation {
    return {
        ...presentation,
        name: newName
    }
}

// добавление/удаление слайда
function addSlide(presentation: Presentation): Presentation {
    const newPresentation = {
        ...presentation
    }
    const newSlide: Slide = {
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

function deleteSlide(presentation: Presentation, slideIdToDelete: string): Presentation {
    const newPresentation: Presentation = {
        ...presentation
    }
    newPresentation.slides = presentation.slides.filter((slide) => slide.id !== slideIdToDelete);
    return newPresentation;
}

// изменение позиции слайда
function changeSlidePosition(presentation: Presentation, {slideId, positionToMove}: {slideId: string, positionToMove: number}): Presentation {
    const newPresentation = {
        ...presentation
    }
    const collection: Slide[] = newPresentation.slides
    const slideToMove = collection.find(s => s.id === slideId)!;
    const baseIndex = collection.indexOf(slideToMove);
    
    newPresentation.slides.splice(baseIndex, 1);
    newPresentation.slides.splice(positionToMove, 0, slideToMove);

    return newPresentation;
}

// добавление/удаление текста и картинки
function addText(presentation: Presentation, id: string): Presentation {
    const newText = getDefaultText();
    let newPresentation = {
        ...presentation
    }
    const wantedSlide: Slide = findSlideById(presentation.slides, id);
    wantedSlide.contentObjects.push(newText)

    newPresentation = updateSlide(newPresentation, wantedSlide)
    
    return newPresentation;
}

function addPicture(presentation: Presentation, {id, src}: {id: string, src: string}): Presentation {
    let newPresentation = {
        ...presentation
    }
    const wantedSlide: Slide = findSlideById(newPresentation.slides, id);
    const newPic: Picture = {
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
    presentation: Presentation, 
    {slideId, objId, position}: 
    {slideId: string, objId: string, position: Position}): Presentation {
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
function setObjectPosition<T extends SlideObject>(object: T, position: Position): T {
    return {
        ...object,
        position,
    };
}

// изменение размера текста/картинки
function changeObjectSize(
    presentation: Presentation, 
    {slideId, objId, size}: 
    {slideId: string, objId: string, size: Size}): Presentation{
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
function setObjectSize<T extends SlideObject>(object: T, size: Size): T {
    return {
        ...object,
        size,
    };
}

// изменение текста
function changeTextValue(
    presentation: Presentation, 
    {slideId, objId, value}: 
    {slideId: string, objId: string, value: string}): Presentation{
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
function setTextValue(obj: Text | Picture, newText: string): Text | Picture {
    return (obj.type === 'text')
    ?  {...obj, value: newText}
    : {...obj}
}

// изменение размера текста
function changeTextFontSize(
    presentation: Presentation, 
    {slideId, objId, fontSize}: 
    {slideId: string, objId: string, fontSize: number}): Presentation{
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
function setTextFontSize(obj: Text | Picture, newSize: number): Text | Picture {
    return (obj.type === 'text')
    ?  {...obj, fontSize: newSize}
    : {...obj}
}

// изменение семейства шрифтов у текста
function changeTextFontFamily(
    presentation: Presentation, 
    {slideId, objId, fontFamily}: 
    {slideId: string, objId: string, fontFamily: string}): Presentation{
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
function setTextFontFamily(obj: Text | Picture, newFontFamily: string): Text | Picture {
    return (obj.type === 'text')
    ?  {...obj, fontFamily: newFontFamily}
    : {...obj}
}
// изменение цвета текста
function changeTextColor(
    presentation: Presentation, 
    {slideId, objId, newColor}: 
    {slideId: string, objId: string, newColor: string}): Presentation{
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
function setTextColor(obj: Text | Picture, newColor: string): Text | Picture {
    return (obj.type === 'text')
    ?  {...obj, hexColor: newColor}
    : {...obj}
}

// изменение фона слайда
function changeSlideBackground(
    presentation: Presentation, 
    {slideId, value, type}: 
    {slideId: string, value: string, type: string}): Presentation{
    const newPresentation = {
        ...presentation
    }
    let thisSlide = newPresentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newPresentation.slides.indexOf(thisSlide)
    thisSlide = setSlideBackground(thisSlide, value, type)
    newPresentation.slides[indexOfSlide] = thisSlide
    return newPresentation;
}
function setSlideBackground(slide: Slide, value: string, type: string): Slide {
    let newBackground: Background;
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

function getDefaultBackground(): Background {
    const defaultSolid: Background = {
        hexColor: '#000000',    //
        type: 'solid'
    };
    return defaultSolid;
}
function getDefaultText() {
    const defaultPosition: Position = {
        x: 0,
        y: 0,
    };
    const defaultSize: Size = {
        width: 0,
        height: 0,
    };
    const defaultText: Text = {
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

// function findPresentationById(presentations: Presentation[], id: string): Presentation {
//     return presentations.find(s => s.id === id)!;
// }

function findSlideById(collection: Slide[], id: string): Slide {
    return collection.find(s => s.id === id)!
}
// function updatePresentation(editor: Editor, presentation: Presentation): Editor {
//     const newEditor = {
//         ...editor
//     }
//     const presentationToUpdate = newEditor.presentations.find(p => p.id === presentation.id)!;
//     const index = newEditor.presentations.indexOf(presentationToUpdate);
    
//     newEditor.presentations.splice(index, 1, presentation);

//     return newEditor;
// }
function updateSlide(presentation: Presentation, slide: Slide): Presentation {
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