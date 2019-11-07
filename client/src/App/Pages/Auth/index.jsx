import React from "react";
import { Grid, Segment, Divider } from "semantic-ui-react";

import Login from "../../../App/auth/Login";
import Register from "../../../App/auth/Register";

import "./styles.scss";

const AuthenticationPage = () => (
  <div className="main">
    <Segment className="Segment">
      <Grid stackable columns={2}>
        <Grid.Column>
          <Login />
        </Grid.Column>
        <Grid.Column>
          <Register />
        </Grid.Column>
      </Grid>
      <Divider vertical />
    </Segment>
  </div>
);

export default AuthenticationPage;
