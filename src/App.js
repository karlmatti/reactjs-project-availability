import React from 'react';
import logo from './logo.svg';
import './App.css';
import Availability from "./component/Project-availability";
import {Grid} from "@material-ui/core";

function App() {

  return (
      <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}
                > <Availability/> </Grid>
          <Grid item xs={1}/>
      </Grid>
  );
}

export default App;
