//@flow

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
         FormGroup, FormControl, Button,
         Grid, Row, Col,
         Navbar, Nav,
         NavItem
       } from 'react-bootstrap';

class Menu extends React.Component{
  render() {
    return (
      <Navbar brand="React-Bootstrap">
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#home">Brand</a>
         </Navbar.Brand>
         <Nav>

<LinkContainer
  to="/"
  activeClassName="selected"
>
           <NavItem>Home</NavItem>
</LinkContainer>
<LinkContainer
  to="/new"
>
           <NavItem>New</NavItem>
</LinkContainer>


         </Nav>
         <Navbar.Toggle>
         </Navbar.Toggle>
       </Navbar.Header>
       <Navbar.Collapse>
         <Navbar.Form pullLeft>
           <FormGroup>
             <FormControl type="text" placeholder="Search" />
           </FormGroup>{' '}
           <Button type="submit">Submit</Button>
         </Navbar.Form>
       </Navbar.Collapse>
     </Navbar>
    )
  }
}

class MainLayout extends React.Component{
  render() {
    let {sidebar, footer, content, company, path, ...other} = this.props;
    if (sidebar) {
/*
<Jumbotron>
    <h1>Bookshelf</h1>
    <p>Education Project by Jerzy Wawro</p>
    <p>
        <Button bsStyle="primary">Learn more</Button>
    </p>
</Jumbotron>
*/
      return (
        <div {...other}>
          <header className="header">
            <Menu />
          </header>
          <Grid>
            <Row className="content">
              <Col xs={10} md={9}>
                { content }
              </Col>
              <Col xs={2} md={3}>
                { sidebar }
              </Col>
            </Row>
            {footer &&
              <Row className="footer">
                <Col xs={12}>
                { footer }
                </Col>
              </Row>
            }
          </Grid>
        </div>
      );
    } else {
      return (
      <div {...other}>
        <header className="header">
          <Menu />
        </header>
        <div className="content">
          { content }
        </div>
        {footer &&
           <div className="footer">
            { footer }
           </div>
        }
      </div>);
    }
  }

}

export default MainLayout;
