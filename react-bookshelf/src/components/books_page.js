//@flow

import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const books = [];
const bookTypes = [ 'poetry', 'science', 'novels', 'guides', 'science' ];


const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

function validatorBookTitle(value) {
  const response = {
    isValid: true,
    notification: { type: 'success', msg: '', title: '' }
  };

  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  } else if (value.length < 4) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must have 4+ characters';
    response.notification.title = 'Invalid Value';
  }
  return response;
}

function validatorBookAuthors(value) {
  return true;
}

class BooksPage extends React.Component {

  constructor(props) {
    super(props);
    this.source = this.props.source ? this.props.source:'http://localhost/books.json';
    this.state = {books : books};
  }

  componentDidMount = () =>  {
    let self=this;
    this.serverRequest =
// remember server consfig - nginx: add_header Access-Control-Allow-Origin *;
     axios({
       method:'get',
       url:this.source,
       responseType:'text'
     })
        .then(function(result) {
          //debug:          for (let d in result) { alert(d);alert(result[d]); }
          let books_from_json=eval("(" + result.data + ')');
          self.setState({
                      books: books_from_json
                    });
           })
        .catch(function (error) {
            console.log(error);
        });
  }

  componentWillUnmount = () => {
//?    this.serverRequest.abort();
  }

  invalidBookAuthors = (cell : any, row : any) => {
    console.log(`${cell} at row id: ${row.id} fails on editing`);
    return 'invalid-bookauthors-class';
  }

  editingBookAuthors = (cell : any, row : any) => {
    console.log(`${cell} at row id: ${row.id} in current editing`);
    return 'editing-bookauthors-class';
  }

  onAfterSaveCell(value, name){
   axios({
   method:'post',
   url:'https://something.something.com.somewhere/update_something',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'x-access-token':this.state.token
     },
     data:{
         name:value[name]
     }
  }).then((response)=>{
      this .getCustomerData();
  }).catch((error)=>{
     throw('error',error);
  });
 }

  render() {
    return (
      <BootstrapTable data={ this.state.books } cellEdit={ cellEditProp } insertRow={ true }
        afterSaveCell={ this.onAfterSaveCell } >
          <TableHeaderColumn dataField='id' isKey={ true }>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='authors'
                             editable={ { validator: validatorBookAuthors } }
                             editColumnClassName={ this.editingBookAuthors }
                             invalidEditColumnClassName={ this.invalidBookAuthors }>
            Authors
          </TableHeaderColumn>
          <TableHeaderColumn dataField='title'
                             editable={ { type: 'textarea', validator: validatorBookTitle } }
                             editColumnClassName='editing-booktitle-class'
                             invalidEditColumnClassName='invalid-booktitle-class'>
            Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField='description'
                             editable={ { type: 'textarea' } }
                             editColumnClassName='editing-bookdesc-class'
                             invalidEditColumnClassName='invalid-bookdesc-class'>
            Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField='type'
                             editable={ { type: 'select', options: { values: bookTypes } } }>
            Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField='active'
                             editable={ { type: 'checkbox',
                                          options: { values: 'Y:N' } } }>
            Active
          </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}


export default BooksPage;
