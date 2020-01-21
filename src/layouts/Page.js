import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import AddDimensionsPage from '../pages/AddDimensionsPage'
import TextilesPage from '../pages/TextilesPage'
import AddTextilePage from '../pages/AddTextilePage'
import addClothesStylePage from '../pages/AddClothesStylePage'
import ProfileMainPage from '../pages/profile-pages/ProfileMainPage'
import ClothesStylesPage from '../pages/ClothesStylesPage'
import RegistrationPage from '../pages/RegistrationPage'
import AuthenticationPage from '../pages/AuthenticationPage'
import DimensionsPage from '../pages/profile-pages/DimensionsPage';
import CreateClothesPage from '../pages/CreateClothesPage';

class Page extends React.Component {

  state = {
    user: ""
  }
  render() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/add-dimensions" exact component={AddDimensionsPage} />
        <Route path="/textiles" exact component={TextilesPage} />
        <Route path="/addTextile" exact component={AddTextilePage} />
        <Route path="/addClothesStyle" exact component={addClothesStylePage} />
        <Route path="/registration" exact component={RegistrationPage} />
        <Route path="/clothesStyles" exact component={ClothesStylesPage} />
        <Route path="/profile" exact component={ProfileMainPage} />
        <Route path="/dimensions" exact component={DimensionsPage} />
        <Route path="/auth" exact user={this.state.user} component={AuthenticationPage} />
        <Route path="/createClothes" component={CreateClothesPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
}

export default Page;