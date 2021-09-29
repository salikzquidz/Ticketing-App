import axios from 'axios';
import {useState} from 'react'
export default ({url, method, body}) => {
    const [errors, setErrors] = useState(null)
    // method === 'post', 'get'
    const doRequest = async() => {
        try {
            // clearkan errors
            setErrors(null)
            // take note here
            const response = await axios[method](url,body);
            return response.data
        } catch (error) {
            // take note here
            setErrors( 
                <div className="alert alert-danger">
                    <h1>Ooops..</h1>
                    <ul className='my-0'>
                        {error.response.data.errors.map(error => <li key={error.message}>{error.message}</li> )}
                    </ul>
                </div>)
            }
    }

    // conventional hooks
    // return [doRequest, errors];

    return {
        doRequest,
        errors
    }
}