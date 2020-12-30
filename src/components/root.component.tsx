import '../styles/nav.scss';
import '../styles/content.scss';

import { Loading } from './loading.component';

import { history } from '../providers';

import React, { FC, lazy, Suspense } from 'react';

import {
  NavLink, Redirect, Route, Router, Switch,
} from 'react-router-dom';

const One = lazy(() => import('../modules/one/one.container'));
const Two = lazy(() => import('../modules/two/two.container'));

export const Root: FC = () => (
  <Router history={history}>
    <nav>
      <NavLink to="/one" activeClassName="is-active">Babylon Js</NavLink>
      <NavLink to="/two" activeClassName="is-active">Two</NavLink>
    </nav>
    <div className="content">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/one" component={One} />
          <Route path="/two" component={Two} />
          <Redirect exact from="/" to="/one" />
        </Switch>
      </Suspense>
    </div>
  </Router>
);
