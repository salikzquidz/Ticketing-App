const LandingPage = ({color}) => {
    return <h1>Landing page {color}</h1>
}

LandingPage.getInitialProps = () => {
    return {color : 'red'}
}
export default LandingPage;