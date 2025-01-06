const axios = require('axios')
const cors = require('cors')
const express = require('express')

const app = express()
const port = 3005

app.use(cors())

app.get('/api/images', async (req, res) => {
	const {query, access_token} = req.query
	if (!query || !access_token) {
		return res.status(400).json({message: 'bad query'})
	}
	try {
		const vkApiResponse = await axios.get('https://api.vk.com/method/photos.search', {
			params: {
				access_token,
				q: query,
				v: '5.199',
			},
		})
		res.json(vkApiResponse.data)
	}
	catch (error) {
		console.error('Error during request to VK API:', error)
		res.status(500).json({error: 'An error occurred'})
	}
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
