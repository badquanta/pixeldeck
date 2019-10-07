module.exports = {
  include: [
    'lib/*',
    'scripts/*',
    'bin/*'
  ],
  exclude: [
    'ARCHIVES/*',
    'docs/*'
  ],
  'skip-full': true,
  reporter: [
    'lcov',
    'text',
    'text-summary'
  ],
  'report-dir': './docs/coverage',
  all: true
}
