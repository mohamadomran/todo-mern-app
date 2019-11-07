import _ from "lodash";

import React, { Component } from "react";
import { Search, Segment, Button, Header } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todoActions";

class SearchExampleStandard extends Component {
  state = { isLoading: false, results: [], value: "" };

  componentDidMount() {
    this.props.getTodos();
  }

  handleResultSelect = (e, { result }) => {
    console.log("result", result);
    this.setState({ value: result.todoContent });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({ isLoading: false, results: [], value: "" });

      console.log("this.state.value", this.state.value);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.todoContent);

      console.log(this.props.todo.todos);
      this.setState({
        isLoading: false,
        results: _.filter(this.props.todo.todos, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props}
        />
        {this.state.results.map(({ _id, todoContent, date }) => (
          <Segment key={_id}>
            <Button
              floated="right"
              circular
              size="mini"
              color="red"
              icon="delete"
              onClick={this.onDeleteClick.bind(this, _id)}
            />

            {todoContent}
            <Header as="h5" textAlign="right">
              <i>
                <sup>Created at: {moment(date).calendar()}</sup>
              </i>
            </Header>
          </Segment>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTodos }
)(SearchExampleStandard);
