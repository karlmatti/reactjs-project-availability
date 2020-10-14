import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

const availableVLine = {
    borderLeft: "6px solid green",
    height: "10px",
    padding: "2px"
}
const partiallyUnavailableVLine = {
    borderLeft: "6px solid orange",
    height: "10px",
    padding: "2px"
}
const unavailableVLine = {
    borderLeft: "6px solid red",
    height: "10px",
    padding: "2px"
}

export default function Project (props) {
    let [statusBars, setStatusBars] = useState(generateStatusBars())

    function generateStatusBars(){
        let counter = 14;
        let statusBar = {availability: "available", downTime: 0}
        let tempStatusBars = [];
        props.dataset.forEach(function (item, index) {
            if (counter !== 0) {
                if(!item.availability){
                    statusBar.availability = "partially-unavailable";
                    statusBar.downTime += 1
                }

                counter--;
            } else {
                if (!item.availability) {
                    statusBar.availability = "partially-unavailable";
                    statusBar.downTime += 1

                    if (statusBar.downTime === 15) {
                        statusBar.availability = "unavailable";
                    }
                }

                tempStatusBars.push(statusBar);
                statusBar = {availability: "available", downTime: 0};

                counter = 14;
            }

        });


        return tempStatusBars;
    }




    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <span style={availableVLine}/>
                <span style={partiallyUnavailableVLine}/>
                <span style={unavailableVLine}/>

            </Grid>

        </Grid>


    );
}