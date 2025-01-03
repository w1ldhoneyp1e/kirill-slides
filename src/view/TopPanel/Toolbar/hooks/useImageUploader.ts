import {useCallback} from 'react'
import {useAppActions} from '../../../hooks/useAppActions'

function useImageUploader() {
	const {addPicture} = useAppActions()

	return useCallback(() => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'image/*'

		input.onchange = async () => {
			const file = input.files?.[0]
			if (!file) {
				return
			}

			const reader = new FileReader()
			reader.onload = () => {
				const img = new Image()
				img.onload = () => {
					// Передаём изображение в экшен
					addPicture({
						src: reader.result as string,
						width: img.width,
						height: img.height,
					})
				}
				img.src = reader.result as string
			}
			reader.readAsDataURL(file)
		}

		input.click()
	},
	[addPicture])
}

export {
	useImageUploader,
}
