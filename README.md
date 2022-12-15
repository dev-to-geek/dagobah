# Dagobah

> "Do or do not. There is no try" Yoda

## Clone repository

```shell
git@github.com:Athomos-Github/dagobah.git
```
## Install composer packages 

```shell
docker run --rm --interactive --tty --volume $PWD:/app composer install --ignore-platform-reqs
```

## Install node components

```shell
npm install
```

## Forge your .env file

```
cp .env.example .env
```

## Happy coding

```
sail up -d
npm run dev
```
