import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormGroup, ControlLabel,
         FormControl,
         Button
} from 'react-bootstrap';

import { loadBooks, selectBook, createBook, updateBook } from '../actions/books';;


class BookCommonForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
          id: -1,
          authors: '',
          title: ''
        }
  }

  fillForm()  {
    if (this.state.id !== this.props.id) {
      this.setState({
        id: this.props.id,
        title: this.props.book.title,
        authors: this.props.book.authors});
      return true;
    }
    return false;
  }

  componentWillReceiveProps = (nextProps) => {
    this.fillForm();
  }

/*  componentDidMount = () => {
    this.fillForm();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.fillForm() || nextState.title!==this.state.title ||
    nextState.authors !== this.state.authors;
  }
*/
  handleChangeAuthors = (e) => {
    this.setState({ authors: e.target.value });
  }

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  saveBook = () => {
    if (this.state.id>=0) {
      this.props.updateBook(this.state.id, this.state);  // poprawa
    } else {
      this.props.createBook(this.state);
    }
  }

  render = () => {
    return(
    <form>
    <FormGroup controlId="id" >
      <ControlLabel>#</ControlLabel>
      <FormControl readOnly type="text" value={this.state.id} />
    </FormGroup>
    <FormGroup controlId="title" >
      <ControlLabel>Tytuł</ControlLabel>
      <FormControl type="text" value={this.state.title}
        placeholder="Wpisz tytuł"
        onChange={this.handleChangeTitle}
      />
    </FormGroup>
    <FormGroup controlId="authors" >
       <ControlLabel>Autorzy</ControlLabel>
       <FormControl  type="text" value={this.state.authors}
           placeholder="Wpisz autorów"
           onChange={this.handleChangeAuthors}
         />
    </FormGroup>
    <Button  onClick={ this.saveBook }>Zapisz</Button>
    </form>
   );
  }
}

let BookEdit = (props) => <BookCommonForm id={props.id} book={props.book}/>
let BookCreate = (props) => <BookCommonForm  />



// wstrzykiwanie store
const mapStateToProps = (state) => ({
  store: state.books
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { loadBooks,  selectBook, createBook, updateBook },
  dispatch
);

BookCommonForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCommonForm);


export { BookEdit, BookCreate }
