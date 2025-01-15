import {useCallback, useState} from 'react'
import {API_KEY_GOOGLE_FONTS} from '../../../consts/apiKeys'

const DB_NAME = 'FontCache'
const STORE_NAME = 'fonts'
const DB_VERSION = 1

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
	const [loading, setLoading] = useState(false)

	const openDB = useCallback((): Promise<IDBDatabase> => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION)

		request.onerror = () => reject(request.error)
		request.onsuccess = () => resolve(request.result)

		request.onupgradeneeded = event => {
			const db = (event.target as IDBOpenDBRequest).result
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {keyPath: 'family'})
			}
		}
	}), [])

	const applyFont = useCallback((family: string, css: string) => {
		const styleId = `font-${family.replace(/\s+/g, '-')}`
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style')
			style.id = styleId
			style.textContent = css
			document.head.appendChild(style)
		}
	}, [])

	async function saveFontToDb(db: IDBDatabase, font: string, css: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(STORE_NAME, 'readwrite')
			const store = transaction.objectStore(STORE_NAME)

			const request = store.put({
				family: font,
				css,
			})

			request.onsuccess = () => resolve()
			request.onerror = () => reject(request.error)

			transaction.oncomplete = () => resolve()
			transaction.onerror = () => reject(transaction.error)
		})
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
					const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}&display=swap`
					const cssResponse = await fetch(fontUrl)

					if (cssResponse.ok) {
						const css = await cssResponse.text()
						await saveFontToDb(db, font, css)
						applyFont(font, css)
					}
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

	const searchFonts = useCallback((query: string) => {
		if (!query.trim()) {
			setFonts(allFonts)
			return
		}

		const filteredFonts = allFonts.filter(font =>
			font.toLowerCase().includes(query.toLowerCase()),
		)
		setFonts(filteredFonts)
	}, [allFonts])

	return {
		fonts,
		initialized,
		searchFonts,
		loadFonts,
		error,
		loading,
	}
}

export {useFontSearch}
