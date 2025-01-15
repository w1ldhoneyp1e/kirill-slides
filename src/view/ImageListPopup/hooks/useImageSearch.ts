import {useState} from 'react'
import {API_KEY_UNSPLASH} from '../../../consts/apiKeys'
import {remap_ApiUnsplashResponse_to_Images} from '../remap'
import {type Image, type UnsplashResponse} from '../types'

const useImageSearch = () => {
	const [images, setImages] = useState<Image[]>([])
	const [initialized, setInitialized] = useState(true)
	const [error, setError] = useState<string | null>(null)


	const searchImages = async (query: string) => {
		if (!query) {
			return
		}

		setInitialized(false)
		setError(null)

		try {
			const response = await fetch(
				`https://api.unsplash.com/search/photos?query=${query}`,
				{
					headers: {
						Authorization: `Client-ID ${API_KEY_UNSPLASH}`,
					},
				},
			)
			const data: UnsplashResponse = await response.json()
			const remapedData = remap_ApiUnsplashResponse_to_Images(data)
			console.log('remapedData: ', remapedData)

			setImages(remapedData)
		}
		catch (err) {
			console.error('Ошибка при загрузке картинок:', err)
			setError('Ошибка при загрузке изображений')
		}
		setInitialized(true)
	}

	return {
		images,
		initialized,
		searchImages,
		error,
	}
}

export {useImageSearch}
