import React, { Component } from 'react';
import $ from "jquery";

var root = 'https://jsonplaceholder.typicode.com';

class ReservaLista extends Component {
  
  constructor(){
    super();
    this.state = {'lista': [], name: '', email: '', username: ''}
    this.enviaForm = this.enviaForm.bind(this);
    this.setName = this.setName.bind(this);
    console.log('teste');
  }
  
  setName(evento){
    this.setState({name: evento.target.value});
  }

  componentWillMount(){
    
    $.ajax({
        url: root + '/users/',
        dataType: 'json',
        success:function(resposta){
          this.setState({lista:resposta});
        }.bind(this)
    });

  }
  
  enviaForm(evento){
      
      console.log('form');
      
      evento.preventDefault();
      
      $.ajax('http://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        data: $("#form_cadastro").serialize(),
        success: function(resposta){
            resposta['id'] = Math.floor(Math.random() * 10000);
            this.state.lista.push(resposta);
            this.setState({lista:this.state.lista});
        }.bind(this)
        
      });

  }

  render() {
    console.log('render');
    return (<div>
      
      <h1>Listagem de Reservas ({this.state.lista.length})</h1>
      
      <div>
        <form id="form_cadastro" onSubmit={this.enviaForm}>
          
          <div className="form-group">
            <label>Nome</label>
            <input name="name" id="name" className="form-control"/>
          </div>

          <div className="form-group">
            <label>e-mail</label>
            <input name="email" id="email" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Usuário</label>
            <input name="username"  id="username" className="form-control"/>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success">Enviar</button>
          </div>

        </form>
        <hr/>
      </div>

      <table className="table">
                  <thead> 
                    <tr> 
                    <th></th> 
                    <th>Nome</th> 
                    <th>e-mail</th> 
                    <th>Login</th> 
                    </tr> 
                  </thead> 
                  <tbody> 
                 {this.state.lista.map(function(cliente){
                  
                  return(
                    <tr key={cliente.id}> 
                      <th>{cliente.id}</th> 
                      <td>{cliente.name}</td> 
                      <td>{cliente.email}</td> 
                      <td>{cliente.username}</td> 
                    </tr>);

                  })        
      }
      </tbody> 
      </table></div>
    );
  }
}

export default ReservaLista;