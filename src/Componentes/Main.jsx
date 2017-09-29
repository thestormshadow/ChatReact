import React, { Component } from 'react';
import CompFormLogin from './FormLogin';

class MainSection extends Component {
   constructor() {
    super();
    this.state = { };
  }

  renderLoginButton(){  
      return(
        <CompFormLogin refs={this.refs} /> 
      ); 
  }

  render() {
    return (
      <div>                 
            {this.renderLoginButton()}          
      </div>
    );
  }
}

export default MainSection;