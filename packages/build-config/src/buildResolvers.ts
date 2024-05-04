import { Configuration } from "mini-css-extract-plugin";
import { BuildOptions } from "./types";

export function buildResolvers(options: BuildOptions): Configuration["resolve"]{
    return {
        extensions: ['.tsx', '.ts', '.js'], // Когда импортируем компонент в React, данная строка позволяет не дописывать .tsx .ts .js
        alias: {
            '@': options.paths.src
        }
    } // Порядок важен
}