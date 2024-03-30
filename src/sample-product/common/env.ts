// @ts-ignore
import { parse } from "k6/x/dotenv"
import { toBoolean } from './common'

// eslint-disable-next-line @typescript-eslint/naming-convention
const _ENV = parse(open("../.env"))
export const DEBUG =toBoolean(_ENV.DEBUG) || false
export const ENV = _ENV.ENV || 'local'
export const CONFIG_PATH = _ENV.CONFIG_PATH || ENV.CONFIG_PATH || '../src/sample-product/configs/smoke.json'
export const REDIS_ENDPOINT = _ENV.REDIS_ENDPOINT || 'redis://localhost:6379'
export const AMOUNT_OF_INDEX_SIZE_FOR_TEST_DATA = _ENV.AMOUNT_OF_INDEX_SIZE_FOR_TEST_DATA || 10000
export const SAMPLE_PRODUCT_ENDPOINT = _ENV.SAMPLE_PRODUCT_ENDPOINT || 'localhost'
