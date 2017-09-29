import React, { Component } from 'react';
import $ from 'jquery';

var AppComponent = React.createClass({ 
  getDefaultProps: function () {
    return {
      items: [],
      usuario: null
    }
  },
  getInitialState : function(){
    return{
      items : this.props.items
    }
  },
  componentDidMount: function () {
    // Mimics an AJAX call, but replace this with an actial AJAX call.
    setTimeout(function () {
      var dataFromAjax = ['one', 'two', 'three'];
      this.setState({
        items: this.state.items.concat(dataFromAjax)
      });
    }.bind(this));
  },
  addClick : function(){
    this.state.items.push("more");
    this.forceUpdate();
  },
  render : function(){
    return <div>
      {
        this.state.items.map(
          function(item)
          {
            return (
              <div><li className="me">
              <div className="image">
                        <div className="imagelocochon">
                            <img className="imgusr myimg" src="../img/source.gif"/>
                            <b>{item}</b>
                            <i id="timesent1" className="timesent" data-time="1506399379857">6 minutes ago</i> 
                        </div>
                    </div>
                    <p id="1t">Mensaje</p>
                </li></div>
              )
          }
        )
      }<br/><div onClick={this.addClick}>ADD</div></div>;
  }
});

var elements = document.querySelectorAll('.item-list__child-item');


export default AppComponent;