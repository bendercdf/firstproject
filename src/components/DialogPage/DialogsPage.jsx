import React from 'react'
import s from'./DialogPage.module.css'
import ava from "../../img/ava.png";
import avaSmile from "../../img/avaSmile.png";
import DialogList from "./DialogList/DialogsList";

const DialogPage = (props) => {
    return <div className={s.dialogPage}>

        <DialogList users={props.users}/>

        <div className={s.currentDialog}>
            <ul>
                <li className={s.message}>
                    <img className={s.dialogAva} src={ava}/>
                    <p className={s.userName}>Me</p>
                    <div className={s.messageBlock}>
                        <div className={s.angle}></div>
                        <p className={s.messageText}>Hello</p>
                    </div>
                </li>

                <li className={s.message}>
                    <img className={s.dialogAva} src={avaSmile}/>
                    <p className={s.userName}>Dima</p>
                    <div className={s.messageBlock}>
                        <div className={s.angle}></div>
                    <div className={s.messageText}>Универсальное свойство border позволяет одновременно установить толщину,
                        стиль и цвет границы вокруг элемента. Значения могут идти в любом порядке, разделяясь пробелом,
                        браузер сам определит, какое из них соответствует нужному свойству. Для установки границы только
                        на определенных сторонах элемента, воспользуйтесь свойствами border-top, border-bottom,
                        border-left, border-right.</div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
}

export default DialogPage;