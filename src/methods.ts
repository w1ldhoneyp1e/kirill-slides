import { Background, PictureObj, Position, Presentation, Size, Slide, SolidBackground, TextObj } from './types.js';

// изменение названия презентации
function changePresentationName(presentation:Presentation, newName: string): Presentation {
    return {
        ...presentation,
        name: newName
    };
}

// добавление/удаление слайда
function addSlide(collection: Slide[]): Slide[] {
    const newSlide: Slide = {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    };
    return [...collection, newSlide];
}
function deleteSlide(collection: Slide[], slideIdToDelete: string): Slide[] {
    // const newCollection = collection;
    // for (let i = 0; i < newCollection.length; i++) {
    //     if (newCollection[i].id === slideIdToDelete) {
    //         newCollection.splice(i);
    //         break;
    //     }
    // }
    
    return [...collection].filter((slide) => slide.id !== slideIdToDelete);;
}

// изменение позиции слайда
function changeSlidePosition(collection: Slide[], slideId: string, positionToMove: number): Slide[] {
    const slideToMove = collection.find(s => s.id === slideId)!;
    const originalIndex = collection.indexOf(slideToMove);
    
    const newCollection = [...collection];
    newCollection.splice(originalIndex, 1);
    newCollection.splice(positionToMove, 0, slideToMove);
    
    return newCollection;
}

// добавление/удаление текста и картинки
function addText(slide: Slide): Slide {
    const newText: TextObj = {
        id: getUID(),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 100,
            height: 30
        },
        text: '',
        fontSize: 11,
        family: 'Times New Roman',
        hexColor: 'black'
    };
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, newText]
    };
}
function addPicture(slide: Slide, src: string): Slide {
    const newPic: PictureObj = {
        id: getUID(),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 200,
            height: 200
        },
        src: src
    };
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, newPic]
    };
}
// изменение позиции текста/картинки
function setObjectPosition<T extends PictureObj | TextObj>(object: T, _position: Position): T {
    return {
        ...object,
        position: _position
    };
}


// изменение размера текста/картинки
function setObjectSize<T extends PictureObj | TextObj>(object: T, size: Size): T {
    return {
        ...object,
        size: size
    };
}

// изменение текста
function setTextValue(text:TextObj, newText: string): TextObj {
    return {
        ...text,
        text: newText
    };
}

// изменение размера текста
function setTextFontSize(text:TextObj, newSize: number): TextObj {
    return {
        ...text,
        fontSize: newSize
    };
}

// изменение семейства шрифтов у текста
function setTextFamily(text:TextObj, newTextFamily: string): TextObj {
    return {
        ...text,
        family: newTextFamily
    };
}

function setTextColor(text:TextObj, newColor: string): TextObj {
    return {
        ...text,
        hexColor: newColor
    };
}

// изменение фона слайда
function setSlideBackground(slide:Slide, newBackground: Background): Slide {
    return {
        ...slide,
        background: newBackground
    };
}

function getUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getDefaultBackground(): Background {
    const defaultSolid: SolidBackground = {
        hexColor: 'white',
        type: 'solid'
    };
    return defaultSolid;
}

export {
    changePresentationName,
    addSlide,
    deleteSlide,
    changeSlidePosition,
    addText,
    addPicture,
    setObjectPosition,
    setObjectSize,
    setTextValue,
    setTextFontSize,
    setTextFamily,
    setTextColor,
    setSlideBackground,
    getUID,
    getDefaultBackground,
};