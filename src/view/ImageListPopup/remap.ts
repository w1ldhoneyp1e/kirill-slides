import {type Image, type UnsplashResponse} from './types'

function remap_ApiUnsplashResponse_to_Images(data: UnsplashResponse | null): Image[] {
	if (!data || !data.results || !Array.isArray(data.results)) {
		return []
	}
	console.log('data.results: ', data.results)

	return data.results.map(result => {
		const {width, height} = result
		const url = result.urls.regular
		return {
			width,
			height,
			url,
			selected: false,
		}
	})
}

export {
	remap_ApiUnsplashResponse_to_Images,
}
