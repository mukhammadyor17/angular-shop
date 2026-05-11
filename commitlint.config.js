module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'style', 'chore']],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
