FROM node:25-bookworm-slim

# 1. Install Chromium

RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

# 2. App setup
WORKDIR /app
COPY package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=1
RUN npm install

# 3. Copy source
COPY . .

# 4. Run as non-root
RUN useradd -m -u 1001 puppeteer && chown -R puppeteer:puppeteer /app
USER puppeteer

# 5. Tell Puppeteer where Chromium lives
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
