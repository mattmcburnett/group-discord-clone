import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Redirect } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import ServerNavBar from "./components/ServerNavBar";
import DiscoverServersIndex from "./components/DiscoverServersIndex";
import UpdateUser from "./components/UpdateUserForm";
// import TopBar from "./components/TopBar";
// import ServersList from "./components/ServersList";
import ChannelViewIndex from "./components/ChannelViewIndex";
// import { Redirect } from "react-router-dom/cjs/react-router-dom";
import LandingPage from "./components/LandingPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
        <Routes>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path="/home">

                <ServerNavBar isLoaded={isLoaded} />


          </Route>
          <Route path="/:serverId/:channelId">
            {sessionUser ? (
              <ChannelViewIndex />

            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route path="/discover">
            <DiscoverServersIndex />
          </Route>
          <Route path="/users/:userId/update">
            <UpdateUser />
          </Route>
          <Route path="/users/:userId">
          </Route>
        </Routes>


    </>
  );
}

export default App;
