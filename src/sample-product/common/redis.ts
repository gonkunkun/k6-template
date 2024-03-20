import * as env from './env'
import redis from 'k6/experimental/redis'

export function getRedisClient(): redis.Client {
  return new redis.Client(env.REDIS_ENDPOINT)
}
