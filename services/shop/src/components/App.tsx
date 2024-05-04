import { ReactElement } from 'react'
import styles from "./App.module.scss"
import { Outlet } from 'react-router-dom';

type Props = {}

export function App({}: Props) {

    let info:ReactElement = <div></div>
    if(__PLATFORM__ === "desktop"){ // Это Tree Shaking!
      info = <>
        <p>MICROFRONT BOIAR EDITION</p>
        Вот ещё фоточка
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Dignissimos aspernatur adipisci culpa, et rem eum dolor vel. 
        Accusamus, illo ipsam. Quae distinctio cumque ipsum maiores obcaecati asperiores libero odit placeat!
      </>
    }
    if(__PLATFORM__ === "mobile"){
      info = <>
        Иагазин
      </>
    }


  return (
    <div data-testid={"GlavBlock"}>
      <h1 data-testid={"version"}>Версия для {__PLATFORM__}, Микрофронт Shop</h1>
        {info}

        <Outlet/>
    </div>
  )
}