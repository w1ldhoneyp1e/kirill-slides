import {type EditorType, type PresentationType} from '../../../store/types'
import {useAppActions} from '../../hooks/useAppActions'
import {validateDocument} from './validateEditor'

const useHandleImport = () => {
	const {setEditor} = useAppActions()
	return () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'application/json'
		input.onchange = (event: Event) => {
			const file = (event.target as HTMLInputElement).files?.[0]
			if (file) {
				const reader = new FileReader()
				reader.onload = e => {
					try {
						const importedPresentation: PresentationType = e.target
							? JSON.parse(e.target.result as string)
							: null

						const isValid = validateDocument(importedPresentation)
						if (!isValid) {
							return
						}

						const editor: EditorType = {
							presentation: importedPresentation,
							selection: {
								selectedObjIds: [],
								selectedSlideId: '',
							},
						}

						setEditor(editor)
					}
					catch (error) {
						console.error(error)
					}
				}
				reader.readAsText(file)
			}
		}

		input.click()
		input.remove()
	}
}

export {useHandleImport}
