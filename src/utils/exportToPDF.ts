import fontkit from '@pdf-lib/fontkit'
import {PDFDocument, rgb} from 'pdf-lib'
import {type PresentationType} from '../store/types'

function hexToRgb(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16) / 255
	const g = parseInt(hex.slice(3, 5), 16) / 255
	const b = parseInt(hex.slice(5, 7), 16) / 255
	return {
		r,
		g,
		b,
	}
}

async function exportToPDF(presentation: PresentationType) {
	const width = 841.89 // A4 ширина в альбомной ориентации
	const height = 595.28 // A4 высота в альбомной ориентации

	const pdfDoc = await PDFDocument.create()

	pdfDoc.registerFontkit(fontkit)

	console.log(presentation)

	for (const slide of presentation.slides) {
		const page = pdfDoc.addPage([width, height])

		if (slide.background.type === 'solid') {
			const {
				r, g, b,
			} = hexToRgb(slide.background.hexColor)
			page.drawRectangle({
				x: 0,
				y: 0,
				width,
				height,
				color: rgb(r, g, b),
			})
		}
		else if (slide.background.type === 'image') {
			const imgBytes = await fetch(slide.background.src).then(res => res.arrayBuffer())
			const img = await pdfDoc.embedJpg(imgBytes)
			page.drawImage(img, {
				x: 0,
				y: 0,
				width,
				height,
			})
		}

		for (const obj of slide.contentObjects) {
			if (obj.type === 'text') {
				let font
				try {
					font = await pdfDoc.embedFont(obj.fontFamily)
				}
				catch (e) {
					console.error(`Ошибка при встраивании шрифта: ${obj.fontFamily}`, e)
					font = await pdfDoc.embedFont('Helvetica')
				}

				const {
					r, g, b,
				} = hexToRgb(obj.hexColor)

				const adjustedY = height - obj.position.y

				const centerY = adjustedY - obj.size.height / 2 + obj.fontSize / 2

				page.drawText(obj.value, {
					x: obj.position.x,
					y: centerY,
					size: obj.fontSize,
					font,
					color: rgb(r, g, b),
				})
			}
			else if (obj.type === 'picture') {
				const imgBytes = await fetch(obj.src).then(res => res.arrayBuffer())
				const img = await pdfDoc.embedJpg(imgBytes)
				page.drawImage(img, {
					x: obj.position.x,
					y: obj.position.y,
					width: obj.size.width,
					height: obj.size.height,
				})
			}
		}
	}

	pdfDoc.setTitle(presentation.name)

	const pdfBytes = await pdfDoc.save()
	const blob = new Blob([pdfBytes], {type: 'application/pdf'})
	const url = URL.createObjectURL(blob)
	window.open(url, '_blank')
	URL.revokeObjectURL(url)
}


export {exportToPDF}
