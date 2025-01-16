import {useCallback, useState} from 'react'
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
	const [loading, setLoading] = useState(false)
	const [initialized, setInitialized] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const openDB = useCallback((): Promise<IDBDatabase> => new Promise((resolve, reject) => {
		const request = indexedDB.open('FontsDB', 1)

		request.onerror = () => reject(request.error)
		request.onsuccess = () => resolve(request.result)

		request.onupgradeneeded = event => {
			const db = (event.target as IDBOpenDBRequest).result
			if (!db.objectStoreNames.contains('fonts')) {
				db.createObjectStore('fonts', {keyPath: 'family'})
			}
		}
	}), [])

	const saveFontToDb = async (db: IDBDatabase, fontFamily: string, css: string) => {
		const transaction = db.transaction(['fonts'], 'readwrite')
		const store = transaction.objectStore('fonts')
		await store.put({
			family: fontFamily,
			css,
		})
	}

	const applyFont = useCallback((fontFamily: string, css: string) => {
		const styleId = `font-${fontFamily}`
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style')
			style.id = styleId
			style.textContent = css
			document.head.appendChild(style)
		}
	}, [])

	const loadFontCSS = async (font: string, weight: string = 'regular'): Promise<string> => {
		const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${weight === 'regular'
? '400'
: '700'}&display=swap`
		const cssResponse = await fetch(fontUrl)

		if (cssResponse.ok) {
			return cssResponse.text()
		}
		throw new Error(`Ошибка загрузки шрифта ${font}`)
	}

	const loadFonts = useCallback(async () => {
		if (loading) {
			return
		}
		setLoading(true)
		setInitialized(false)
		setError(null)

		try {
			const db = await openDB()

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

			const fontList = data.items.slice(0, 50).map(font => font.family)

			for (const font of fontList) {
				try {
					const regularCSS = await loadFontCSS(font)
					await saveFontToDb(db, font, regularCSS)
					applyFont(font, regularCSS)

					const boldCSS = await loadFontCSS(font, 'bold')
					await saveFontToDb(db, `${font}_bold`, boldCSS)
					applyFont(`${font}_bold`, boldCSS)
				}
				catch (err) {
					console.error(`Ошибка загрузки шрифта ${font}:`, err)
				}
			}

			setAllFonts(fontList)
			setFonts(fontList)

		}
		catch (err) {
			console.error('Ошибка при загрузке шрифтов:', err)
			setError('Ошибка при загрузке шрифтов')
		}
		finally {
			setLoading(false)
			setInitialized(true)
		}
	}, [openDB, applyFont, loading])

	const handleSearch = useCallback((query: string) => {
		if (!query) {
			setFonts(allFonts)
			return
		}

		const filtered = allFonts.filter(font =>
			font.toLowerCase().includes(query.toLowerCase()),
		)
		setFonts(filtered)
	}, [allFonts])

	return {
		fonts,
		loading,
		initialized,
		error,
		loadFonts,
		handleSearch,
	}
}

export {useFontSearch}
