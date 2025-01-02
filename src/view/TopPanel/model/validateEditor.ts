import Ajv from 'ajv'
import {SCHEMA} from './schema'

const ajv = new Ajv()
const validate = ajv.compile(SCHEMA)

function validateDocument(document: Record<string, unknown>): boolean {
	const valid = validate(document)
	if (!valid) {
		console.error('Validation errors:', validate.errors)
	}
	return valid
}

export {validateDocument}
