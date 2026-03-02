# AI Proxy

一个部署在 Cloudflare Pages 上的 AI API 代理，支持 OpenAI、Claude、Gemini 和 Telegram。

## 功能特性

- 🚀 **多平台支持** - 同时代理 OpenAI、Claude、Gemini 和 Telegram API
- 🔒 **透明代理** - 完整转发请求，支持所有模型
- 🌐 **CORS 支持** - 可从任意前端调用
- 🎨 **验证界面** - 内置美观的测试页面
- 🔗 **GitHub 集成** - 直接连接 GitHub，推送即部署，无需 API Token

## 项目结构

```
ai-proxy/
├── public/
│   └── index.html          # 验证界面（静态页面）
└── functions/
    ├── openai/[[path]].js  # OpenAI 代理
    ├── claude/[[path]].js  # Claude 代理
    ├── gemini/[[path]].js  # Gemini 代理
    └── tg/[[path]].js      # Telegram 代理
```

## 快速部署

### 1. Fork 或推送仓库到 GitHub

### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create** → **Pages**
3. 点击 **Connect to Git**
4. 选择你的 `ai-proxy` 仓库
5. 配置构建设置：

| 设置项 | 值 |
|--------|-----|
| Framework preset | `None` |
| Build command | _(留空)_ 或 `echo "skip"` |
| Build output directory | `public` |

6. 点击 **Save and Deploy**

**之后每次推送到 main，自动部署！**

## API 端点

部署后，你的代理地址为 `https://your-project.pages.dev`

| 提供商 | 路径 | 示例 |
|--------|------|------|
| OpenAI | `/openai/*` | `/openai/v1/chat/completions` |
| Claude | `/claude/*` | `/claude/v1/messages` |
| Gemini | `/gemini/*` | `/gemini/v1beta/models/gemini-pro:generateContent` |
| Telegram | `/tg/*` | `/tg/bot.../sendMessage` |

## 使用示例

### OpenAI
```bash
curl -X POST https://your-project.pages.dev/openai/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o", "messages": [{"role": "user", "content": "Hello"}]}'
```

### Claude
```bash
curl -X POST https://your-project.pages.dev/claude/v1/messages \
  -H "x-api-key: sk-ant-xxx" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-3-5-sonnet-20241022", "max_tokens": 512, "messages": [{"role": "user", "content": "Hello"}]}'
```

### Gemini
```bash
curl -X POST "https://your-project.pages.dev/gemini/v1beta/models/gemini-pro:generateContent?key=xxx" \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "Hello"}]}]}'
```

### Telegram
```bash
curl -X POST "https://your-project.pages.dev/tg/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "-1003635213662", "text": "Hello"}'
```

## License

MIT
