function joinStyles(...classNames: (string | undefined | false)[]): string {
	return classNames.filter(Boolean).join(' ')
}

export {
	joinStyles,
}
