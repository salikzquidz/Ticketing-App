import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/Header";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <h1>HELLO {currentUser ? currentUser.email : "guest"}</h1>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const context = appContext.ctx;
  const client = buildClient(context);
  // console.log(appContext);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  //   supaya component mana yang xde getinitialprops bisa run dengan ok
  if (appContext.Component.getInitialProps) {
    //   index js punya get initialprops
    pageProps = await appContext.Component.getInitialProps(context);
  }

  console.log(pageProps);
  console.log(data);
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
