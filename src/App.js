import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'

import EditarSuscriptor from './components/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor';
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor';
import Suscriptores from './components/suscriptores/Suscriptores';
import Navbar from './components/layout/Navbar';

import {suscriptores, nuevoSuscriptor, editarSuscriptor, mostrarSuscriptor, home,
mostrarLibro, nuevoLibro, editarLibro, prestamoLibro, login} from './routes'

import Libros from './components/libros/Libros';
import MostrarLibro from './components/libros/MostrarLibro';
import NuevoLibro from './components/libros/NuevoLibro';
import EditarLibro from './components/libros/EditarLibro';
import PrestamoLibro from './components/libros/PrestamoLibro';
import Login from './components/auth/Login';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/authHelper'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path={home} component={UserIsAuthenticated(Libros)}/>
            <Route exact path={nuevoLibro} component={UserIsAuthenticated(NuevoLibro)}/>
            <Route exact path={`${mostrarLibro}/:id`} component={UserIsAuthenticated(MostrarLibro)}/>
            <Route exact path={`${editarLibro}/:id`} component={UserIsAuthenticated(EditarLibro)}/>
            <Route exact path={`${prestamoLibro}/:id`} component={UserIsAuthenticated(PrestamoLibro)}/>


            <Route exact path={suscriptores} component={UserIsAuthenticated(Suscriptores)}/>
            <Route exact path={nuevoSuscriptor} component={UserIsAuthenticated(NuevoSuscriptor)}/>
            <Route exact path={`${mostrarSuscriptor}/:id`} component={UserIsAuthenticated(MostrarSuscriptor)}/>
            <Route exact path={`${editarSuscriptor}/:id`} component={UserIsAuthenticated(EditarSuscriptor)}/>
            <Route exact path={login} component={UserIsNotAuthenticated(Login)} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
