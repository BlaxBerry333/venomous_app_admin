# Venomous Apps' Admin Client

## 📚 Tech Stacks

- [vite]() v5
- [typescript]() v5
- [react]() v18
- [react-route-dom]() v6
- [react-hook-form]() v7
- [tanstack query]() v5
- [xyflow]() v12
- [mui/material]() v6
- [react-virtuoso]() v4
- [iconify]() v5
- [sass]() v1
- [storybook]() v8
- [zustand]() v5
- [zod]() v3
- [tiptap]() v2
- [protobuf]()

## 🚀 Local Setup

[more →](../README.md)

- Server URL: `http://localhost:3000/`
- Storybook: `http://localhost:3100/`

## 🛠 Commands

```shell
# Commit
% yarn commit
% cd .. && npm run commit

# Server
% yarn start:[mode] [--force]
% yarn build:[mode]
% yarn preview
% yarn dev:storybook

# Test & Lint
% yarn check-all
% yarn check-type
% yarn check-eslint
% yarn check-stylelint
% yarn check-prettier
% yarn check-packages
% yarn stylelint
% yarn prettier
```

## 📂 Structure

```shell
venomous_app_admin/
├── admin_client/
│   │
│   ├── .storybook/                             # configuration of storybook
│   │   ├── main.ts
│   │   └── preview.tsx
│   │
│   ├── public/
│   │
│   └── src/
│       ├── main.ts
│       ├── vite-env.d.ts
│       │
│       │
│       ├── app/
│       │   ├── _configs/                       # configuration of project
│       │   ├── features/
│       │   ├── pages/
│       │   ├── types/
│       │   │
│       │   └── App.tsx                         # main App component of project
│       │
│       │
│       │
│       ├── ui/
│       │   ├── _configs/                       # configuration of UI
│       │   ├── _helpers/                       # helper tools for ui components
│       │   ├── _hooks/                         # hook functions for ui components
│       │   ├── _providers/                     # providers & wrappers for ui components
│       │   │
│       │   ├── assets/                         # assets of project
│       │   │   ├── images/
│       │   │   ├── uploads/
│       │   │   └── ...
│       │   │
│       │   ├── components/
│       │   │   ├── base/                       # customized components based on MaterialUI
│       │   │   │   ├── ...
│       │   │   │   └── <name>
│       │   │   │       ├── <name>.tsx
│       │   │   │       ├── <name>.stories.tsx
│       │   │   │       └── index.ts
│       │   │   │
│       │   │   ├── custom/                     # customized components using extra libraries
│       │   │   │   ├── ...
│       │   │   │   └── <name>
│       │   │   │       ├── <name>.tsx
│       │   │   │       ├── <name>.stories.tsx
│       │   │   │       └── index.ts
│       │   │   │
│       │   │   └── layouts/                    # layout components using components/base and components/customs
│       │   │       ├── ...
│       │   │       └── <name>
│       │   │           ├── <name>.tsx
│       │   │           ├── <name>.stories.tsx
│       │   │           └── index.ts
│       │   │
│       │   └── templates/                      # template using components/layouts
│       │       ├── ...
│       │       └── <name>
│       │           ├── <name>.tsx
│       │           ├── <name>.stories.tsx
│       │           └── index.ts
│       │
│       │
│       │
│       ├── utils/                              # common utils of project
│       │   ├── custom/                         # custom tools
│       │   │
│       │   └── libs/                           # 3rd-party libraries
│       │       ├── ...
│       │       └── <module_name>
│       │
│       └── ...
│
│
├── index.html
│
├── storybook-static/                           # static of storybook
│   ├── ...
│   └── index.html
│
├── .env[.env_name]
├── .depcheckrc
├── .prettierrc
├── .stylelintrc
├── eslint.config.mjs
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
│
└── ...
```
