import microApp from "@micro-zoe/micro-app"

const startMicroApp = (): void => {
  microApp.start({
    plugins: {
      modules: {
        // appName即应用的name值
        "app-one": [
          {
            loader(code) {
              if (process.env.NODE_ENV === "development") {
                // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
                code = code.replace(/(from|import)(\s*['"])(\/app-one\/)/g, (all) => {
                  return all.replace("/app-one/", " http://localhost:3002/app-one/")
                })
              }

              return code
            }
          }
        ]
      }
    }
  })
}

export default startMicroApp
