import React, { Component } from 'react';
import EntUsuario from '../Entidades/Usuario';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status:1, 
            usuario: props.usuario,
            usuarios: props.usuarios,
            socket: props.socket
        };
        this.state.socket.on('userJoined', (user) => this.joinUser(user));
        this.state.socket.on('userLeft', (user) => this.leftUser(user));
        this.state.socket.on('allUsers', (AllUsers) => this.refreshUsers(AllUsers));
        this.tick = this.tick.bind(this);
    }

    //El evento indica: un usuario entro a la sala
    joinUser(user) {
        const usr = new EntUsuario();
        usr.nombre = user.username.nombre;
        usr.correo = user.username.correo;
        usr.imagen = user.username.imagen;
        this.state.usuarios.push(usr);
        this.forceUpdate();
    }

    //El evento indica: que un usuario Salio de session
    leftUser(user){  
        var array = [];      
        var nom = user.username.nombre;
        array = this.state.usuarios.filter(function(item) {
            return item.nombre !== nom
        });  
        this.setState({
            usuarios: array
        });        
    }

    refreshUsers(users){
        var array = []; 
        users.AllUsers.map(function(item){
            const usr = new EntUsuario();
            usr.nombre = item.nombre;
            usr.correo = item.correo;
            usr.imagen = item.imagen;
            array.push(usr);
        })    
        this.setState({
            usuarios: array
        });          
    }

    componentDidMount(){    
        let timer = setInterval(this.tick, 9000); 
    }

    tick() {
        this.state.socket.emit('getUsers');  
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
    return (
      <div>                 
        <img className="imgusr myimg" width="40%" height="30%" src="../img/source.gif"/>
        <br/>
        <b>{this.props.usuario.nombre}</b>   
        <br/><br/><br/>
        Usuarios Conectados: {this.state.usuarios.filter(x=>x.nombre !== this.state.usuario.nombre).map(function(usuario){
            return (<li>{usuario.nombre}</li>)
        })}   
      </div>
    );
    }
}

export default Menu;