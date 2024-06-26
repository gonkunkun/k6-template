import { setupTesting, teardownTesting, debugOrLog } from './common/common'
import { OPTIONS_CONFIG } from './configs/config'
import sampleScenario1 from './scenarios/sampleScenario1'
import sampleScenario2 from './scenarios/sampleScenario2'

export const options = OPTIONS_CONFIG() // eslint-disable-line

// The following document describe role of each endpoint
export { sampleScenario1, sampleScenario2 } // eslint-disable-line

export function setup(): void {
  debugOrLog(`== setup() BEGIN ===========================================================`)
  setupTesting()
  debugOrLog(`== setup() END ===========================================================`)
}

export function teardown(): void {
  debugOrLog(`== All scenarios FINISHED ===========================================================`)
  debugOrLog(`== Teardown() STARTED ===========================================================`)
  teardownTesting()
  debugOrLog(`== Teardown() FINISHED ===========================================================`)
}
