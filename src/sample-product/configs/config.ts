import * as env from '../common/env'
import { formatDate } from '../common/common'

export const OPTIONS_CONFIG = (): Record<string, unknown> => {
  const defaultConfigs = {
    blockHostnames: ['*.hogehoge.com'],
    insecureSkipTLSVerify: true,
    tags: {
      env: 'local',
      datetime: formatDate(new Date()),
    },
  }

  const configs = JSON.parse(open(env.CONFIG_PATH))

  return Object.assign({}, defaultConfigs, configs)
}
