import { BackgroundType, PictureType, PositionType, SizeType, SlideType, SlideObjectType, TextType, EditorType } from './types.js';

// изменение названия презентации
function changePresentationName(editor: EditorType, {newName}: {newName: string}): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: newName}
    }
}

// добавление/удаление слайда
function addSlide(editor: EditorType): EditorType {
    const newEditor = {
        ...editor
    }
    const newSlide: SlideType = {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    };
    newEditor.presentation.slides = [
        ...editor.presentation.slides,
        newSlide,
    ]
    return newEditor
}

function deleteSlide(editor: EditorType): EditorType {
    const newEditor: EditorType = {
        ...editor
    }
    if (editor) {
        const slideId = newEditor.selection.selectedSlideId
        newEditor.presentation.slides = newEditor.presentation.slides.filter((slide) => slide.id !== slideId);
    }
    return newEditor;
}

// изменение позиции слайда
function changeSlidePosition(editor: EditorType, {slideId, positionToMove}: {slideId: string, positionToMove: number}): EditorType {
    const newEditor = {
        ...editor
    }
    const collection: SlideType[] = newEditor.presentation.slides
    const slideToMove = collection.find(s => s.id === slideId)!;
    const baseIndex = collection.indexOf(slideToMove);
    
    newEditor.presentation.slides.splice(baseIndex, 1);
    newEditor.presentation.slides.splice(positionToMove, 0, slideToMove);

    return newEditor;
}

// добавление/удаление текста и картинки
function addText(editor: EditorType, id: string): EditorType {
    const newText = getDefaultText();
    let newEditor = {
        ...editor
    }
    const wantedSlide: SlideType = findSlideById(editor.presentation.slides, id);
    wantedSlide.contentObjects.push(newText)

    newEditor = updateSlide(newEditor, wantedSlide)
    
    return newEditor;
}

function addPicture(editor: EditorType, {id, src}: {id: string, src: string}): EditorType {
    let newEditor = {
        ...editor
    }
    const wantedSlide: SlideType = findSlideById(newEditor.presentation.slides, id);
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

    newEditor = updateSlide(newEditor, wantedSlide)

    return newEditor;
}
// изменение позиции текста/картинки
function changeObjectPosition(
    editor: EditorType, 
    {slideId, objId, position}: 
    {slideId: string, objId: string, position: PositionType}): EditorType {
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setObjectPosition(obj, position)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setObjectPosition<T extends SlideObjectType>(object: T, position: PositionType): T {
    return {
        ...object,
        position,
    };
}

// изменение размера текста/картинки
function changeObjectSize(
    editor: EditorType, 
    {slideId, objId, size}: 
    {slideId: string, objId: string, size: SizeType}): EditorType{
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setObjectSize(obj, size)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setObjectSize<T extends SlideObjectType>(object: T, size: SizeType): T {
    return {
        ...object,
        size,
    };
}

// изменение текста
function changeTextValue(
    editor: EditorType, 
    {slideId, objId, value}: 
    {slideId: string, objId: string, value: string}): EditorType{
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextValue(obj, value)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setTextValue(obj: TextType | PictureType, newText: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, value: newText}
    : {...obj}
}

// изменение размера текста
function changeTextFontSize(
    editor: EditorType, 
    {slideId, objId, fontSize}: 
    {slideId: string, objId: string, fontSize: number}): EditorType{
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextFontSize(obj, fontSize)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setTextFontSize(obj: TextType | PictureType, newSize: number): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, fontSize: newSize}
    : {...obj}
}

// изменение семейства шрифтов у текста
function changeTextFontFamily(
    editor: EditorType, 
    {slideId, objId, fontFamily}: 
    {slideId: string, objId: string, fontFamily: string}): EditorType{
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextFontFamily(obj, fontFamily)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setTextFontFamily(obj: TextType | PictureType, newFontFamily: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, fontFamily: newFontFamily}
    : {...obj}
}
// изменение цвета текста
function changeTextColor(
    editor: EditorType, 
    {slideId, objId, newColor}: 
    {slideId: string, objId: string, newColor: string}): EditorType{
    const newEditor = {
        ...editor
    }
    const thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    let obj = thisSlide.contentObjects.find(o => o.id === objId)!;
    const indexOfObj = thisSlide.contentObjects.indexOf(obj)
    obj = setTextColor(obj, newColor)
    thisSlide.contentObjects[indexOfObj] = obj
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
}
function setTextColor(obj: TextType | PictureType, newColor: string): TextType | PictureType {
    return (obj.type === 'text')
    ?  {...obj, hexColor: newColor}
    : {...obj}
}

// изменение фона слайда
function changeSlideBackground(
    editor: EditorType, 
    {value, type}: 
    {value: string, type: string}): EditorType{
    const newEditor = {
        ...editor
    }
    const slideId = editor.selection.selectedSlideId
    let thisSlide = newEditor.presentation.slides.find(s => s.id === slideId)!
    const indexOfSlide = newEditor.presentation.slides.indexOf(thisSlide)
    thisSlide = setSlideBackground(thisSlide, value, type)
    newEditor.presentation.slides[indexOfSlide] = thisSlide
    return newEditor;
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

function setSlideAsSelected(editor: EditorType, {slideId}: {slideId: string}) {
    console.log('methods  ', editor);
    
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlideId: slideId,
        }
    }
}

function getUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getDefaultBackground(): BackgroundType {
    const defaultSolid: BackgroundType = {
        hexColor: '#FFFFFF',    
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

// function findPresentationById(presentations: EditorType[], id: string): EditorType {
//     return presentations.find(s => s.id === id)!;
// }

function findSlideById(collection: SlideType[], id: string): SlideType {
    return collection.find(s => s.id === id)!
}
// function updatePresentation(editor: Editor, editor: EditorType): Editor {
//     const newEditor = {
//         ...editor
//     }
//     const presentationToUpdate = newEditor.presentations.find(p => p.id === editor.id)!;
//     const index = newEditor.presentations.indexOf(presentationToUpdate);
    
//     newEditor.presentations.splice(index, 1, editor);

//     return newEditor;
// }
function updateSlide(editor: EditorType, slide: SlideType): EditorType {
    const newEditor = {
        ...editor
    }
    const slideToUpdate = newEditor.presentation.slides.find(s => s.id === slide.id)!;
    const index = newEditor.presentation.slides.indexOf(slideToUpdate);
    
    newEditor.presentation.slides.splice(index, 1, slide);

    return newEditor
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
    setSlideAsSelected,
};