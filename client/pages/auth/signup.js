import {useState} from 'react'
import axios from 'axios';
export default () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const signupHandler = async(e) => {
        e.preventDefault();
        const response = await axios.post('/api/users/signup', {
            username,
            email,
            password
        })
        console.log(response.data)
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
            <button className='btn btn-primary' type='submit'>Sign Up</button>
        </form>
    )
}