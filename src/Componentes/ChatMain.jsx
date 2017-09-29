import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import Chat from './Chat';
import Menu from './Menu';
import EntRoom from '../Entidades/Room';

class CompChatMain extends Component {
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

  render() {    
    if(this.state.status == 1)
    {
        return (          
        <div> 
          <aside ref="menu" id="menu">             
            <Menu refs={this.props} usuario={this.state.usuario} usuarios={this.state.usuarios} socket={this.state.socket}/>
          </aside> 
          <article ref="main">
            <section>   
              <Chat refs={this.props} 
                usuario={this.state.usuario} 
                usuarios={this.state.usuarios} 
                socket={this.state.socket} 
                mensajes={this.state.mensajes}/> 
            </section>
          </article>
        </div>
        );  
    }    
  }
}

export default CompChatMain;