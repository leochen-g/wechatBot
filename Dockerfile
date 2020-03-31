FROM node:10
LABEL maintainer="Leo_chen <chengeng@aibotk.com>"
WORKDIR /home/app
COPY package.json ./
RUN  npm install

FROM node:10
MAINTAINER leo
RUN sed -i s@/deb.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && sed -i s@/security.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get clean \
    && apt-get update -y -q \
    && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
WORKDIR /home/app
COPY --from=0 /home/app .
COPY . .
RUN npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm config set puppeteer_download_host https://npm.taobao.org/mirrors
CMD [ "node", "index.js" ]

LABEL \
  org.label-schema.license="MIT License" \
  org.label-schema.build-date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
  org.label-schema.version="$DOCKER_TAG" \
  org.label-schema.schema-version="$(wechaty-version)" \
  org.label-schema.name="wechatBot" \
  org.label-schema.description="wechatBot: 微信每日说" \
  org.label-schema.usage="https://www.xkboke.com/web-inn/wechatBot/wiki/Docker" \
  org.label-schema.url="https://www.xkboke.com/web-inn/wechatBot/" \
  org.label-schema.vendor="aibotk" \
  org.label-schema.vcs-url="https://github.com/gengchen528/wechatBot" \
  org.label-schema.docker.cmd="docker run aibotk/wechat-bot"
