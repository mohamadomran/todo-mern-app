import React, { Component } from "react";
import _ from "lodash";

import { Search } from "semantic-ui-react";

import SegmentModule from "../../Components/Segment";

import { connect } from "react-redux";
import { getTodos } from "../../actions/todoActions";

class SearchExampleStandard extends Component {
  state = { isLoading: false, results: [], value: "" };

  componentDidMount() {
    this.props.getTodos();
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.todoContent });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({ isLoading: false, results: [], value: "" });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.todoContent);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.todo.todos, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    console.log("results", results);
    return (
      <div>
        <Search
          open={false}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
        />
        {results.length > 0 ? (
          results.map(todo => (
            <div key={todo._id}>
              <SegmentModule element={todo} />
            </div>
          ))
        ) : (
          <div>No todos yet :)</div>
        )}
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
