import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../../../_actions';


class ListTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.tweets,
      currentPage: 1,
      todosPerPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { todos, currentPage, todosPerPage } = this.state;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={todo._id} id={todo._id}><a href="#">{todo.tweet}</a></li>;
    });


    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>
          {renderTodos}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  const {tweets} = state.users;
  return {
      loggedIn, user, tweets
  };
}

const connectedListTweets = connect(mapStateToProps)(ListTweets);
export { connectedListTweets as ListTweets };
