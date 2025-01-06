module.exports = {
  extends: ['@commitlint/config-conventional'],
  rule: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],
    'subject-case': [0],
  },
}
