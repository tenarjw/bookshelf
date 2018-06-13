// @flow

import React, { Component } from 'react';
import {ControlLabel, FormGroup, FormControl,
        HelpBlock} from 'react-bootstrap';

function validate(author : string='', title : string='') {
  return {
    author: author.length === 0,
    title: title.length === 0,
  };
}


class NewBookForm extends Component {

  state : {
    author : string,
    title : string,
    description : string
  };

  constructor(props: {}) {
    super();
    this.state = {
      author: '',
      title: '',
      description: ''
    };
  }

  handleauthorChange = (evt : any) => {
    this.setState({ author: evt.target.value });
  }

  handletitleChange = (evt : any) => {
    this.setState({ title: evt.target.value });
  }

  handledescriptionChange = (evt : any) => {
    this.setState({ description: evt.target.value });
  }

  handleSubmit = (evt : any) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { author, title, description } = this.state;
    alert(`Modify book: ${author} title: ${title}`);
  }

  canBeSubmitted() {
    const errors = validate(this.state.author, this.state.title);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  getValidationAuthor() {
      return true;
  }

  render() {
    const errors = validate(this.state.author, this.state.title);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <form horizontal  onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationAuthor()}
        >
         <ControlLabel>Author</ControlLabel>
         <FormControl type="text"
           value={this.state.author}
           onChange={this.handleauthorChange}
         />
         <FormControl.Feedback />
         <HelpBlock>Validation is based on string length.</HelpBlock>
       </FormGroup>
       <FormGroup>
        <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
            placeholder="Enter title"
            onChange={this.handletitleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Author or title must be defined</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formControlsDescription"
          bsSize="large">
         <ControlLabel>Description</ControlLabel>
         <FormControl componentClass="textarea" placeholder="description" 
            onChange={this.handledescriptionChange}
         />
        </FormGroup>
        <button disabled={isDisabled}>Create New</button>
      </form>
    )
  }
}

export default NewBookForm;
