import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration{
    return {
      port: options.port?? 3000, // npm run start -- --env port=5000
      open: true,
      historyApiFallback: true, // Для перемещения по страницам в девмоде
      hot: true // Чтоб при изменении данных дев мод не перезпускался, не работает с доп фрейсворками
    }
}