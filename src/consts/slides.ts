import { getDefaultBackground, getUID } from "../store/methods";
import { Slide } from "../store/types";

const slides: Slide[] = [
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
]

export {slides};