## Installation

```bash
npm install
```

## Use expanded function

If you haven't prepared go env, please set up before execute following command.

```bash
go install go.k6.io/xk6/cmd/xk6@latest
```

```bash
xk6 build \
--with github.com/LeonAdato/xk6-output-statsd@latest \
--with github.com/grafana/xk6-dashboard@latest \
--with github.com/szkiba/xk6-ts@latest \
--with github.com/szkiba/xk6-dotenv@latest
```

## Set environment variables

```
cp .env.sample .env
# Edit .env file
```

## Install and Run Redis

If you store mutable variable and share it among VUs per scenario, need to use outer key/value store like Redis.

In case of Homebrew

```
# install
brew install redis

# run
## Start redis (if the installation destination of the homebrew app is /usr/local)
redis-server /usr/local/etc/redis.conf
## Start redis (if the installation destination of the homebrew app is /opt/homebrew)
redis-server /opt/homebrew/etc/redis.conf
```

## Running the test

The next command transforms each TypeScript test in `./src` to the `./dist` folder as ES modules.

```bash
npm run bundle
```

```bash
# If execute smoke test scenarios to local environment
./k6 run ./dist/loadTest.js --config ./src/sample-product/configs/smoke.json -e ENV=local
```

## Deploy mock server
```
cd mock
npm install
npx ts-node ./src/index 3005
Listening on port 3005

curl -XGET http://localhost:3005                                                                         add-mock-server ✱ ◼
{"message":"This is mock endpoint"}%
```

## Use datadog agent and Redis for docker compose

```
export DD_API_KEY=xxx
export DD_SITE=ap1.datadoghq.com
```

```
docker compose up
```
