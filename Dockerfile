FROM node:18-alpine

WORKDIR /youtube-video
COPY package.json /youtube-video/
COPY .npmrc /youtube-video/.npmrc

ARG GIT_PAT_TOKEN='REPLACE_ME'
ENV GIT_PAT_TOKEN=${GIT_PAT_TOKEN}

RUN npm install

COPY . /youtube-video

EXPOSE 3000

CMD ["npm", "start"]