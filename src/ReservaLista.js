import React, { Component } from 'react';

class ReservaLista extends Component {
  
  constructor(){
    super();
    
    this.state = {'lista': [{id:1, nome: 'Francisco', email: 'chicosilva1@gmail.com'}, {id:2, nome: 'Francisco', email: 'chicosilva1@gmail.com'}]}
  }
  
  render() {
    return (

      <table className="table">
                  <thead> 
                    <tr> 
                    <th></th> <th>First Name</th> 
                    <th>Last Name</th> <th>Username</th> 
                    </tr> 
                  </thead> 
                  <tbody> 
                 {
            this.state.lista.map(function(cliente){
                  return(
                    <tr key={cliente.id}> 
                      <th scope="row">{cliente.id}</th> 
                      <td>Mark</td> 
                      <td>Otto</td> 
                      <td>@mdo</td> 
                    </tr>);

        })        
      }
      </tbody> 
      </table>
    );
  }
}

export default ReservaLista;