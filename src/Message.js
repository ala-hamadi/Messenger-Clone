import React, { forwardRef } from 'react';
import dayjs from 'dayjs'
import './Message.css'
import {Card,CardContent,Typography,Tooltip} from '@material-ui/core'
const Message=forwardRef(({message,username},ref)=> {

    const isUser=username===message.username;
    return (
            <div ref={ref} className={`message ${isUser && 'message__userDiv'}`}>
                <Card className={isUser ? "message__pop message__User" : "message__pop message__Guest"}>
                    <CardContent className="message__content">
                        <Tooltip title={message.createdAt ? dayjs(message.createdAt.toDate()).format('h:mm a, MMMM DD YYYY'):''} placement="bottom-end" arrow>
                            <Typography color="primary" variant="h5" className={isUser ? "message__textUser" : "message__textGuest"}>
                                {
                                    isUser ? message.text 
                                    : (message.username ?
                                        `${message.username} : ${message.text}`
                                        : `Anonymous : ${message.text}`
                                    )
                                }
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div> 
    )
})

export default Message

