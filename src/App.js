import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/home";
import { BrowserRouter, Switch, Route , Redirect } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./Components/PostDetails/PostDetails";
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="574857338655-q9lde667ne4r9j3nnp9918aai9q0g304.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" component={PostDetails} />
            <Route path="/auth" exact component={() => (!user? <Auth />: <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
