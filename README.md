# AI Proxy

一个部署在 Cloudflare Pages 上的 AI API 代理，支持 OpenAI、Claude 和 Gemini。

## 功能特性

- 🚀 **多平台支持** - 同时代理 OpenAI、Claude、Gemini API
- 🔒 **透明代理** - 完整转发请求，支持所有模型
- 🌐 **CORS 支持** - 可从任意前端调用
- 🎨 **验证界面** - 内置美观的测试页面
- 🔗 **GitHub 集成** - 直接连接 GitHub，推送即部署

## 项目结构

```
ai-proxy/
├── public/
│   └── index.html          # 验证界面（静态页面）
├── functions/
│   ├── openai/[[path]].js  # OpenAI 代理
│   ├── claude/[[path]].js  # Claude 代理
│   └── gemini/[[path]].js  # Gemini 代理
└── package.json
```

## 快速部署

### 方式一：直接连接 GitHub（推荐）

1. Fork 或推送此仓库到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
4. 选择你的仓库，配置：
   - **Build command**: 留空
   - **Build output directory**: `public`
5. 点击 **Save and Deploy**

之后每次推送到 `main` 分支，Cloudflare 会自动部署！

### 方式二：本地部署

```bash
npm install
npx wrangler pages deploy public --project-name ai-proxy
```

## API 端点

| 提供商 | 路径前缀 | 目标 API |
|--------|----------|----------|
| OpenAI | `/openai/*` | api.openai.com |
| Claude | `/claude/*` | api.anthropic.com |
| Gemini | `/gemini/*` | generativelanguage.googleapis.com |

## 使用示例

### OpenAI

```bash
curl -X POST https://your-project.pages.dev/openai/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Claude

```bash
curl -X POST https://your-project.pages.dev/claude/v1/messages \
  -H "x-api-key: sk-ant-xxx" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 512,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Gemini

```bash
curl -X POST "https://your-project.pages.dev/gemini/v1beta/models/gemini-2.0-flash-exp:generateContent?key=xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Hello"}]}]
  }'
```

## License

MIT
