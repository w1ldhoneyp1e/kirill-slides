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
	const [allFonts, setAllFonts] = useState<string[]>([])
	const [initialized, setInitialized] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadFonts = async () => {
		setInitialized(false)
		setError(null)

		try {
			const response = await fetch(
				`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY_GOOGLE_FONTS}&sort=popularity`,
			)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: GoogleFontsResponse = await response.json()

			if (!data.items || !Array.isArray(data.items)) {
				throw new Error('Некорректный формат данных')
			}

			const fontList = data.items.map(font => font.family)
			setAllFonts(fontList)
			setFonts(fontList)
		}
		catch (err) {
			console.error('Ошибка при загрузке шрифтов:', err)
			setError('Ошибка при загрузке шрифтов')
		}

		setInitialized(true)
	}

	const searchFonts = (query: string) => {
		if (!query.trim()) {
			setFonts(allFonts)
			return
		}

		const filteredFonts = allFonts.filter(font =>
			font.toLowerCase().includes(query.toLowerCase()),
		)
		setFonts(filteredFonts)
	}

	return {
		fonts,
		initialized,
		searchFonts,
		loadFonts,
		error,
	}
}

export {useFontSearch}
