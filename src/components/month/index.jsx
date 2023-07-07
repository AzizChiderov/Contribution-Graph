import React from 'react'
import style from './month.module.css'

export const Month = () => {
  return (
    <div className={style.container}>
        <ul className={style.list}>
            <li>Январь</li>
            <li>Февраль</li>
            <li>Март</li>
            <li>Апрель</li>
            <li>Май</li>
            <li>Июнь</li>
            <li>Июль</li>
            <li>Август</li>
            <li>Сентябрь</li>
            <li>Октябрь</li>
            <li>Ноябрь</li>
            <li>Декабрь</li>
        </ul>
    </div>
  )
}
