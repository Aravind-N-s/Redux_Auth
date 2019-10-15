import React from 'react'
import axios from '../../Config/axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit(e){
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/login`,formData)
        .then((response)=>{
            if(response.data.errors){
                Swal.fire(response.data.errors)
            }else{
                const token=response.data.token
                if(token){
                    localStorage.setItem('userAuthToken',token)
                }
            }
            return <Redirect to={{pathname: '/users/account'}}/>
        })
        .catch(err =>{
            alert(err)
        })

    }
    render(){
        return(
            <form id = "form" style={{float:"left"}} className="form-group" onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <label id = "input">
                    <input className = "form-control" type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                </label><br/>               
                <label id = "input">                      
                    <input className = "form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </label><br />
                <input className = "btn btn-success" type="submit"/><br />
            </form>
        )
    }
}
// Login = withRouter(Login)
export default connect()(Login)