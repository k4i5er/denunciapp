import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Profile from './components/Profile'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
// import Home from './components/Home'
import Reports from './components/features/Reports'
import ReportsView from './components/features/ReportsView'
import CrimesView from './components/features/CrimeView'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/report/:id" component={Reports} />
        <Route exact path="/view/crimes" component={CrimesView} />
        <Route exact path="/view/reports/:id" component={ReportsView} />
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/auth/login" component={Login} />
        {/* <Route exact path="/auth/forgotten-password" component={Forgotten} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;