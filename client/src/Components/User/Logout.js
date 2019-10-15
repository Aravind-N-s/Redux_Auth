import React from 'react'
import {connect} from 'react-redux'
import {startResetUser} from '../../Redux/Action/userAction'
import Swal from 'sweetalert2'

class Logout extends React.Component{
    
    componentDidMount(){
        this.props.dispatch(startResetUser())
        localStorage.removeItem('userAuthToken')
        this.props.history.push('/')
    }
    render(){
        return(
            Swal.fire("Successfully Logged Out")
        )
    }
}
export default connect()(Logout)