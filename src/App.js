import Header from './components/Header';
import Home from './components/Home';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ Route, Switch } from 'react-router-dom';
import Login from './components/Login';

const mapStateToProps = state => ({
    appName: state.common.appName
});

class App extends Component {  
    render() {
      return (
        <div>
            <Header appName={this.props.appName} />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>

      );
    }
  }

//   App.contentTypes = {
//       router: React.PropTypes.object.isRequired
//   };

export default connect(mapStateToProps, () => ({}) )(App);