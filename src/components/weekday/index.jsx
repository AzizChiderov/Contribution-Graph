import React from 'react'
import style from './week.module.css'

export const Day = () => {
  return (
    <div className={style.container}>
        <ul className={style.list}>
            <li>ПН</li>
            <li>ВТ</li>
            <li>СР</li>
            <li>ЧТ</li>
            <li>ПТ</li>
            <li>СБ</li>
            <li>ВС</li>
        </ul>
    </div>
  )
}
