# 星球小捕手 - PDF转Word

> 永久免费、无水印、支持扫描版OCR的在线PDF转Word工具。文件本地处理，隐私安全。

## 功能特点

- **PDF转Word** - 将PDF文档转换为可编辑的Word（.docx）格式
- **扫描版OCR识别** - 集成Tesseract.js v5，支持简体中文、英文及中英混合识别
- **三种转换模式** - 自动识别（推荐）、文字版PDF、扫描版OCR（手动选择语言）
- **文件本地处理** - 所有转换在浏览器端完成，文件不上传到任何服务器
- **零水印** - 转换后的文档无任何水印或推广信息
- **无次数限制** - 没有每日额度或月度上限
- **无需注册** - 打开网页即可使用，不需手机号、邮箱或扫码

## 项目结构

```
.
├── index.html                              # 首页（核心转换功能）
├── about.html                              # 关于我们
├── blog.html                               # 博客文章列表
├── privacy.html                            # 隐私政策
├── terms.html                              # 服务条款
├── logo.png                                # 品牌Logo
├── robots.txt                              # 搜索引擎爬虫配置
├── sitemap.xml                             # 站点地图
├── ads.txt                                 # Google AdSense 广告配置
└── blog/
    ├── pdf-to-word-free-guide.html        # PDF转Word免费完整指南
    ├── scanned-pdf-ocr-tips.html           # 扫描版PDF文字提取技巧
    ├── pdf-conversion-quality.html         # 转换排版质量说明
    ├── pdf-security-and-privacy.html       # 文件安全与隐私保护
    └── batch-pdf-to-word.html              # 批量PDF转Word教程
```

## 技术栈

- **纯前端** - HTML + CSS + JavaScript，无需后端服务
- **PDF解析** - pdf.js（Mozilla）
- **文档生成** - docx.js
- **OCR引擎** - Tesseract.js v5（支持中文/英文/混合识别）
- **样式** - 深色太空主题，CSS变量驱动，响应式设计
- **SEO** - JSON-LD结构化数据、Open Graph、Sitemap、Robots.txt
- **分析** - Google Analytics (gtag.js)

## 部署方式

本项目为纯静态网站，可直接部署到以下平台：

- **GitHub Pages** - 推送代码后开启 Pages 即可
- **Vercel** - 连接GitHub仓库自动部署
- **Netlify** - 拖拽文件夹或连接仓库部署
- **Cloudflare Pages** - 连接GitHub仓库自动构建
- **任何静态文件服务器** - Nginx、Apache等直接托管

无需安装依赖，无需构建步骤，无需后端服务。

## 本地预览

任意HTTP服务器均可，例如：

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

浏览器打开 `http://localhost:8080` 即可。

## 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|---------|
| Chrome 80+ | 完全支持 |
| Edge 80+ | 完全支持 |
| Firefox 78+ | 完全支持 |
| Safari 14+ | 完全支持 |

> OCR功能需要较新版本浏览器支持WebAssembly。

## 联系方式

- 邮箱：planetcatcher@163.com

## 许可证

本项目代码仅供学习参考。网站内容及品牌标识归「星球小捕手」所有。
