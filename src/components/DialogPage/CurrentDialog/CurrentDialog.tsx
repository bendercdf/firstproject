import * as React from 'react'
import s from './CurrentDialog.module.css'
import Message from "./Message/Message";

const CurrentDialog = (props: any) => {

    let currentDialogMessages = props.dialogPage.dialogs[0].messages.map((p: any) =>
        <Message message={p.content} user={p.author.name} avatar={p.author.avatar} addedTime={p.addedTime}
                 type={p.type}/>
    );

    let newMessageText: any = React.createRef();

    let onSendMessageButtonClick = () => {
        props.onSendMessageButtonClick();
    };

    let onMessageChange = () => {
        let newMessage = newMessageText.current.value;
        props.onMessageChange(newMessage);
    };

    return <div className={s.currentDialog}>
        {currentDialogMessages}
        <div>
                <textarea onChange={onMessageChange} placeholder='Enter you message...'
                          className={s.newMessageTextArea} ref={newMessageText}
                          value={props.dialogPage.dialogs[0].newMessage}/>
        </div>
        <div className={s.sendButton}>
            <button onClick={onSendMessageButtonClick}>Send</button>
        </div>
    </div>


};

export default CurrentDialog;