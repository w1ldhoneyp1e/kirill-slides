const SIZE_TYPE = {
	type: 'object',
	properties: {
		width: {type: 'number'},
		height: {type: 'number'},
	},
	required: ['width', 'height'],
}

const POSITION_TYPE = {
	type: 'object',
	properties: {
		x: {type: 'number'},
		y: {type: 'number'},
	},
	required: ['x', 'y'],
}

const SLIDE_OBJECT_TYPE = {
	type: 'object',
	properties: {
		id: {type: 'string'},
		position: POSITION_TYPE,
		size: SIZE_TYPE,
	},
	required: ['id', 'position', 'size'],
}

const TEXT_TYPE = {
	allOf: [
		SLIDE_OBJECT_TYPE,
		{
			type: 'object',
			properties: {
				value: {type: 'string'},
				fontSize: {type: 'number'},
				fontFamily: {type: 'string'},
				fontColor: {type: 'string'},
				type: {enum: ['text']},
			},
			required: ['value', 'fontSize', 'fontFamily', 'fontColor', 'type'],
		},
	],
}

const PICTURE_TYPE = {
	allOf: [
		SLIDE_OBJECT_TYPE,
		{
			type: 'object',
			properties: {
				src: {type: 'string'},
				type: {enum: ['picture']},
			},
			required: ['src', 'type'],
		},
	],
}

const SOLID_TYPE = {
	type: 'object',
	properties: {
		hexColor: {type: 'string'},
		type: {enum: ['solid']},
	},
	required: ['hexColor', 'type'],
}

const IMAGE_TYPE = {
	type: 'object',
	properties: {
		src: {type: 'string'},
		type: {enum: ['image']},
	},
	required: ['src', 'type'],
}

const BACKGROUND_TYPE = {oneOf: [SOLID_TYPE, IMAGE_TYPE]}

const SLIDE_TYPE = {
	type: 'object',
	properties: {
		id: {type: 'string'},
		contentObjects: {
			type: 'array',
			items: {anyOf: [TEXT_TYPE, PICTURE_TYPE]},
		},
		background: BACKGROUND_TYPE,
	},
	required: ['id', 'contentObjects', 'background'],
}

const SCHEMA = {
	type: 'object',
	properties: {
		id: {type: 'string'},
		name: {type: 'string'},
		slides: {
			type: 'array',
			items: SLIDE_TYPE,
		},
	},
	required: ['id', 'name', 'slides'],
}

export {SCHEMA}
