// cz.config.js
/** @type {import('cz-git').UserConfig['prompt']} */
module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:\t\t添加新功能",
    },
    {
      value: "fix",
      name: "fix:\t\t修复 bug",
    },
    {
      value: "refactor",
      name: "refactor:\t不涉及新增功能或修复 bug 的代码变更",
    },
    {
      value: "perf",
      name: "perf:\t\t提升性能的代码变更",
    },
    {
      value: "docs",
      name: "docs:\t\t仅更改文档",
    },
    {
      value: "style",
      name: "style:\t不影响代码意义的变更",
    },
    {
      value: "test",
      name: "test:\t\t新增或修改测试",
    },
    {
      value: "build",
      name: "build:\t影响构建系统或外部依赖的变更",
    },
    {
      value: "ci",
      name: "ci:\t\tCI 配置文件或脚本的变更",
    },
    {
      value: "chore",
      name: "chore:\t不涉及源代码或测试的其他变更",
    },
    {
      value: "revert",
      name: "revert:\t撤销提交",
    },
  ],
  messages: {
    type: "请选择你要提交的变更类型:",
    subject: "简要描述变更内容:\n",
    body: "详细描述变更内容（包括破坏性变更、相关 issue 等）: (按 Enter 跳过，使用 | 换行)\n",
  },
  skipQuestions: [
    "scope",
    "breaking",
    "footer",
    "footerPrefix",
    "confirmCommit",
  ],
};
