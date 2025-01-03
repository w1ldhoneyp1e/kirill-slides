import {useState} from 'react'
import {API_KEY} from '../../../consts/ApiKey'

const useImageSearch = () => {
	const [images, setImages] = useState<string[]>([])
	const [initialized, setInitialized] = useState<boolean | null>(null)

	const searchImages = async (query: string) => {
		if (!query) {
			return
		}

		setInitialized(false)
		try {
			const response = await fetch(`http://localhost:3005/api/images?query=${query}&access_token=${API_KEY}`)
			const data = await response.json()
			setImages(data.results.map((result: any) => result.urls.small))
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
