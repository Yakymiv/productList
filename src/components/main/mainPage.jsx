import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductListPage from './productListPage';
import ProductPage from './productPage';

//Check router
//Main page

const MainPage = () => {

  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <ProductListPage/>
        </Route>
        <Route exact path='/product/:id'>
          <ProductPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default MainPage;