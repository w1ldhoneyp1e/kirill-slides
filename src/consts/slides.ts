import { getDefaultBackground, getUID } from "../methods";
import { Slide } from "../types";

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
]

export {slides};