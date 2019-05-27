import React from 'react'
import { connect } from 'react-redux'

import ImageItem from './ImageItem'
import * as Actions from '../../actions'
import './style.scss'

class ImageList extends React.Component {

    async componentDidMount() {
        const { fetchHomePage } = this.props;
        await fetchHomePage();
    }

    render() {
        const { users } = this.props
        return (
            <div className="imageList m-2 p-3">
                {users.map(data => (
                    <ImageItem data={data} key={data.id} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users: users.data
})

const mapDispatchToProps = dispatch => ({
    fetchHomePage: () => dispatch(Actions.fetchHomePage()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageList)