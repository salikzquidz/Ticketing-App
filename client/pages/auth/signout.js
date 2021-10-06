import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
export default () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signOut",
    method: "post",
    body: {},

    onSuccess: () => {
      Router.push("/");
    },
  });

  //   const signOutHandler = (e) => {
  //     e.preventDefault();
  //     doRequest();
  //   };

  useEffect(() => {
    doRequest();
  }, []);
  return <div>signing out</div>;
};
