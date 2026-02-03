# 部署指南

将 AI Proxy 部署到 Cloudflare Pages 的详细步骤。

## 方式一：连接 GitHub（推荐）

这是最简单的方式，设置一次后自动部署。

### 步骤 1：准备 GitHub 仓库

将项目推送到 GitHub：

```bash
# 如果还没有远程仓库
git remote add origin https://github.com/YOUR_USERNAME/ai-proxy.git
git push -u origin main
```

### 步骤 2：在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages**
3. 点击 **Create** → **Pages** → **Connect to Git**
4. 授权并选择你的 `ai-proxy` 仓库

### 步骤 3：配置构建设置

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Build command | _(留空)_ |
| Build output directory | `public` |

### 步骤 4：部署

点击 **Save and Deploy**，等待部署完成。

部署成功后，你会得到一个 URL，如：
- `https://ai-proxy.pages.dev`
- 或 `https://ai-proxy-xxx.pages.dev`

### 之后的更新

只需推送代码到 `main` 分支，Cloudflare 会自动重新部署：

```bash
git add .
git commit -m "Update"
git push
```

---

## 方式二：命令行部署

如果不想连接 GitHub，可以直接用命令行部署。

### 步骤 1：安装依赖

```bash
npm install
```

### 步骤 2：登录 Cloudflare

```bash
npx wrangler login
```

### 步骤 3：部署

```bash
npx wrangler pages deploy public --project-name ai-proxy
```

---

## 绑定自定义域名

1. 在 Cloudflare Dashboard 进入你的 Pages 项目
2. 点击 **Custom domains** → **Set up a custom domain**
3. 输入你的域名（如 `api.yourdomain.com`）
4. 按照提示配置 DNS

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `npx wrangler pages dev public` | 本地开发 |
| `npx wrangler pages deploy public` | 部署到生产 |
| `npx wrangler pages project list` | 列出所有项目 |
