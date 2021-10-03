import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      // Redirect to landing page after success
      Router.push("/");
    },
  });

  const signupHandler = async (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form action="" onSubmit={signupHandler}>
      <h1>SignIn</h1>

      <div className="form-group">
        <label htmlFor="">Email address</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button className="btn btn-primary" type="submit">
        Sign In
      </button>
    </form>
  );
};
