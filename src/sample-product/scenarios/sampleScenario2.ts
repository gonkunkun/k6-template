import { check, group } from 'k6'
import { SharedArray } from 'k6/data'
import exec from 'k6/execution'
// @ts-ignore
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js'
// @ts-ignore
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
import * as env from '../common/env'
import { HEADERS, TIMEOUT, SCENARIO_FILES_DIR, debugOrLog } from '../common/common'
import * as redisClient from '../common/redis'

const session = new Httpx({
  baseURL: env.SAMPLE_PRODUCT_ENDPOINT,
  HEADERS,
  setTimeout: TIMEOUT,
})

type User = {
  ID: string
}

let loopCounterPerVU = 0
let user: User
const client = redisClient.getRedisClient()

const users = new SharedArray('sampleScenario2', function () {
  return papaparse.parse(open(`${SCENARIO_FILES_DIR()}/sampleScenario2.csv`), { header: true }).data
})

export default async function sampleScenario2(): Promise<void> {
  if (loopCounterPerVU === 0) {
    const index = Number(await client.lpop('sampleScenario2'))
    user = users[index]
  }
  loopCounterPerVU++

  debugOrLog(
    `sampleScenario2() start ID: ${user.ID}, vu iterations: ${loopCounterPerVU}, total iterations: ${exec.scenario.iterationInTest}`,
  )

  group('sampleScenario2', function () {
    const result = session.get(`/news.php`, {
      id: user.ID,
    })
    check(result, {
      'Status is 200': (r) => r.status == 200,
    })
  })

  debugOrLog(
    `sampleScenario2() end ID: ${user.ID}, vu iterations: ${loopCounterPerVU}, total iterations: ${exec.scenario.iterationInTest}`,
  )
}
