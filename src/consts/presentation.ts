import {getUID} from '../store/methods'
import {type PresentationType} from '../store/types'
import {slides} from './slides'

const myPres: PresentationType = {
	id: getUID(),
	name: 'Новая презентация',
	slides,
}
export {myPres}
