import {useState} from 'react'
import {API_KEY_UNSPLASH} from '../../../consts/ApiKey'
import {type Image} from '../types'

const useImageSearch = () => {
	const [images, setImages] = useState<Image[]>([])
	const [initialized, setInitialized] = useState<boolean | null>(null)

	const searchImages = async (query: string) => {
		if (!query) {
			return
		}

		setInitialized(false)
		try {
			const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`,
				{
					headers: {
						Authorization: `Client-ID ${API_KEY_UNSPLASH}`,
					},
				},
			)
			const data = await response.json()
			// setImages(data.results.map((result: any) => result.urls.small))
		}
		catch (err) {
			console.error('Ошибка при загрузке картинок:', err)
		}
		finally {
			setInitialized(true)
		}
	}

	return {
		images,
		initialized,
		searchImages,
	}
}

export {useImageSearch}
