import React from 'react'

import './style.scss'

const NotificationsItem = ({ message, image }) => (
    <div className="notificationItem p-2">
        {!image ? null : <img src={image} width="50px" className="rounded-pill"/>}
        <span>{message}</span>
    </div>
)

export default NotificationsItem