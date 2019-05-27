import React from 'react'
import { connect } from 'react-redux'

import NotificationsItem from './NotificationsItem'
import './style.scss'

class NotificationsList extends React.Component {

    state = {
        notifications: [],
    }

    componentDidMount() {
        const { socket } = this.props


        socket.on('like', (data) => {
            this.setState({
                notifications: [{ msg: data.message }, ...this.state.notifications]
            })
        })

        socket.on('superlike', (data) => {
            this.setState({
                notifications: [{ msg: data.message, img: data.image }, ...this.state.notifications]
            })
        })

    }

    render() {
        const { notifications } = this.state
        return (
            <div className="notificationsList mt-2 p-3">
                <h2 className="font-weight-bold">Notifications</h2>
                {notifications.length == 0 ?
                    (<div className="font-weight-bold">No Notifications yet.</div>) :
                    notifications.map(({ msg, img }, index) => (
                        <NotificationsItem message={msg} image={img} key={index} />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    socket: auth.socket
})

export default connect(
    mapStateToProps
)(NotificationsList)