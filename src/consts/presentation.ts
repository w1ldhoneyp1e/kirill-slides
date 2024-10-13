import { getUID } from "../store/methods";
import { Presentation } from "../store/types";
import { slides } from "./slides";

const myPres: Presentation = {
    id: getUID(),
    name: 'New Presentation',
    slides: slides
}
export {myPres};