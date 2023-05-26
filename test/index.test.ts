import { resolve } from "node:path"
import { getConfigFilePath, getUserConfig } from "@/config"

describe("define-config", () => {
  const fixturesPath = resolve(__dirname, "./fixtures")
  const substitutedPath = "SUBSTITUTED_PATH"

  it("getConfigFilePath", () => {
    expect(
      getConfigFilePath("demo", fixturesPath).replace(
        fixturesPath,
        substitutedPath,
      ),
      // eslint-disable-next-line @typescript-eslint/quotes, quotes
    ).toMatchInlineSnapshot('"SUBSTITUTED_PATH/demo.config.ts"')

    expect(() => getConfigFilePath("notfound", fixturesPath)).toThrowError()
  })

  it("getUserConfig", async () => {
    expect(
      await getUserConfig({
        name: "demo",
        dir: fixturesPath,
      }),
    ).toMatchInlineSnapshot(`
        {
          "a": 1,
          "b": "2",
          "c": true,
          "name": "demo.config.ts",
        }
      `)
  })
})
