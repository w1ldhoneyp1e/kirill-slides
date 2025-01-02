type DividerProps = {
	type: 'horizontal' | 'vertical',
	size: 'full' | 'half' | '3/4', // Размер разделителя
}

const Divider = ({
	type, size,
}: DividerProps) => {
	const style = getStyle(type, size)

	return (
		<div style={style ?? {}} />
	)
}

function getStyle(type: 'horizontal' | 'vertical', size: 'full' | 'half' | '3/4') {
	const sizeMapping = {
		full: '100%',
		half: '50%',
		'3/4': '75%',
	}

	const calculatedSize = sizeMapping[size]

	switch (type) {
		case 'horizontal':
			return {
				backgroundColor: 'var(--color-gray-dark)',
				width: calculatedSize,
				height: '1px',
			}

		case 'vertical':
			return {
				backgroundColor: 'var(--color-gray-dark)',
				height: calculatedSize,
				width: '1px',
			}

		default:
			return null
	}
}

export {Divider}
