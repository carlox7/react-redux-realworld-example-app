import Header from './Header';
import Home from './Home';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ Route, Switch } from 'react-router-dom';
import Login from './Login';
import { store } from '../store';
import { push } from 'react-router-redux';
import agent from '../agent';
import Register from './Register';
import Settings from './Settings';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch( { type: 'APP_LOAD', payload, token }),
    onRedirect: () =>
        dispatch({ type: 'REDIRECT' })
});

class App extends Component { 
    componentWillMount(){
        const token = window.localStorage.getItem('jwt');
        if(token){
            agent.setToken(token);
        }

        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    componentWillReceieveProps(nextProps) {
        if(nextProps.redirectTo){
            // this.context.router.replace(nextProps.redirectTo);
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    } 

    render() {
      return (
        <div>
            <Header 
            currentUser={this.props.currentUser}
            appName={this.props.appName} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </div>

      );
    }
  }

//   App.contentTypes = {
//       router: React.PropTypes.object.isRequired
//   };

export default connect(mapStateToProps, mapDispatchToProps)(App);