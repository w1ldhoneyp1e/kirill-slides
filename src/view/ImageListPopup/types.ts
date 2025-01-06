type Image = {
	width: number,
	height: number,
	url: string,
}

type UnsplashPhoto = {
	id: string,
	width: number,
	height: number,
	urls: {
		raw: string,
		full: string,
		regular: string,
		small: string,
		thumb: string,
		small_s3: string,
	},
}

type UnsplashResponse = {
	total: number,
	total_pages: number,
	results: UnsplashPhoto[],
}

export {
	type Image,
	type UnsplashResponse,
	type UnsplashPhoto,
}
