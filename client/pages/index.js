import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  //   axios.get("/api/users/currentuser");
  return <h1>Landing page </h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // we are on the server
    // requests should be made to http://ingress-
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );
    return response.data;
  } else {
    // we are on the browser
    // request can be made with a base url of ''
    const response = await axios.get("/api/users/currentuser");
    return response.data;
  }
  return {};
};
export default LandingPage;
