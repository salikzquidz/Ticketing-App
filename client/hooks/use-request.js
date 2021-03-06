import axios from "axios";
import { useState } from "react";
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  // method === 'post', 'get'
  const doRequest = async () => {
    try {
      // clearkan errors
      setErrors(null);
      // take note here
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      // take note here
      console.log(error);
      console.log("woi");
      setErrors(
        <div className="alert alert-danger">
          <h1>Ooops..</h1>
          {error && (
            <ul className="my-0">
              {error.response.data.errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  };

  // conventional hooks
  // return [doRequest, errors];

  return {
    doRequest,
    errors,
  };
};
// export default useRequest;
