import { ReactElement, useState } from 'react'
import styles from "./App.module.scss"
import { Link, Outlet } from 'react-router-dom';
import { shopRoutes } from "@packages/shared/src/routes/shop"
import { adminRoutes } from "@packages/shared/src/routes/admin"

type Props = {}

export function App({}: Props) {
    const [num, setNum] = useState<number>(0)

    const plusHandler = ()=>setNum(num => num+1);
    const minusHandler = ()=>setNum(num => num-1);

    let info:ReactElement = <div></div>
    if(__PLATFORM__ === "desktop"){ // Это Tree Shaking!
      info = <>
        <p>Очень крутая логика для бояр ммм</p>
        Вот ещё фоточка
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Dignissimos aspernatur adipisci culpa, et rem eum dolor vel. 
        Accusamus, illo ipsam. Quae distinctio cumque ipsum maiores obcaecati asperiores libero odit placeat!
      </>
    }
    if(__PLATFORM__ === "mobile"){
      info = <>
        Brug... рил
      </>
    }


  return (
    <div data-testid={"GlavBlock"}>
      <h1 data-testid={"version"}>Версия для {__PLATFORM__}</h1>
       <Link to={"/"}>Галв</Link><br />
       <Link to={shopRoutes.main}>В магаз</Link><br />
       <Link to={adminRoutes.main}>В нас</Link><br />
        <p className={styles.button} onClick={plusHandler}>+ <span>Увеличить!</span></p>
        <p className={styles.value + " " + styles.p}>Число: {num}</p>
        <p className={styles.p} onClick={minusHandler}>- Уменьшить</p>
        
        {info}

        <Outlet/>
    </div>
  )
}