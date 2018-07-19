import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { loadBooks, selectBook, deleteBook, changeEdState }
       from '../actions/books';
import { BookEdit, BookCreate } from './BookForm';

class BookSelected extends Component {
  constructor(props, context) {
    super(props, context);
    this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
//    this.props.selectBook(this.props.id);
//      this.setState({id:this.props.id}); // odswiezenie
    this.setState();// odswiezenie
  }

  swButtonEdit = () => {
    let st = this.props.store.edState;
    this.props.changeEdState(
      {
        ...st,
        newActive : false,
        edActive : !st.edActive
      }
    )
  }

  swButtonNew = () => {
    let st = this.props.store.edState;
    this.props.changeEdState(
      {
        ...st,
        edActive : false,
        newActive : !st.newActive
      }
    )
  }

  deleteBook = () => {
    if (this.props.store.selected)
      this.props.deleteBook(this.props.store.selected.id);
  }

  render = () => {
    let navBar = [];
    if (this.props.store.edState.newAvailable)
      navBar.push(<button onClick={this.swButtonNew}>Dodawanie</button>);
    if (this.props.store.selected) {
      if (this.props.store.edState.edAvailable)
        navBar.push(<button onClick={this.swButtonEdit}>Edycja</button>);
      if (this.props.store.edState.delAvailable)
        navBar.push(<button onClick={this.deleteBook}>Usuń</button>);
    }
    let form = null;
    if (this.props.store.edState.edActive)
      form=<BookEdit book={this.props.store.selected} id={this.props.store.id} />;
    if (this.props.store.edState.newActive)
      form=<BookCreate />;
    console.log(navBar);
    console.log(form);
    console.log(this.props.store.edState);
    return ( <div>
        <div>{navBar}</div>
        <div> {this.props.store.selected &&
                this.props.store.selected.authors}
              {this.props.store.selected &&
                '"'+this.props.store.selected.title+'"'}
        </div>
        {form}
      </div>)
  }
}

class BookList extends Component {

  wybrany = (id) => {
     this.props.selectBook(id);
  }

  componentDidMount = () => {
    this.props.loadBooks();
  }

  render() {
    console.log(this.props);
      if (!this.props.store.books) {
        return <div>wczytuję ....</div>;
      }
      let lista = [];
      for (let book of this.props.store.books) {
        lista.push(<tr  onClick={ () => { this.wybrany(book.id)} } key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.authors}</td>
          <td></td>
          </tr>);
      }
      return (
      <div>
        <div><BookSelected  id={this.props.store.id}  /></div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {lista}
          </tbody>
        </Table>
      </div>
      );
  }
}


// wstrzykiwanie store
const mapStateToProps = state => ({
  store: state.books
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { loadBooks, selectBook, deleteBook, changeEdState },
  dispatch
);

BookSelected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSelected);


BookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);


export default BookList;
