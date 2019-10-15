import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

const Account = (props) => {
    return(
        Swal.fire("Successfully Logged Out")
        // <h3>User Account Details</h3>
        // <h4>{props.user.username}</h4>
        // <Link to="/users/logout">Logout</Link> 
    
    )

}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Account)