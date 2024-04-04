import { toBoolean } from './common'

export const DEBUG =toBoolean(__ENV.DEBUG) || false
export const ENV = __ENV.ENV || 'local'
export const CONFIG_PATH = __ENV.CONFIG_PATH || '../src/sample-product/configs/smoke.json'
export const REDIS_ENDPOINT = __ENV.REDIS_ENDPOINT || 'redis://localhost:6379'
export const AMOUNT_OF_INDEX_SIZE_FOR_TEST_DATA = __ENV.AMOUNT_OF_INDEX_SIZE_FOR_TEST_DATA || 10000
export const SAMPLE_PRODUCT_ENDPOINT = __ENV.SAMPLE_PRODUCT_ENDPOINT || 'localhost'
