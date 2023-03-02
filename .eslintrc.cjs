module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'mocha': true,
		'chai': true,
		'sinon': true,
		'supertest': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [2, 'never']
	}
}
