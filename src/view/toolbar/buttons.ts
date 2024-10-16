import { dispatch } from "../../store/editor";
import { addSlide, deleteSlide, getUID } from "../../store/methods";
import { ButtonType } from "../../store/types";

const buttons: ButtonType[] = [
    {
        type: 'button',
        text: 'Создать слайд',
        onClick: () => dispatch(addSlide),
        options: [],
        id: getUID(),
    },
    {
        type: 'button',
        text: 'Удалить слайд',
        onClick: () => dispatch(deleteSlide),
        options: [],
        id: getUID(),
    },
    // {
    //     type: 'button',
    //     text: 'добавить текст',
    //     onClick: ,
    //     options: [],
    //     id: getUID()
    // },
    // {
    //     type: 'button',
    //     text: 'добавить картинку',
    //     onClick: function (): void {},
    //     options: [],
    //     id: getUID()
    // },
    // {
    //     type: 'select',
    //     text: 'шрифт',
    //     onClick: function (): void {},
    //     options: [
    //         {
    //             text: 'Times New Roman',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //         {
    //             text: 'Roboto',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //         {
    //             text: 'Montserrat',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //     ],
    //     id: getUID()
    // },
    // {
    //     type: 'select',
    //     text: 'размер шрифта',
    //     onClick: function (): void {},
    //     options: [
    //         {
    //             text: '14',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //         {
    //             text: '16',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //         {
    //             text: '18',
    //             onClick: () => {},
    //             id: getUID()
    //         },
    //     ],
    //     id: getUID()
    // },
    // {
    //     type: 'color-input',
    //     text: 'Фон',
    //     onChange: (e) => dispatch(changeSlideBackground, {value: e.target.value}),
    //     options: [],
    //     id: getUID()
    // },
]

export {buttons};