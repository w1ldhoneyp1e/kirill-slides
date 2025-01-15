import {useState} from 'react'
import {API_KEY_GOOGLE_FONTS} from '../../../consts/apiKeys'

type GoogleFont = {
	family: string,
	variants: string[],
	files: {
		regular: string,
		[weight: string]: string,
	},
}

type GoogleFontsResponse = {
	items: GoogleFont[],
}

const useFontSearch = () => {
	const [fonts, setFonts] = useState<string[]>([])
	const [initialized, setInitialized] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const searchFonts = async (query: string) => {
		if (!query) {
			return
		}

		setInitialized(false)
		setError(null)

		try {
			const response = await fetch(
                `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY_GOOGLE_FONTS}&sort=popularity`,
			)
			const data: GoogleFontsResponse = await response.json()

			const filteredFonts = data.items
				.filter(font =>
					font.family.toLowerCase().includes(query.toLowerCase()),
				)
				.map(font => font.family)

			setFonts(filteredFonts)
		}
		catch (err) {
			console.error('Ошибка при загрузке шрифтов:', err)
			setError('Ошибка при загрузке шрифтов')
		}

		setInitialized(true)
	}

	return {
		fonts,
		initialized,
		searchFonts,
		error,
	}
}

export {useFontSearch}
