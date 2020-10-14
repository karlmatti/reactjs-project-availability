import React, {useState} from 'react';
import {Grid} from '@material-ui/core';


const availableVLine = {

    backgroundColor: "#4CAF50",
    color: "solid green",
    border: "1px solid green",
    height: "20px",
    padding: "1px",
    margin: "1px"

}
const partiallyUnavailableVLine = {
    backgroundColor: "#fcbb19",
    color: "solid green",
    border: "1px solid orange",
    height: "20px",
    padding: "1px",
    margin: "1px"
}
const unavailableVLine = {
    backgroundColor: "#f12c2c",
    color: "solid red",
    border: "1px solid orange",
    height: "20px",
    padding: "1px",
    margin: "1px"
}

const headerStyle = {
    color: "#66727F",
    fontWeight: "bold"
}

export default function Project (props) {
    let [statusBars, setStatusBars] = useState(generateStatusBars())
    console.log(statusBars);
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
                statusBar.timestamp = item.timestamp;
                tempStatusBars.push(statusBar);
                statusBar = {availability: "available", downTime: 0};

                counter = 14;
            }

        });


        return tempStatusBars;
    }


    function StatusList(props){
        const listItems = props.status.map((status) => {
            if (status.availability === "available") {
                return(<button key={status.timestamp} style={availableVLine}/>)
            } else if (status.availability === "partially-unavailable") {
                return(<button key={status.timestamp} style={partiallyUnavailableVLine}/>)
            } else if (status.availability === "unavailable") {
                return(<button key={status.timestamp} style={unavailableVLine}/>)
            }
        });
        return (
            <Grid>
                {listItems}
            </Grid>


        );
    }

    return (
        <Grid container justify="center"
              alignItems="center">
            <Grid container justify="left"
                  alignItems="center">
                <Grid item>
                    <p style={headerStyle}>Project</p>
                </Grid>
            </Grid>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <StatusList status={statusBars}/>
                </Grid>
            </Grid>

        </Grid>

    );
}