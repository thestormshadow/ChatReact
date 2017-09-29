import React, { Component } from 'react';
import EntUsuario from '../Entidades/Usuario';
import CompLoaderAuth from './Loader';
import openSocket from 'socket.io-client';


class CompFormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        usuario : null,
        usuarios : [],
        socket : openSocket('http://localhost:3010'),
        mensajes : []
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.state.socket.on('login', (usuario) => this.loginAuth(usuario))
  }

  loginAuth(usuario){
    const usr = new EntUsuario();
    usr.nombre = usuario.username.nombre;
    usr.correo = usuario.username.correo;
    usr.imagen = usuario.username.imagen;
    if(usuario){
        this.state.usuarios = usuario.AllUsers;
        this.state.mensajes = usuario.mensajes;
        this.setState({usuario:usr});
    }
  }

  validaCampos(){
      if(this.refs.Correo.value != "" && this.refs.Correo.value.length >= 6)
        return true;
      else
        return false;
  }

  handleAuth(){
    if(!this.state.usuario){
        const usuario = new EntUsuario();
        usuario.nombre = "Javier"+(Math.floor(Math.random() * 100) + 1);
        usuario.correo = this.refs.Correo.value;
        usuario.imagen = "../img/user1600.png";     
        this.state.socket.emit('add user', usuario);  
      }
  }

  render() {
    if(!this.state.usuario){
        return (
        <article ref="main" id="FormLogin">
        <section>
        <div id="login">
            <h1><strong></strong> Inicio de session.</h1>    
            <form action="javascript:void(0);" method="POST">
            <fieldset>
                <input type="text" required ref="Correo"  placeholder="Usuario"/>
                <input type="password" required  placeholder="Contraseña"/>
                <p><a href="#">Olvidaste tu contraseña? Recuperala Aqui</a></p>
                <p><a href="#">No tienes una cuenta? Registrate Aqui</a></p>
                <input type="submit" onClick={this.handleAuth}  value="Login"/>
                
            </fieldset>
            </form>
            <p><span className="btn-round">Ó</span></p>
            <p>
                <a className="facebook-before"><span className="fontawesome-facebook"></span></a>
                <button className="facebook">Login Con Facbook</button>
            </p>
            <p>
                <a className="twitter-before"><span className="fontawesome-twitter"></span></a>
                    <button className="twitter">Login Con Twitter</button>
            </p>   
        </div>
        </section>
        </article>
    );
    }else{
        return (        
                <CompLoaderAuth 
                refs={this.props} 
                usuario={this.state.usuario} 
                usuarios={this.state.usuarios} 
                socket={this.state.socket} 
                mensajes={this.state.mensajes}/>            
        );
    }
    
  }
}

export default CompFormLogin;
