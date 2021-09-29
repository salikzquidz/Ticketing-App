import {useState} from 'react'
import axios from 'axios';

import useRequest from '../../hooks/use-request';
export default () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    // const [errors, setErrors] = useState([])
    const { doRequest, errors} = useRequest({
        url : "/api/users/signup",
        method : "post",
        body : {
            username,
            email,
            password
        }
    })
    
    const signupHandler = async(e) => {
        e.preventDefault();
        doRequest();
        // try{
        //     const response = await axios.post('/api/users/signup', {
        //         username,
        //         email,
        //         password
        //     })
        //     console.log(response.data)
        // }catch(error){
        //     console.log(error.response.data)
        //     // take note here
        //     setErrors(error.response.data.errors)
        // }
    }
    
    return (
        <form action="" onSubmit={signupHandler}>
            <h1>Signup</h1>
            <div className="form-group">
                <label htmlFor="">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e)=> setUsername(e.target.value)} />                
            </div>
            <div className="form-group">
                <label htmlFor="">Email address</label>
                <input type="text" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} />                
            </div>
            <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            {errors}
            {/* Ilmu baru, dispay bila ada error dalam array */}
            {/* {errors.length > 0 && <div className="alert alert-danger">
                <h1>Ooops..</h1>
                <ul className='my-0'>
                    {errors.map(error => <li key={error.message}>{error.message}</li> )}
                </ul>
            </div>} */}

            <button className='btn btn-primary' type='submit'>Sign Up</button>
        </form>
    )
}