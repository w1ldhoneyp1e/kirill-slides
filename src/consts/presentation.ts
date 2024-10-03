import { getUID } from "../methods";
import { Presentation } from "../types";
import { slides } from "./slides";

const myPres: Presentation = {
    id: getUID(),
    name: 'New Presentation',
    slides: slides
}
export {myPres};