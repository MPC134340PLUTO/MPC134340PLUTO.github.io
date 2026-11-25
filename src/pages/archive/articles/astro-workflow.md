---
layout: ../../../layouts/ArchiveArticle.astro
title: "Astro 静态网站的开发流程"
category: development
description: "从本地预览到静态构建的基本命令与素材路径规则。"
tags: ["Astro", "前端", "项目"]
sample: true
---

> 本文是用于验证知识档案功能的示例学习指南，并非个人已完成的学习或实验记录。

## 本地预览

在包含 `package.json` 的项目根目录运行：

```powershell
npm run dev
```

打开终端显示的本地地址。修改源码后观察页面变化。

## 静态素材

放在 `public/media/` 下的文件可以使用 `/media/` 开头的 URL 引用。例如项目中的星云图片可用 `/media/images/backgrounds/scenes/Scene-1.jpg`。

## 构建检查

```powershell
npm run build
```

构建输出默认位于 `dist/`。构建通过后仍应检查图片、交互、移动端布局及实际跳转。
