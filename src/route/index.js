import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RouterWrapper from './routerWrapper';
import { Provider } from 'react-redux';
import store from '../store';

import App from '../App';
import Login from '../pages/login';
import Common from '../common';
import OrderDetail from '../pages/order/components/detail';

const Home = lazy(() => import('../pages/home'));
const Buttons = lazy(() => import('../pages/ui/buttons'));
const Modals = lazy(() => import('../pages/ui/modals'));
const Loading = lazy(() => import('../pages/ui/loading'));
const Notification = lazy(() => import('../pages/ui/notification'));
const Message = lazy(() => import('../pages/ui/message'));
const Tabs = lazy(() => import('../pages/ui/tabs'));
const Gallery = lazy(() => import('../pages/ui/gallery'));
const Carousel = lazy(() => import('../pages/ui/carousel'));
const LoginF = lazy(() => import('../pages/form/login'));
const RegF = lazy(() => import('../pages/form/reg'));
const Basic = lazy(() => import('../pages/table/basicTable'));
const High = lazy(() => import('../pages/table/highTable'));
const City = lazy(() => import('../pages/city'));
const Order = lazy(() => import('../pages/order'));
const User = lazy(() => import('../pages/user'));
const BikeMap = lazy(() => import('../pages/map'));
const Pie = lazy(() => import('../pages/charts/pie'));
const Line = lazy(() => import('../pages/charts/line'));
const Bar = lazy(() => import('../pages/charts/bar'));
const Rich = lazy(() => import('../pages/rich'));
const PerMission = lazy(() => import('../pages/permission'));
const NoMatch = lazy(() => import('../pages/noMatch'));

class Router extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <RouterWrapper>
            <Switch>
            <Route path='/login' component={Login} />
            <Route path='/common' render={() => (
                <Common>
                  <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                </Common>
              )} 
            />

              <Route path='/' render={() => (
                <App>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
 
                      <Route path='/home' component={Home}/>
                      <Route path='/ui/buttons' component={Buttons} />
                      <Route path='/ui/modals' component={Modals} />
                      <Route path='/ui/loadings' component={Loading} />
                      <Route path='/ui/notification' component={Notification} />
                      <Route path='/ui/messages' component={Message} />
                      <Route path='/ui/gallery' component={Gallery} />
                      <Route path='/ui/carousel' component={Carousel} />
                      <Route path='/ui/tabs' component={Tabs} />
                      <Route path='/form/login' component={LoginF} />
                      <Route path='/form/reg' component={RegF} />
                      <Route path='/table/basic' component={Basic} />
                      <Route path='/table/high' component={High} />
                      <Route path='/city' component={City} />
                      <Route path='/order' component={Order} />
                      <Route path='/user' component={User} />
                      <Route path='/bikeMap' component={BikeMap}/>
                      <Route path='/charts/pie' component={Pie}/>
                      <Route path='/charts/line' component={Line}/>
                      <Route path='/charts/bar' component={Bar}/>
                      <Route path='/rich' component={Rich}/>
                      <Route path='/permission' component={PerMission}/>
                      <Redirect to='/home'/>
                      <Route component={NoMatch} />

                    </Switch>
                  </Suspense>
                </App>
              )}/>
            </Switch>
          </RouterWrapper>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router;
