// import { Route, Switch } from "react-router";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component} from 'react'
import Layout from './Layout'
import Landing from './Landing'
import Detail from './Detail'
import NewItem from './NewItem'

class Recipes extends Component{
  render(){
    return(
      <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/Detail" component={Detail} />
              <Route exact path="/Detail/:uuid" component={Detail} />
              <Route exact path="/NewItem/" component={NewItem} />
              <Route exact path="/NewItem/:uuid" component={NewItem} />
            </Switch>
        </BrowserRouter>
      </Layout>
    )
  }
}
export default Recipes;
