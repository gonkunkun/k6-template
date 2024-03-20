import { Scenario } from 'k6/options'
import * as env from './env'
import * as redisClient from './redis'
import exec from 'k6/execution'

// eslint-disable-next-line prefer-const
let scenarioSet: string[] = []

export async function setupTesting(): Promise<void> {
  debugOrLog(`Start of test: ${formatDate(new Date())}`)
  debugOrLog(`Test environment: ${env.ENV}`)

  // --config ./src/sample-product/configs/smoke.jsonのオプションで設定された値を取得する
  debugOrLog(`== Check scenario configurations ======================================================`)

  const scenariosOptionValue: { [name: string]: Scenario } | undefined = exec.test.options.scenarios
  if (!scenariosOptionValue) {
    throw new Error('Scenarios option is undefined')
  }

  Object.entries(scenariosOptionValue).forEach(([, scenario]) => {
    if (scenario.exec !== undefined) {
      debugOrLog(`Scenario: ${scenario.exec}()`)
      scenarioSet.push(scenario.exec)
    }
  })

  debugOrLog(`== Check scenario configurations FINISHED ===============================================`)

  debugOrLog(`== Initialize Redis ======================================================`)

  // Delete old key/value datas
  const client = redisClient.getRedisClient()
  await Promise.all(
    scenarioSet.map(async (senarioName) => {
      await client.del([senarioName])
    }),
  )
  // Push index data for reading CSV file
  await Promise.all(
    scenarioSet.map(async (senarioName) => {
      for (let i = 0; i < env.AMOUNT_OF_INDEX_SIZE_FOR_TEST_DATA; i++) {
        await client.rpush(senarioName, i)
      }
      debugOrLog(`Scenario ${senarioName} is initialized. Lens is ${await client.llen(senarioName)}`)
    }),
  )

  debugOrLog(`== Initialize Redis FNISHED ===============================================`)
}

export async function teardownTesting(): Promise<void> {
  debugOrLog(`== Initialize Redis ======================================================`)

  // Delete old key/value datas
  const client = redisClient.getRedisClient()
  await Promise.all(
    scenarioSet.map(async (scenario) => {
      await client.del([scenario])
    }),
  )

  debugOrLog(`== Initialize Redis FINISHED ===============================================`)
}

export const HEADERS = {
  'User-Agent': 'k6-load-test',
  'Content-Type': 'application/json',
}

export const TIMEOUT = 3000
export const SCENARIO_FILES_DIR = (): string => {
  const e: { [key: string]: string } = {
    prod: 'prod',
    stg: 'stg',
    local: 'local',
  }

  const environment = e[env.ENV] || 'local'
  return `./datas/sample-product/${environment}`
}

const start = Date.now()
export function debugOrLog(textToLog: string): void {
  if (env.DEBUG) {
    const millis = Date.now() - start
    const time = Math.floor(millis / 1000)
    console.log(`${time}se: ${textToLog}`)
  }
}

function formatDate(time: Date): string {
  const jstOffset: number = 9 * 60
  const jstTime: number = time.getTime() + jstOffset * 60 * 1000

  const jstDate: Date = new Date(jstTime)

  return jstDate.toISOString().slice(0, 19).replace('T', ' ')
}

export function toBoolean(booleanStr: string): boolean {
  return booleanStr.toLowerCase() === 'true'
}

export function returnRandomValue(value: number): number {
  return Math.floor(Math.random() * value)
}

export function formatDateInYyyymmddhhmmss(time: Date): string {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()

  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  const y = year.toString()
  const m = ('00' + month).slice(-2)
  const d = ('00' + day).slice(-2)
  const h = ('00' + hour).slice(-2)
  const min = ('00' + minute).slice(-2)
  const s = ('00' + second).slice(-2)

  return `${y}${m}${d}${h}${min}${s}`
}
