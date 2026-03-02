# 部署指南

将 AI Proxy 部署到 Cloudflare Pages（使用 GitHub 集成，无需 API Token）。

## 步骤 1：准备 GitHub 仓库

如果还没有推送到 GitHub：

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-proxy.git
git push -u origin main
```

## 步骤 2：在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages**
3. 点击 **Create** → 选择 **Pages** 标签
4. 点击 **Connect to Git**
5. 如果是首次使用，需要授权 Cloudflare 访问你的 GitHub
6. 选择 `ai-proxy` 仓库

## 步骤 3：配置构建设置

| 设置项 | 值 |
|--------|-----|
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | _(留空)_ 或填 `echo "skip"` |
| **Build output directory** | `public` |
| **Root directory** | `/`（默认） |

> ⚠️ **注意**：Build command 留空或填一个简单的命令如 `echo "skip"`，**不要**填 `wrangler deploy`！

## 步骤 4：部署

点击 **Save and Deploy**，等待部署完成。

部署成功后，你会得到一个 URL：
- `https://ai-proxy-xxx.pages.dev`

## 自动部署

设置完成后，每次推送代码到 `main` 分支，Cloudflare 会自动重新部署：

```bash
git add .
git commit -m "Update"
git push
```

## 绑定自定义域名（可选）

1. 在 Cloudflare Dashboard 进入你的 Pages 项目
2. 点击 **Custom domains** → **Set up a custom domain**
3. 输入你的域名（如 `api.yourdomain.com`）
4. 按照提示配置 DNS

## 本地开发

```bash
npm install
npm run dev
# 访问 http://localhost:8788
```

## 常见问题

### Q: functions 目录的代码怎么生效？

Cloudflare Pages 会自动识别 `functions/` 目录下的 JS 文件作为 Pages Functions（类似于 Workers），无需额外配置。

### Q: Build command 可以留空吗？

可以。如果界面强制要求填写，填 `echo "skip"` 即可。
