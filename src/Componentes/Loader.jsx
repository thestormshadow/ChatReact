import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import CompChatMain from './ChatMain';


class CompLoaderAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        status:1, 
        usuario: props.usuario,
        usuarios: props.usuarios,
        socket: props.socket,
        mensajes : props.mensajes
    };
  }

  loadAuth(){
      TimerMixin.setTimeout(
      () => {         
        //window.location.assign('http://github.com');
        this.setState({status:2});
       },
      1000
      );        
  }



  render() {
    if(this.state.status == 1)
    {
        return (
        <div className="load">   
            <div className="circle"></div>
            <div className="circle1"></div>
            Cargando... {this.state.usuario.correo}
            {this.loadAuth()}
        </div>
        );  
    }
    else if(this.state.status == 2){
        return (
        <CompChatMain refs={this.props} 
        usuario={this.state.usuario} 
        usuarios={this.state.usuarios} 
        socket={this.state.socket} 
        mensajes={this.state.mensajes}/> 
        );
    }
  }
}

export default CompLoaderAuth;