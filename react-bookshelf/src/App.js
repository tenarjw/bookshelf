//@flow

import React, { Component } from 'react';
import { ExecutionEnvironment } from 'exenv';
import './App.css';
import {
  BrowserRouter as Router,
  withRouter,
  Route, Link
} from 'react-router-dom';

import BooksPage from './components/books_page';
import NewBookForm from './components/new_book_form';
import BookInfoForm  from './components/book_info_form';

import Sidebar from './containers/sidebar';
import Footer from './containers/footer';
import MainLayout from './containers/main_layout';


const MyRoute = ({component : Component, ...rest}) => {
// w parametrach następuje rozpakowanie props
// component : Component to rozpakowanie klucza i wartości (typ komponentu)
// https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md
return (
  <Route {...rest} render={
    props => {
      let footer = <Footer />;
      let sidebar = <Sidebar />;
      let content = <Component />;
      return (
      <MainLayout
            sidebar = { sidebar }
            footer = { footer }
            content = { content }
            className = "page"
     >
     </MainLayout>
   );
  }
 }/>
)
}

class App extends Component {
  render() {
    return (
        <Router>
          <div>
          <MyRoute exact path="/" component={BooksPage} />
          <MyRoute exact path="/new" component={NewBookForm} />
          <MyRoute path="/book/:id" component={BookInfoForm} />
          </div>
        </Router>
      )
   }

   componentDidMount() {
     if (ExecutionEnvironment && (ExecutionEnvironment.canUseDOM)) {
       document.title = this.props.title;
     }
   }

}

export default App;
