import React from 'react';
import logo from './logo.svg';
import './App.css';
import Availability from "./component/Project-availability";
import {Grid} from "@material-ui/core";

function App() {

  return (
      <Grid container>
          <Grid item xs={1}/>
          <Grid item xs={10}>
              <Availability/>
          </Grid>

          <Grid item xs={1}/>
          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
              integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
              crossOrigin="anonymous"
          />
        </Grid>
  );
}

export default App;
