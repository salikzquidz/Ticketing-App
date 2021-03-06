import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
  //   return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  console.log("LandingPAGE");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
