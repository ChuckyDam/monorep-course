import {ModuleOptions} from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BuildOptions } from "./types";
import ReactRefreshTypeScript  from 'react-refresh-typescript'
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ 
            loader: '@svgr/webpack', 
            options: { 
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors', // плагин для того чтобы color работал на svg, ! но не на всех работает хз почему
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            }
        }],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                // Модуль для написания отдельного хэша под модульный css, в деве это путь к файлу
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev? "style-loader": MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }
    
    // const tsLoader = {
    //     // ts-loder по умолчанию умеет работать с jsx
    //     // Если б мы не использовали его то пришлось бы ставить babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    const tsLoader = {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: isDev, // Убирает ts ошибки при сборке, немного ускоряет
              getCustomTransformers: () => ({ 
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean), // Дополнение к hot, чтобы работал с ts-loader
              }),
            }
          }],
        exclude: /node_modules/,
      }

    // const babelLoader = buildBabelLoader(options);
    
    return [
        assetLoader,
        scssLoader,
        tsLoader,
        // babelLoader,
        svgLoader
    ]
}