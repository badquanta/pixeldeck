module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  plugins: [
    "chai-friendly"
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 0
  }
}
