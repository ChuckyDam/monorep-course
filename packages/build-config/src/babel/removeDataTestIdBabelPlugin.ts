import { PluginItem } from "@babel/core";



export function removeDataTestIdBabelPlugin(): PluginItem{ // https://astexplorer.net/ - для просмотра узлов
    return {
        visitor: {
            Program(path, state){
                const forbiddenProps = state.opts.props || [] // Запрещённые пропсы

                path.traverse({
                    JSXIdentifier: function(current){
                        const nodeName = current.node.name; // Название ноды - узла
                        if(forbiddenProps.includes(nodeName)){ // Ищем в ноде упоминание о запретных пропсах
                            current.parentPath.remove(); // Если есть - удаляем
                        }
                    }
                })
            }
        }
    }
}