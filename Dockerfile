 #dockerHubから持ってくるImageの指定
 FROM node:20.11.0
 #docker内に入った時の初期パスの指定
WORKDIR /show_ppl_pref_graph
# パッケージのインストール
RUN yarn install

COPY ./show_ppl_pref_graph/package*.json ./
#ローカル側のファイルをdocker内にコピーする
COPY ./show_ppl_pref_graph /show_ppl_pref_graph
CMD ["yarn", "start"]