import React from "react";
import moment from "moment";

import { Segment, Header } from "semantic-ui-react";

import "./styles.scss";

const SegmentModule = props => {
  return (
    <div className="Segment-Component">
      <Segment key={props.element._id} textAlign="left" color="red">
        {props.element.todoContent}
        <Header as="h5" textAlign="right">
          <i>
            <sup>Created {moment(props.element.date).calendar()}</sup>
          </i>
        </Header>
      </Segment>
    </div>
  );
};

export default SegmentModule;
