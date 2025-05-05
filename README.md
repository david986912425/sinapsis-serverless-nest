# Reto Técnico Sinapsis - Backend

## 🚀 Tecnologías utilizadas

- AWS Lambda
- Serverless
- NestJS

## 📦 Instalación

```bash
git clone https://github.com/hardyscc/aws-nestjs-starter.git <Your_Project_Name>
cd <Your_Project_Name>

npm install
```

Luego, reemplaza todas las referencias a aws-nestjs-starter por el nombre de tu proyecto en los siguientes archivos:
- package.json
- serverless.yml
- .env

## Local Offline Development

```bash
# Para iniciar el servidor en modo local con serverless-offline:
$ npm run sls:offline

# Si deseas iniciar el servidor local pero conectándote a una base de datos MySQL en línea:
$ npm run sls:online
```

## RESTful Endpoint Test

> Please remove `/dev` from path if test using local nestjs mode

```sh
curl -X POST 'http://localhost:3000/dev/notification' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "targetId": "device1", "userId": "user1", "content": "Hello" }'
```

```sh
curl -X GET 'http://localhost:3000/dev/notification?targetId=device1'
```

```sh
curl -X GET 'http://localhost:3000/dev/notification?userId=user1'
```

```sh
curl -X PATCH 'http://localhost:3000/dev/notification/a30f7101-2434-4443-87fa-493c9d9d3358' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "status": "Deleted" }'
```
