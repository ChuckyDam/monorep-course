import path from 'path';
import webpack from 'webpack'
import { BuildMode, BuildPaths, BuildPlatform, buildWebpack } from '@packages/build-config';
import packageJSON from "./package.json";

interface EnvVariables {
  mode?: BuildMode,
  port?: number,
  analyzer?: boolean,
  platform?: BuildPlatform
}

export default (env: EnvVariables) => { 

    const paths: BuildPaths = {
      output: path.resolve(__dirname, "build"), 
      entry: path.resolve(__dirname, "src", "index.tsx"), 
      html: path.resolve(__dirname, "public", "index.html"), 
      src: path.resolve(__dirname, "src"), 
      public: path.resolve(__dirname, "public")
    }

    const config: webpack.Configuration = buildWebpack({
      port: env.port ?? 3002,
      mode: env.mode ?? 'development',
      paths,
      analyzer: env.analyzer,
      platform: env.platform ?? 'desktop'
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        './Router': './src/router/Router.tsx' // Что предоставляем host-у (приложению-контейнеру)
      },
      shared: { // Общие обязательные библиотеки
        ...packageJSON.dependencies,
        'react': { // Обязательная загрузка, противопоставление lazyloading
          eager: true,
          requiredVersion: packageJSON.dependencies["react"]
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJSON.dependencies["react-router-dom"]
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJSON.dependencies["react-dom"]
        }
      }
    }))

    return config;
}


