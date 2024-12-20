import {
    ChangeObjectPositionAction,
    ChangeObjectSizeAction,
    ChangePresentationNameAction,
    DeselectAction, SetSelectionAction,
    SetSlideIndexAction,
} from './redux/actions.js'
import {
    BackgroundType,
    PictureType,
    PositionType,
    SizeType,
    SlideType,
    SlideObjectType,
    TextType,
    EditorType,
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
            slides: editor.presentation.slides.filter((slide) => slide.id !== slideId),
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
    const { slides } = editor.presentation
    const slideToMove = slides.find((s) => s.id === action.payload.id)!
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
        id: string;
        position: PositionType | null
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

function addPicture(editor: EditorType): EditorType {
    const newPic: PictureType = {
        id: getUID(),
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 200,
            height: 200,
        },
        type: 'picture',
        src: getB64Pic(),
    }

    const newSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection.selectedSlideId
            ? {
                ...slide,
                contentObjects: [...slide.contentObjects, newPic],
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

function deleteObjects(editor: EditorType): EditorType {
    const slide = findSlideById(editor, editor.selection.selectedSlideId)
    const newSlide = {
        ...slide,
        contentObjects: slide.contentObjects.filter((obj) =>
            !editor.selection.selectedObjIds.includes(obj.id)),
    }

    const newSlides = editor.presentation.slides.map(s => s.id === slide.id ? newSlide : s)

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
    {
        slideId, objId, value,
    }: { slideId: string; objId: string; value: string },
): EditorType {
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
    return obj.type === 'text' ? {
        ...obj,
        value: newText,
    } : { ...obj }
}

// изменение размера текста
function changeTextFontSize(
    editor: EditorType,
    {
        slideId, objId, fontSize,
    }: { slideId: string; objId: string; fontSize: number },
): EditorType {
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
    return obj.type === 'text' ? {
        ...obj,
        fontSize: newSize,
    } : { ...obj }
}

// изменение семейства шрифтов у текста
function changeTextFontFamily(
    editor: EditorType,
    {
        slideId, objId, fontFamily,
    }: { slideId: string; objId: string; fontFamily: string },
): EditorType {
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
        : { ...obj }
}

// изменение цвета текста
function changeTextColor(
    editor: EditorType,
    {
        slideId, objId, newColor,
    }: { slideId: string; objId: string; newColor: string },
): EditorType {
    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === slideId) {
            const newContentObjects = slide.contentObjects.map(obj =>
                obj.id === objId
                    ? setTextColor(obj, newColor)
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
    return obj.type === 'text' ? {
        ...obj,
        hexColor: newColor,
    } : { ...obj }
}

// изменение фона слайда
function changeSlideBackground(
    editor: EditorType,
    {
        value, type,
    }: { value: string; type: string },
): EditorType {
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
    } else if (type === 'image') {
        newBackground = {
            src: value,
            type: 'image',
        }
    } else {
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
        return { ...editor }
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
        return { ...editor }
    }
}

function findSlideById(editor: EditorType, id: string): SlideType {
    return editor.presentation.slides.find((s) => s.id === id)!
}

function getUID(): string {
    return (
        Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
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
        hexColor: '#000000',
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
}

function getB64Pic() {
    return 'data:image/jpeg;base64,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'
}
