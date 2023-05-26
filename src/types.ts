export interface Config {
  name: string
  dir?: string
}

export type UserConfigFn<UserConfig> = () => UserConfig | Promise<UserConfig>

export type UserConfigExport<UserConfig> =
  | UserConfig
  | Promise<UserConfig>
  | UserConfigFn<UserConfig>
