# 基盤となるイメージ
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールする
COPY package.json package-lock.json ./
RUN npm install next@14

# アプリケーションのソースコードをコピー
COPY . .

# 環境変数の設定
ENV NODE_ENV=production

# アプリケーションをビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
