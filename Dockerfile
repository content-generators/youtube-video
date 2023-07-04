FROM node:18-alpine

WORKDIR /youtube-video
COPY package.json /youtube-video/

RUN npm config set @content-generators:registry https://npm.pkg.github.com
RUN npm config set //npm.pkg.github.com/:_authToken ${GIT_PAT_TOKEN}

RUN npm install

COPY . /youtube-video

ARG REACT_APP_TTS_URL='REPLACE_ME' 
ENV REACT_APP_TTS_URL=${REACT_APP_TTS_URL} 

EXPOSE 3000

CMD ["npm", "start"]