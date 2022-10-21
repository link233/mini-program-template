### 运行

```bash
# 下载依赖
$ yarn || npm install

# 开发运行
$ yarn dev || npm run dev

# 构建
$ yarn build || npm run build
```

### package.json 配置

```jsonc
{
  "scripts": {
    // 先删除 './dist/' 文件夹，再使用 webpack 编译（但不支持 windows）
    "dev": "rm -rf ./dist/* && webpack"
  }
}
```