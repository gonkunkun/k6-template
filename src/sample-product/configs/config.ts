import * as env from '../common/env'

export const OPTIONS_CONFIG = (): Record<string, unknown> => {
  const defaultConfigs = {
    blockHostnames: ['*.hogehoge.com'],
    insecureSkipTLSVerify: true,
  }

  const configs = JSON.parse(open(env.CONFIG_PATH))

  return Object.assign({}, defaultConfigs, configs)
}
