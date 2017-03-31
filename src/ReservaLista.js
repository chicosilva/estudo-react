import React, { Component } from 'react';
import $ from "jquery";

var root = 'https://jsonplaceholder.typicode.com';

class ReservaLista extends Component {
  
  constructor(){
    super();
    this.state = {
      'lista': [], 
      name: '', 
      email: '', 
      username: '',
      message: '',
      type_message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
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
  
  handleSubmit(event){
      
      event.preventDefault();
      
      $.ajax('http://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        data: $("#form_cadastro").serialize(),
        success: function(resposta){
            
            resposta['id'] = Math.floor(Math.random() * 10000);
            this.state.lista.push(resposta);
            this.setState({
                lista:this.state.lista, 
                name: '', 
                email: '', 
                username: '',
                message: 'Dados enviado com sucesso!',
                type_message: 'success'
              }
            );

        }.bind(this)
        
      });

  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  listagem(){

    return this.state.lista.map(function(cliente){
                  
                  return(
                    <tr key={cliente.id}> 
                      <th>{cliente.id}</th> 
                      <td>{cliente.name}</td> 
                      <td>{cliente.email}</td> 
                      <td>{cliente.username}</td> 
                    </tr>);

                  });
  }

  render() {
      
    if(this.state.type_message){
      var classStringName = 'alert alert-' + this.state.type_message;
      var status = <div className={classStringName}>{this.state.message}</div>;
    }  

    return (<div>
      
      <h1>Listagem de Reservas ({this.state.lista.length})</h1>
      
      {status}

      <div>
        <form id="form_cadastro" onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <label>Nome</label>
            <input name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
          </div>
          
          <div className="form-group">
            <label>e-mail</label>
            <input name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Usuário</label>
            <input name="username" id="username" className="form-control" value={this.state.username} onChange={this.handleChange}/>
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
                 {this.listagem()}
      </tbody> 
      </table></div>
    );
  }
}

export default ReservaLista;