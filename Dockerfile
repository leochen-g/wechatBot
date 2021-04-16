FROM wechaty/onbuild
LABEL maintainer="Leo_chen <chengeng@aibotk.com>"
WORKDIR /home/app
COPY --from=0 /home/app .
COPY . .
RUN npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm config set puppeteer_download_host https://npm.taobao.org/mirrors
RUN  npm install
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
