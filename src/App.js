import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Loader.css';

import { bounce } from 'react-animations';
import Radium, { Style, StyleRoot } from 'radium';
import MainSection from './Componentes/Main';





class App extends Component {
  constructor(){
    super();
    this.state = {
      status:1,
      usuario: null,
      usuarios : [],
      mensajes: []
    };    
  }


    
  renderLoginButton(){
    if(this.state.status == 1){  
    }
    else if(this.state.status == 2){
      this.refs.main.setAttribute("float","");
      this.refs.main.setAttribute("height","100%");
      return(
        <div className="load">   
        <div className="circle"></div>
        <div className="circle1"></div>
        Cargando...
        </div>
      );
    }
     
  }

  renderPerfilUsuario(){
    if(this.state.status == 3){
      this.refs.menu.setAttribute("display","inline-block");
      this.refs.main.setAttribute("float","left");
    return(
    <div>     
      <p>{this.state.usuario.nombre} </p>
      <img src={this.state.usuario.imagen} width="53px" height="53px" alt="Imagen Perfil" />
      <p>{this.state.usuario.correo} </p>
      <button onClick={this.handleAuth}>Salir </button> 
    </div>
    );
    }   
  }

  render() {
    return (
      <div className="App">
        <header> 
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Chat</h2>
        </header>      
        <MainSection/>
        <footer>
        </footer> 
      </div>
    );
  }
}

export default App;
