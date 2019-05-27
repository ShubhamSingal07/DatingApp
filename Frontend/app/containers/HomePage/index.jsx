import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'
import { ImageList, NotificationsList, NavBar } from '../../components'

class HomePage extends React.Component {

    async componentDidMount() {
        const { fetchHomePage } = this.props
        await fetchHomePage
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container align-items-baseline">
                    <div className="d-flex justify-content-around">
                        <ImageList />
                        <NotificationsList />
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    fetchHomePage: () => dispatch(Actions.fetchHomePage()),
})

export default connect(
    null,
    mapDispatchToProps
)(HomePage)