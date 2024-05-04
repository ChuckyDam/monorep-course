import { BuildOptions } from "../types"
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";


export function buildBabelLoader( {mode}: BuildOptions) {

    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins = [];

    if (isProd){
        plugins.push(                [
            removeDataTestIdBabelPlugin, // Удаление лишних пропсов
            {
                props: ["data-testid"]
            }
        ]);
    }

    return{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
        loader: "babel-loader",
        options: {
            presets: [
                '@babel/preset-env',
                "@babel/preset-typescript", // Работает как ts-loader
                ["@babel/preset-react", { // Первым у присетов название, потом опции
                    runtime: isDev? 'automatic' : "classic",
                }]
            ],
            plugins: plugins.length? plugins : undefined
        }}
    }
}

