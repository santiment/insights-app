# Insights

## Installation
Update `/etc/hosts` add `127.0.0.1 local.santiment.net`
```bash
npm install
```

## Development

### Starting a development build with server
```bash
npm run dev
```
Open https://app-stage.santiment.net/ and login
Open http://local.santiment.net:3000

## Deployment

### Building
`BACKEND_URL` should be passed as the env variable
```bash
BACKEND_URL=https://api-stage.santiment.net
```

### Starting the server
```bash
npm start
```

