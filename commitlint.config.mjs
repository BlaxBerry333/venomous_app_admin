export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    //   ...
  },
  prompt: {
    settings: {},
    messages: {
      skip: "Enter 跳过",
      max: "最大 %d 字符",
      min: "至少 %d 字符",
      emptyWarning: "不能为空",
      upperLimitWarning: "超过限制",
      lowerLimitWarning: "低于限制",
    },
    questions: {
      type: {
        description: "选择您要提交的更改类型：",
        enum: {
          feat: {
            description: "新增功能",
            title: "功能",
          },
          fix: {
            description: "修复错误",
            title: "修复",
          },
          docs: {
            description: "仅文档更改",
            title: "文档",
          },
          style: {
            description: "不影响代码含义的更改（空格、格式、缺失分号等）",
            title: "样式",
          },
          refactor: {
            description: "既不修复错误也不添加功能的代码更改",
            title: "代码重构",
          },
          perf: {
            description: "改善性能的代码更改",
            title: "性能提升",
          },
          test: {
            description: "添加缺失的测试或修正现有测试",
            title: "测试",
          },
          build: {
            description:
              "影响构建系统或外部依赖的更改（例如 gulp、broccoli、npm）",
            title: "构建",
          },
          ci: {
            description:
              "CI 配置文件和脚本的更改（例如 Travis、Circle、BrowserStack、SauceLabs）",
            title: "持续集成",
          },
          chore: {
            description: "其他不修改源代码或测试文件的更改",
            title: "杂项",
          },
          revert: {
            description: "回退之前的提交",
            title: "回退",
          },
        },
      },
      scope: {
        description: "更改的范围 ( 例如组件或文件名 )",
      },
      subject: {
        description: "简要描述更改内容 ( 必须 )",
      },
      body: {
        description: "提供更改的详细描述",
      },
      isBreaking: {
        description: "是否有破坏性更改？",
      },
      breakingBody: {
        description: "包含破坏性更改的提交需要一个正文。请提供更长的描述",
      },
      breaking: {
        description: "描述破坏性更改",
      },
      isIssueAffected: {
        description: "此更改是否影响任何未解决的问题？",
      },
      issuesBody: {
        description: "如果问题已关闭，提交需要一个正文。请提供更长的描述",
      },
      issues: {
        description: '添加问题引用（例如 "fix #123", "re #123"）。',
      },
    },
  },
};
