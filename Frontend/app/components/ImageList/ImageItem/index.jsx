import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../../actions'
import './style.scss'

class ImageItem extends React.Component {

    state = {
        isLiked: false,
        isSuperliked: false
    }

    static getDerivedStateFromProps(props, state) {
        const { data, user } = props
        return {
            ...state,
            isLiked: data.likedby.includes(user.id),
            isSuperliked: data.superlikedby.includes(user.id)
        }
    }

    render() {

        const { data, block, like, superlike, socket, user } = this.props
        const { isLiked, isSuperliked } = this.state

        const handleBlock = () => {
            block(data.id)
        }

        const handleLike = () => {
            like(user.id, data.id, socket, user.data)
        }

        const handleSuperlike = () => {
            superlike(user.id, data.id, socket, user.data, user.image)
        }

        return (
            <div className="imageItem ml-2 mt-3 ">
                <div className="p-2">
                    <div>
                        <span className="font-weight-bolder">{data.username}</span>
                        <button className="btn btn-danger float-right mb-1 mr-2" onClick={handleBlock}>Block</button>
                    </div>
                    <div>
                        <img className="rounded" src={data.image} width="700px" />
                    </div>
                    <div className="mt-1">
                        <span className="pl-2">
                            {isLiked ? <button className="btn btn-danger">Liked</button> : <button className="btn btn-dark" onClick={handleLike}>Like</button>}
                        </span>
                        <span className="pl-2">
                            {isSuperliked ? <button className="btn btn-danger">SuperLiked</button> : <button className="btn btn-dark" onClick={handleSuperlike}>SuperLike</button>}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user, auth }) => ({
    user,
    socket: auth.socket
})

const mapDispatchToProps = dispatch => ({
    block: (blocked) => dispatch(Actions.block(blocked)),
    like: (userid, imageLiked, socket, userliked) => dispatch(Actions.like(userid, imageLiked, socket, userliked)),
    superlike: (userid, imageSuperliked, socket, usersuperliked, image) => dispatch(Actions.superlike(userid, imageSuperliked, socket, usersuperliked, image))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageItem)