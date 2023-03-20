/* eslint quote-props: [ 'error', 'always' ] */// This file only.
module.exports = {
	'root': true,
	'extends': [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:jsdoc/recommended',
		'plugin:react-hooks/recommended',
	],
	'env': {
		'browser': true,
		'es6': true,
		'commonjs': true,
		'jest': true,
	},
	'parser': require.resolve( 'babel-eslint' ),
	'parserOptions': {
		'ecmaVersion': 2018,
		'ecmaFeatures': {
			'jsx': true,
		},
		'sourceType': 'module',
	},
	'plugins': [
		'react',
		'jsx-a11y',
		'flowtype',
		'import',
		'jsdoc',
		'react-hooks',
	],
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
	'ignorePatterns': [
		'node_modules/',
		'src/vendor/',
		'vendor/',
		'*.min.js',
	],
	'rules': {
		// Original set of rules chosen to override HM standards:
		// (These are maintained here in the code so that it is more clear
		// which of the computed rules below may differ from the HM defaults,
		// with the goal of using this config to inform the next version of
		// the HM standard itself.)
		// 'arrow-parens': [ 'error', 'always' ],
		// 'space-before-function-paren': [ 'warn', {
		// 	'anonymous': 'never',
		// 	'named': 'never',
		// 	'asyncArrow': 'always',
		// } ],
		// 'import/order': 'warn',
		// 'jsdoc/check-tag-names': [ 'warn', {
		// 	// Permit Jest directive for opting in to jsdom environment.
		// 	'definedTags': [ 'jest-environment' ],
		// } ],
		// 'jsdoc/require-jsdoc': 'warn',
		// 'jsdoc/no-undefined-types': 'off',
		// 'react/jsx-sort-props': 'off',

		// These rules were computed from the HM standards, inclusive of the
		// overrides above, and rendered out using `eslint --print-config`.
		// We define our ruleset verbosely instead of relying on extends
		// because create-react-app's config caused peerDependency hell.
		'arrow-parens': [ 'error', 'always' ],
		'import/order': [ 'warn', {
			'alphabetize': {
				'order': 'asc',
				'caseInsensitive': true,
			},
			'groups': [ 'builtin', 'external', 'parent', 'sibling', 'index' ],
			'newlines-between': 'always',
			'pathGroups': [
				{
					'pattern': '@wordpress/**',
					'group': 'external',
					'position': 'after',
				},
			],
			'pathGroupsExcludedImportTypes': [ 'builtin' ],
			'warnOnUnassignedImports': false,
		} ],
		'jsdoc/check-tag-names': [ 'warn', {
			// Permit Jest directive for opting in to jsdom environment.
			'definedTags': [ 'jest-environment' ],
		} ],
		'jsdoc/require-jsdoc': [ 'warn', {
			'require': {
				'FunctionDeclaration': true,
				'ClassDeclaration': true,
				'ArrowFunctionExpression': true,
				'FunctionExpression': true,
				'ClassExpression': false,
				'MethodDefinition': false,
			},
			'checkConstructors': true,
			'checkGetters': true,
			'checkSetters': true,
			'enableFixer': true,
			'exemptEmptyConstructors': false,
			'exemptEmptyFunctions': false,
		} ],
		'jsdoc/no-undefined-types': 'off',
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-spacing': [ 'error', {
			'before': true,
			'after': true,
		} ],
		'block-spacing': 'error',
		'brace-style': [ 'error', '1tbs' ],
		'comma-dangle': [ 'error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'never',
		} ],
		'comma-spacing': [ 'error', {
			'before': false,
			'after': true,
		} ],
		'eol-last': [ 'error', 'unix' ],
		'eqeqeq': [ 'error', 'smart' ],
		'func-call-spacing': 'error',
		'import/no-unresolved': 'off',
		'indent': [ 'warn', 'tab', {
			'SwitchCase': 1,
			'flatTernaryExpressions': false,
			'offsetTernaryExpressions': false,
			'ignoreComments': false,
		} ],
		'key-spacing': [ 'error', {
			'beforeColon': false,
			'afterColon': true,
		} ],
		'keyword-spacing': [ 'error', {
			'after': true,
			'before': true,
		} ],
		'linebreak-style': [ 'error', 'unix' ],
		'no-console': 'warn',
		'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ],
		'no-multiple-empty-lines': [ 'error', { 'max': 1 } ],
		'no-trailing-spaces': 'error',
		'no-var': 'warn',
		'object-curly-newline': [ 'error', {
			'ObjectExpression': {
				'consistent': true,
				'minProperties': 2,
				'multiline': true,
			},
			'ObjectPattern': {
				'consistent': true,
				'multiline': true,
			},
			'ImportDeclaration': {
				'consistent': true,
				'multiline': true,
			},
			'ExportDeclaration': {
				'consistent': true,
				'minProperties': 2,
				'multiline': true,
			},
		} ],
		'object-curly-spacing': [ 'error', 'always' ],
		'object-property-newline': 'error',
		'quotes': [ 'error', 'single' ],
		'semi': [ 'error', 'always' ],
		'semi-spacing': [ 'error', {
			'before': false,
			'after': true,
		} ],
		'space-before-function-paren': [ 'warn', {
			'anonymous': 'never',
			'asyncArrow': 'always',
			'named': 'never',
		} ],
		'space-in-parens': [ 'warn', 'always', {
			'exceptions': [ 'empty' ],
		} ],
		'space-unary-ops': [ 'error', {
			'words': true,
			'nonwords': false,
			'overrides': {
				'!': true,
			},
		} ],
		'yoda': [ 'error', 'never' ],
		'react/jsx-curly-spacing': [ 'error', {
			'when': 'always',
			'children': true,
		} ],
		'react/jsx-wrap-multilines': 'error',
		'react/jsx-curly-newline': [ 'warn', {
			'multiline': 'consistent',
			'singleline': 'consistent',
		} ],
		'react/jsx-boolean-value': [ 'error', 'never' ],
		'react/jsx-sort-props': 'off',
		'jsx-a11y/anchor-is-valid': [ 'error', {
			'aspects': [
				'noHref',
				'invalidHref',
			],
		} ],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'jsdoc/valid-types': 'warn',
		'array-callback-return': 'warn',
		'default-case': [ 'warn', {
			'commentPattern': '^no default$',
		} ],
		'dot-location': [ 'warn', 'property' ],
		'new-parens': 'warn',
		'no-array-constructor': 'warn',
		'no-caller': 'warn',
		'no-cond-assign': [ 'warn', 'except-parens' ],
		'no-const-assign': 'warn',
		'no-control-regex': 'warn',
		'no-delete-var': 'warn',
		'no-dupe-args': 'warn',
		'no-dupe-class-members': 'warn',
		'no-dupe-keys': 'warn',
		'no-duplicate-case': 'warn',
		'no-empty-character-class': 'warn',
		'no-empty-pattern': 'warn',
		'no-eval': 'warn',
		'no-ex-assign': 'warn',
		'no-extend-native': 'warn',
		'no-extra-bind': 'warn',
		'no-extra-label': 'warn',
		'no-fallthrough': 'warn',
		'no-func-assign': 'warn',
		'no-implied-eval': 'warn',
		'no-invalid-regexp': 'warn',
		'no-iterator': 'warn',
		'no-label-var': 'warn',
		'no-labels': [ 'warn', {
			'allowLoop': true,
			'allowSwitch': false,
		} ],
		'no-lone-blocks': 'warn',
		'no-loop-func': 'warn',
		'no-mixed-operators': [ 'warn', {
			'groups': [
				[ '&', '|', '^', '~', '<<', '>>', '>>>' ],
				[ '==', '!=', '===', '!==', '>', '>=', '<', '<=' ],
				[ '&&', '||' ],
				[ 'in', 'instanceof' ],
			],
			'allowSamePrecedence': false,
		} ],
		'no-multi-str': 'warn',
		'no-native-reassign': 'warn',
		'no-negated-in-lhs': 'warn',
		'no-new-func': 'warn',
		'no-new-object': 'warn',
		'no-new-symbol': 'warn',
		'no-new-wrappers': 'warn',
		'no-obj-calls': 'warn',
		'no-octal': 'warn',
		'no-octal-escape': 'warn',
		'no-redeclare': 'warn',
		'no-regex-spaces': 'warn',
		'no-restricted-syntax': [ 'warn', 'WithStatement' ],
		'no-script-url': 'warn',
		'no-self-assign': 'warn',
		'no-self-compare': 'warn',
		'no-sequences': 'warn',
		'no-shadow-restricted-names': 'warn',
		'no-sparse-arrays': 'warn',
		'no-template-curly-in-string': 'warn',
		'no-this-before-super': 'warn',
		'no-throw-literal': 'warn',
		'no-undef': 'off',
		'no-restricted-globals': [
			'error',
			'addEventListener',
			'blur',
			'close',
			'closed',
			'confirm',
			'defaultStatus',
			'defaultstatus',
			'event',
			'external',
			'find',
			'focus',
			'frameElement',
			'frames',
			'history',
			'innerHeight',
			'innerWidth',
			'length',
			'location',
			'locationbar',
			'menubar',
			'moveBy',
			'moveTo',
			'name',
			'onblur',
			'onerror',
			'onfocus',
			'onload',
			'onresize',
			'onunload',
			'open',
			'opener',
			'opera',
			'outerHeight',
			'outerWidth',
			'pageXOffset',
			'pageYOffset',
			'parent',
			'print',
			'removeEventListener',
			'resizeBy',
			'resizeTo',
			'screen',
			'screenLeft',
			'screenTop',
			'screenX',
			'screenY',
			'scroll',
			'scrollbars',
			'scrollBy',
			'scrollTo',
			'scrollX',
			'scrollY',
			'self',
			'status',
			'statusbar',
			'stop',
			'toolbar',
			'top',
		],
		'no-unexpected-multiline': 'warn',
		'no-unreachable': 'warn',
		'no-unused-expressions': [ 'error', {
			'allowShortCircuit': true,
			'allowTernary': true,
			'allowTaggedTemplates': true,
			'enforceForJSX': false,
		} ],
		'no-unused-labels': 'warn',
		'no-unused-vars': [ 'warn', {
			'args': 'none',
			'ignoreRestSiblings': true,
		} ],
		'no-use-before-define': [ 'warn', {
			'functions': false,
			'classes': false,
			'variables': false,
		} ],
		'no-useless-computed-key': 'warn',
		'no-useless-concat': 'warn',
		'no-useless-constructor': 'warn',
		'no-useless-escape': 'warn',
		'no-useless-rename': [ 'warn', {
			'ignoreDestructuring': false,
			'ignoreImport': false,
			'ignoreExport': false,
		} ],
		'no-with': 'warn',
		'no-whitespace-before-property': 'warn',
		'require-yield': 'warn',
		'rest-spread-spacing': [ 'warn', 'never' ],
		'strict': [ 'warn', 'never' ],
		'unicode-bom': [ 'warn', 'never' ],
		'use-isnan': 'warn',
		'valid-typeof': 'warn',
		'no-restricted-properties': [ 'error', {
			'object': 'require',
			'property': 'ensure',
			'message': 'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
		},
		{
			'object': 'System',
			'property': 'import',
			'message': 'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
		} ],
		'getter-return': 'warn',
		'import/first': 'error',
		'import/no-amd': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'react/forbid-foreign-prop-types': [ 'warn', {
			'allowInPropTypes': true,
		} ],
		'react/jsx-no-comment-textnodes': 'warn',
		'react/jsx-no-duplicate-props': [ 'warn', {
			'ignoreCase': true,
		} ],
		'react/jsx-no-target-blank': 'warn',
		'react/jsx-no-undef': 'error',
		'react/jsx-pascal-case': [ 'warn', {
			'allowAllCaps': true,
			'ignore': [],
		} ],
		'react/jsx-uses-vars': 'warn',
		'react/no-danger-with-children': 'warn',
		'react/no-direct-mutation-state': 'warn',
		'react/no-is-mounted': 'warn',
		'react/no-typos': 'error',
		'react/require-render-return': 'error',
		'react/style-prop-object': 'warn',
		'jsx-a11y/accessible-emoji': 'warn',
		'jsx-a11y/alt-text': 'warn',
		'jsx-a11y/anchor-has-content': 'warn',
		'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
		'jsx-a11y/aria-props': 'warn',
		'jsx-a11y/aria-proptypes': 'warn',
		'jsx-a11y/aria-role': 'warn',
		'jsx-a11y/aria-unsupported-elements': 'warn',
		'jsx-a11y/heading-has-content': 'warn',
		'jsx-a11y/iframe-has-title': 'warn',
		'jsx-a11y/img-redundant-alt': 'warn',
		'jsx-a11y/no-access-key': 'warn',
		'jsx-a11y/no-distracting-elements': 'warn',
		'jsx-a11y/no-redundant-roles': 'warn',
		'jsx-a11y/role-has-required-aria-props': 'warn',
		'jsx-a11y/role-supports-aria-props': 'warn',
		'jsx-a11y/scope': 'warn',
		'flowtype/define-flow-type': 'warn',
		'flowtype/require-valid-file-annotation': 'warn',
		'flowtype/use-flow-type': 'warn',
	},
};
