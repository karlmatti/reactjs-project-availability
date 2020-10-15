import React, {useState} from 'react';
import {Grid} from '@material-ui/core';

const projectStyle = {
    paddingBottom: "5%"
}

const availableVLine = {

    backgroundColor: "#4CAF50",
    color: "solid green",
    border: "1px solid green",
    height: "30px",
    padding: "2px",
    margin: "2px"

}
const partiallyUnavailableVLine = {
    backgroundColor: "#fcbb19",
    color: "solid green",
    border: "1px solid orange",
    height: "30px",
    padding: "2px",
    margin: "2px"
}
const unavailableVLine = {
    backgroundColor: "#f12c2c",
    color: "solid red",
    border: "1px solid orange",
    height: "25px",
    padding: "1px",
    margin: "1px"
}

const availableStatus = {
    color: "#4CAF50"
}

const unavailableStatus = {
    color: "#f12c2c"
}

const headerStyle = {
    color: "#66727F",
    fontWeight: "bold"
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function Project (props) {
    let [statusBars, setStatusBars] = useState(generateStatusBars())
    let [availability, setAvailability] = useState(getAvailability())

    // Returns true or false
    function getAvailability() {
        return props.dataset[props.dataset.length - 1].availability;
    }


    /*
    Example statusBar:
    [{ availability: "partially-unavailable", downTime: 5, timestamp: "00:14:00Z / 14NOV20" },
    { availability: "partially-unavailable", downTime: 3, timestamp: "00:29:00Z / 14NOV20" },
    ...
    ]
     */
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
              alignItems="center"
                style={projectStyle}>
            <Grid container justify="left"
                  alignItems="center">
                <Grid item xs={1}/>
                <Grid item xs={2}>
                    <p style={headerStyle}>{props.name}</p>
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={2}>
                    <p style={availability ? availableStatus : unavailableStatus}>
                        {availability ? "Available" : "Unavailable"}
                    </p>
                </Grid>
                <Grid item xs={1}/>


            </Grid>
            <Grid container justify="left"
                  alignItems="center">
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <StatusList status={statusBars}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>

        </Grid>

    );
}