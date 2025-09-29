# crates.io Translation 浏览器插件

这是一个浏览器插件，用于在 crates.io 网站上为 README 内容添加 `translate="yes"` 属性，从而启用浏览器的自动翻译功能。

## 功能

- 自动检测 crates.io 页面中的 README 区域
- 为符合条件的元素添加 `translate="yes"` 属性
- 支持单页应用 (SPA) 的路由变化
- 监听 DOM 动态变化

## 安装方法

### Chrome/Edge (开发者模式)

1. 打开浏览器，进入扩展管理页面
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

2. 开启"开发者模式"

3. 点击"加载已解压的扩展程序"

4. 选择此插件的文件夹

### Firefox (临时安装)

1. 打开 Firefox，进入 `about:debugging`

2. 点击"此Firefox"

3. 点击"临时载入附加组件"

4. 选择 `manifest.json` 文件

## 使用方法

1. 安装插件后，访问任何 crates.io 的页面
2. 插件会自动检测并处理 README 区域
3. 在浏览器控制台中可以看到插件的运行日志

## 技术细节

- **目标元素**: `body > main .article[aria-label="Readme"]`
- **添加属性**: `translate="yes"`
- **支持网站**: `https://crates.io/*`

## 文件结构

```
crates.io-translation/
├── manifest.json       # 插件清单文件
├── content.js          # 内容脚本
├── README.md          # 说明文档
└── icons/             # 图标文件夹
    └── icon.svg       # SVG 图标文件
```

## 开发说明

- 使用 Manifest V3 规范
- 采用内容脚本 (Content Script) 实现功能
- 支持动态页面变化检测
- 包含错误处理和日志记录

## 许可证

MIT License