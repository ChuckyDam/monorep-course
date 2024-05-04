import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack, {Configuration, DefinePlugin} from "webpack"
import { BuildOptions } from "./types"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from "path";
import CopyPlugin from 'copy-webpack-plugin'

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration["plugins"]{
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration["plugins"] = [ // Все плагины для проды и дев
        new HtmlWebpackPlugin({ 
            template: paths.html, 
            favicon: path.resolve(paths.public, "favicon.ico"),
            publicPath: "/"
        }), // Плагин для создания шаблона, html со ссылками и стилями
        new DefinePlugin({ // Плагин для создания внешних глобальных переменных для проекта
            __PLATFORM__: JSON.stringify(platform),
        })
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin()) // Плагин для отображения в консоли прогресса сборки приложения
        // plugins.push(new ForkTsCheckerWebpackPlugin()) // Плагин для вынесения ошибок ts программы в отдельный процесс
        plugins.push(new ReactRefreshWebpackPlugin()) // Плагин к hot, чтобы работал с плагинами
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({ // Плагин для загрузки css стилей в отделтный файл (в ваниле всё переходит в js строку)
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }))

        plugins.push(new CopyPlugin({ // Плагин для копирования файлов из одного места проекта в папку билда
            patterns: [
              { from: path.resolve(paths.public, "locales"), to: path.resolve(paths.output, "locales") }
            ],
        }))

        if (analyzer){
            plugins.push(new BundleAnalyzerPlugin()) // Только в проде, так как там не сужается место для анализа
        }
        
    }

    return plugins
}