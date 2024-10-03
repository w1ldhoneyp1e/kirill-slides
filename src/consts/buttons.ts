import { getUID } from "../methods";
import { Button } from "../types";

const toolbarButtons: Button[] = [
    {
        type: 'button',
        text: 'создать слайд',
        onClick: function (): void {},
        options: [],
        id: getUID()
    },
    {
        type: 'button',
        text: 'добавить текст',
        onClick: function (): void {},
        options: [],
        id: getUID()
    },
    {
        type: 'button',
        text: 'добавить картинку',
        onClick: function (): void {},
        options: [],
        id: getUID()
    },
    {
        type: 'select',
        text: 'шрифт',
        onClick: function (): void {},
        options: [
            {
                text: 'Times New Roman',
                onClick: () => {},
                id: getUID()
            },
            {
                text: 'Roboto',
                onClick: () => {},
                id: getUID()
            },
            {
                text: 'Montserrat',
                onClick: () => {},
                id: getUID()
            },
        ],
        id: getUID()
    },
    {
        type: 'select',
        text: 'размер шрифта',
        onClick: function (): void {},
        options: [
            {
                text: '14',
                onClick: () => {},
                id: getUID()
            },
            {
                text: '16',
                onClick: () => {},
                id: getUID()
            },
            {
                text: '18',
                onClick: () => {},
                id: getUID()
            },
        ],
        id: getUID()
    },
    {
        type: 'button',
        text: 'фон',
        onClick: function (): void {},
        options: [],
        id: getUID()
    },
]

export {toolbarButtons};