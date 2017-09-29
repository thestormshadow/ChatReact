import React, { Component } from 'react';
import $ from 'jquery';
import EntMensaje from '../Entidades/Mensajes';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            usuario: props.usuario,
            items: props.items
        };
        this.onClick = this.onClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    getInitialState(){
        return{
            items : this.props.items
        }
    }
    //Funcion que se ejecuta al cargar el componente
    componentDidMount(){        
        setTimeout(function () {
        const mensaje1 = new EntMensaje();
        mensaje1.fotoUsr = "";
        mensaje1.nombreUsr = "Jose";
        mensaje1.Mensaje = "Mensaje 1";
        mensaje1.From = "me";
        const mensaje2 = new EntMensaje();
        mensaje2.fotoUsr = "";
        mensaje2.nombreUsr = "Jose";
        mensaje2.Mensaje = "Mensaje 2";
        mensaje2.From = "you";
        const mensaje3 = new EntMensaje();
        mensaje3.fotoUsr = "";
        mensaje3.nombreUsr = "Jose";
        mensaje3.Mensaje = "Mensaje 3";
        mensaje3.From = "me";
        var dataFromAjax = [mensaje1, mensaje2, mensaje3];
        this.setState({
            items: this.state.items.concat(dataFromAjax)
        });
        }.bind(this));
    }

    scrollToTop() {
        $('#ChatMain').animate({scrollTop: 0}, 900);
    }

    scrollToBottom() {
        var scc = this.refs.ChatMain;
        $('#ChatMain').animate({scrollTop: scc.scrollHeight + scc.offsetHeight},900);
        
    }

    onClick(){
        var mensajetxt = $('#message').val();
        if(mensajetxt != ""){
            const mensaje = new EntMensaje();
            mensaje.fotoUsr = "";
            mensaje.nombreUsr = this.state.usuario.nombre;
            mensaje.Mensaje = mensajetxt;
            mensaje.From = "you";
            $('#message').val("");
            this.state.items.push(mensaje);
            this.forceUpdate();
        }        
    }

    render() {
    return <div>
      {
        this.state.items.map(
          function(item)
          {
            return (
                <div><li className={item.From}>
                <div className="image">
                            <div className="imagelocochon">
                                <img className="imgusr myimg" src="../img/source.gif"/>
                                <b>{item.nombreUsr}</b>
                                <i id="timesent1" className="timesent" data-time="1506399379857">6 minutes ago</i> 
                            </div>
                        </div>
                        <p id="1t">{item.Mensaje}</p>
                    </li></div>
              )
          }
        )
      }<br/><div onClick={this.addClick}>ADD</div></div>;
    }
}

export default Messages;