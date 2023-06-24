# busca imagem base do node (use :VERSAO se for necessário)
FROM node

# usa essa pasta como diretório de trabalho (tipo um CD)
WORKDIR /usr/src

# copia o diretório atual para o WORKDIR definido
COPY . .

# "expoe" a porta 5000
EXPOSE 5000

# baixa as dependências
RUN npm i

# faz a compilação do TS para JS
RUN npm run build

# só roda quando darmos docker run
CMD ["npm", "start"]