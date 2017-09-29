import React, { Component } from 'react';
import $ from 'jquery';
import Messages from './Messages';
import AppComponent from './ComPrueba';
import EntMensaje from '../Entidades/Mensajes';
import EntUsuario from '../Entidades/Usuario';
import Moment from 'react-moment';
import 'moment/locale/es';
import TimerMixin from 'react-timer-mixin';
import openSocket from 'socket.io-client';
import FileDrop  from "react-file-drop";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status:1, 
            items: props.mensajes,
            usuario: props.usuario,
            usuarios: props.usuarios,
            socket: props.socket
        };
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.tick = this.tick.bind(this);
        this.state.socket.on('new message', (messageobj) => this.reciveNewMessage(messageobj));
    }

    reciveNewMessage(messageobj){
        const message = this.validaMensajeEmoticons(messageobj.message.Mensaje);
        const mensaje = new EntMensaje();
        mensaje.fotoUsr = "";
        mensaje.nombreUsr = messageobj.username.nombre;
        mensaje.Mensaje = message;
        mensaje.From = "me";
        mensaje.timeSent = this.formatDate();
        this.state.items.push(mensaje);
        this.forceUpdate();
    }
    
    
    formatDate(){
        var currentdate = new Date();
        return currentdate.toString('yyyy-MM-dd');        
    }

    //Funcion que se ejecuta al cargar el componente
    componentDidMount(){    
        console.log(this.state.items);
        let timer = setInterval(this.tick, 1200);  
    }

    tick() {
        $('#DateDown').attr("from",new Date());
        this.setState({
            counter: this.state.counter + 1
        });
    }

    scrollToTop() {
        $('#ChatMain').animate({scrollTop: 0}, 900);
    }

    scrollToBottom() {
        var scc = this.refs.ChatMain;
        $('#ChatMain').animate({scrollTop: scc.scrollHeight + scc.offsetHeight},900);        
    }

    validaMensajeEmoticons(mensaje){
        var result = mensaje;
        var emotics = [":d:", ":xd:", ":p:", ":c:", ":mmm:", ":dd:", ":v:"];
        var directorios = ["risa", "equizde", "burlon", "trizted", "pensar", "yea", "pacman"];
        for (var a = 0; a < emotics.length; a++) {
            if (mensaje.indexOf(emotics[a]) >= 0) {
                result = mensaje.replace(new RegExp(emotics[a], 'gi'), "<img src='../img/Emoticonos/" + directorios[a] + ".png' width='30px' height='30px'/>");
            }
        }
        return result;
    }

    limpiaTexto(texto){
        texto = texto.replace(/[`~!@#$%^&*()_|+\-;',<>\{\}\[\]\\]/gi,'');
	return texto;
    }

    onClick(msg){        
        var mensajetxt = $('#message').val().trim();
        
        mensajetxt = this.limpiaTexto(mensajetxt);
        if (mensajetxt == ""){mensajetxt = msg}
        if(mensajetxt != ""){
            mensajetxt = this.validaMensajeEmoticons(mensajetxt);
            const mensaje = new EntMensaje();
            mensaje.fotoUsr = "";
            mensaje.nombreUsr = this.state.usuario.nombre;
            mensaje.Mensaje = mensajetxt;
            mensaje.From = "you";
            mensaje.timeSent = this.formatDate();
            this.state.items.push(mensaje);
            this.state.socket.emit('new message',mensaje);  
            this.forceUpdate();
        }else{
            alert("No se pueden introducir mensajes vacios o caracteres especiales");
        }
        $('#message').val("").focus();        
    }

    onSubmit(event){
        if(event.key == 'Enter'){
            this.onClick();
            event.preventDefault();
          }
    }

    droped(files, event){
        alert("Here");
    }


    render() {
    return (
        <div>
        <div className="ChatMain" id="ChatMain" ref="ChatMain" onLoad={this.scrollToBottom.bind(this)}>
        <ul className="chats">             
        {
            this.state.items.map(
                function(item)
                {
                    return (
                    <div><li className={(item.nombreUsr !== this.state.usuario.nombre)?"me":"you"}>
                    <div className="image">
                                <div className="imagelocochon">
                                    <img className="imgusr myimg" src="../img/source.gif"/>
                                    <b>{item.nombreUsr}</b>
                                    <Moment id="DateDown" from={new Date()}>{item.timeSent}</Moment>                                  
                                </div>
                            </div>
                            <p id="1t"><div dangerouslySetInnerHTML={{ __html: item.Mensaje }} /></p>
                        </li></div>
                    )
                }, this)
        }
        </ul>
        </div>
        <a href="#" className="move-top" onClick={this.scrollToTop}>↑</a>    
        <a href="#" className="move-Bottom" onClick={this.scrollToBottom}>↓</a>   
          
        <div className="ChatInput">
            <textarea id="message" ref="message" onKeyPress={this.onSubmit} placeholder="Escribe cualquer cosa.."></textarea>
            <input type="submit" id="submit" value="Enviar" onClick={this.onClick}/>
        </div>
      </div>
    );
    }
}

export default Chat;