FROM node:18-alpine

WORKDIR /youtube-video
COPY package.json /youtube-video/
RUN npm install

COPY . /youtube-video

ARG REACT_APP_TTS_URL='REPLACE_ME' 
ENV REACT_APP_TTS_URL=${REACT_APP_TTS_URL} 

EXPOSE 3000

CMD ["npm", "start"]