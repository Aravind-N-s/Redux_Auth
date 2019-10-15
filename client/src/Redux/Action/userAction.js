import axios from '../../Config/axios'

export const addUser = (user) => {
    return { type: 'SET_USER', payload: user}
}

export const startAddUser = () =>{
    return (dispatch) => {
        axios.get('/users/account',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else {
                dispatch(addUser(response.data))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const resetUser = () => {
    return { type: 'RESET_USER'}
}

export const startResetUser = () =>{
    return (dispatch) => {
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else {
                dispatch(resetUser(response.data))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}