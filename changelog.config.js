module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复问题' },
    { value: 'docs', name: 'docs:     文档更新' },
    { value: 'style', name: 'style:    代码格式化' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'test', name: 'test:     添加测试' },
    { value: 'chore', name: 'chore:    构建或依赖更新' },
    { value: 'revert', name: 'revert:   回滚代码' },
  ],
  messages: {
    type: '选择提交的更改类型:',
    scope: '更改的范围 (可选):',
    customScope: '请输入自定义的范围:',
    subject: '简短描述:\n',
    body: '详细描述，使用 "|" 换行(可选):\n',
    breaking: '列出破坏性更改 (可选):\n',
    footer: '关联的任务编号，例如：#12345 (可选):\n',
    confirmCommit: '确认提交?',
  },
}
