import { ReactElement } from 'react'
import styles from "./App.module.scss"
import { Outlet } from 'react-router-dom';

type Props = {}

export function App({}: Props) {

    let info:ReactElement = <div></div>
    if(__PLATFORM__ === "desktop"){ // Это Tree Shaking!
      info = <>
        <p>О нас прям много</p>
      </>
    }
    if(__PLATFORM__ === "mobile"){
      info = <>
        ...................
      </>
    }


  return (
    <div data-testid={"GlavBlock"}>
      <h1 data-testid={"version"}>Версия для {__PLATFORM__}, Микрофронт Admin</h1>
        
        {info}

        <Outlet/>
    </div>
  )
}