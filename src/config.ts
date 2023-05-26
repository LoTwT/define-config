import { resolve } from "node:path"
import fse from "fs-extra"
import type { Nullable } from "@ayingott/sucrose"
import { normalizePath } from "@ayingott/sucrose"
import type { Config, UserConfigExport } from "./types"

export const getConfigFilePath = (name: string, dir?: string) => {
  const configFilesExts = ["js", "ts"]
  const configDirPath = normalizePath(dir || process.cwd())

  const configFilePath = configFilesExts
    .map((ext) =>
      normalizePath(resolve(configDirPath, `${name}.config.${ext}`)),
    )
    .find(fse.pathExistsSync)
  if (configFilePath) return configFilePath
  else {
    throw new Error("Fail to find the config file")
  }
}

export const defineConfig = <UserConfig extends Record<PropertyKey, any>>(
  config: UserConfigExport<UserConfig>,
) => config

let userConfig: Nullable<any> = null

export const getUserConfig = async <
  UserConfig extends Record<PropertyKey, any>,
>(
  config: Config,
): Promise<UserConfig> => {
  if (userConfig) return userConfig

  try {
    const { name, dir } = config
    const configFilePath = getConfigFilePath(name, dir)
    const result = await import(configFilePath)
    userConfig = result.default
    return userConfig
  } catch (error) {
    throw new Error("Fail to get user config")
  }
}
