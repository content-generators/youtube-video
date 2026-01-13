FROM node:18-alpine

WORKDIR /youtube-video
COPY package.json /youtube-video/
COPY .npmrc /youtube-video/.npmrc

ARG GIT_PAT_TOKEN='REPLACE_ME'
ENV GIT_PAT_TOKEN=${GIT_PAT_TOKEN}

RUN npm install

COPY . /youtube-video

ARG REACT_APP_TTS_UR='REPLACE_ME'
ENV REACT_APP_TTS_UR=${REACT_APP_TTS_UR}

ARG REACT_APP_TTS_TYPE='REPLACE_ME'
ENV REACT_APP_TTS_TYPE=${REACT_APP_TTS_TYPE}

EXPOSE 3000

CMD ["npm", "run", "start-docker"]