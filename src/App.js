import React from 'react';
import logo from './logo.svg';
import './App.css';
import Availability from "./component/Project-availability";
import {Grid} from "@material-ui/core";

function App() {

  return (
      <Grid container>
          <Grid item xs={2}/>
          <Grid item xs={8}>
              <Availability/>
          </Grid>

          <Grid item xs={2}/>
        </Grid>
  );
}

export default App;
