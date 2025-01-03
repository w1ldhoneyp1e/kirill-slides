import {useState} from 'react'

const useImageSearch = () => {
	const [images, setImages] = useState<string[]>([])
	const [initialized, setInitialized] = useState<boolean | null>(null)

	const searchImages = async (query: string) => {
		if (!query) {
			return
		}

		setInitialized(false)
		try {
			const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=4`)
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
