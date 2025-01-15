const DB_NAME = 'FontCache'
const STORE_NAME = 'fonts'
const DB_VERSION = 1

type FontCache = {
	family: string,
	css: string,
}

const useFontCache = () => {
	const openDB = (): Promise<IDBDatabase> => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION)

		request.onerror = () => reject(request.error)
		request.onsuccess = () => resolve(request.result)

		request.onupgradeneeded = event => {
			const db = (event.target as IDBOpenDBRequest).result
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {keyPath: 'family'})
			}
		}
	})

	const addToCache = async (fontFamily: string, css: string): Promise<void> => {
		if (!fontFamily || fontFamily === 'inherit') {
			return
		}

		try {
			const db = await openDB()
			const transaction = db.transaction(STORE_NAME, 'readwrite')
			const store = transaction.objectStore(STORE_NAME)

			await new Promise<void>((resolve, reject) => {
				const request = store.put({
					family: fontFamily,
					css,
				})
				request.onsuccess = () => resolve()
				request.onerror = () => reject(request.error)
			})

		}
		catch (error) {
			console.error('Ошибка при кэшировании шрифта:', error)
			throw error
		}
	}

	const loadFromCache = async (fontFamily: string): Promise<string | null> => {
		if (!fontFamily || fontFamily === 'inherit') {
			return null
		}

		try {
			const db = await openDB()
			const transaction = db.transaction(STORE_NAME, 'readonly')
			const store = transaction.objectStore(STORE_NAME)

			const cachedFont = await new Promise<FontCache | undefined>(resolve => {
				const request = store.get(fontFamily)
				request.onsuccess = () => resolve(request.result)
			})

			if (cachedFont) {
				return cachedFont.css
			}

			return null
		}
		catch (error) {
			console.error('Ошибка при загрузке шрифта из кэша:', error)
			return null
		}
	}

	const applyFont = (fontFamily: string, css: string) => {
		const existingStyle = document.querySelector(`style[data-font="${fontFamily}"]`)
		if (!existingStyle) {
			const style = document.createElement('style')
			style.setAttribute('data-font', fontFamily)
			style.textContent = css
			document.head.appendChild(style)
		}
	}

	return {
		addToCache,
		loadFromCache,
		applyFont,
	}
}

export {
	useFontCache,
}

