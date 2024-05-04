import  webpack  from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types";

export function buildWebpack(options: BuildOptions): webpack.Configuration{
    const {mode, paths} = options
    const isDev = mode === 'development';

 return {
    mode: mode?? "development", // development с коментами, production без
    entry: paths.entry,
    output: {
        path: paths.output,
        filename: "[name].[contenthash].js",
        clean: true
    },
    plugins: buildPlugins(options), // Плагины -_-
    module: {
      rules: buildLoaders(options), // Лоудеры - компиляторы как TS в JS / JSX -> JS / TSX -> JS / SCSS -> CSS -> JS
    },
    resolve: buildResolvers(options), // Распознают файлы
    devtool: isDev? 'eval': "source-map", // Карта исходного кода, виды: https://webpack.js.org/configuration/devtool/
    devServer: isDev ? buildDevServer(options): undefined // Настройки Дев сервера вебпака: https://webpack.js.org/configuration/dev-server/
}
}