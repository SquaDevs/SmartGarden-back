module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "indent": 2,
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }]
    , "template-curly-spacing": [2, "never"]
  }
}
