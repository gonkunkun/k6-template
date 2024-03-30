import { Options } from 'k6/options'
import { setupTesting, teardownTesting, debugOrLog } from './common/common'
import { OPTIONS_CONFIG } from './configs/config'
import sampleScenario1 from './scenarios/sampleScenario1'
import sampleScenario2 from './scenarios/sampleScenario2'

// Options are passed from command line
// eslint-disable-next-line no-unused-vars
export const options = OPTIONS_CONFIG()

// The following document describe role of each endpoint
export { sampleScenario1, sampleScenario2 }

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
