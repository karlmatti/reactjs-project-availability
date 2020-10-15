import React, {useState} from 'react';
import {Grid, Tooltip, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

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
    let [availabilityAmount, setAvailabilityAmount] = useState(getAvailabilityAmount())

    function getAvailabilityAmount(){
        let downTimeCounter = 0;
        statusBars.forEach(function(item){
            downTimeCounter += item.downTime;
        })
        return (downTimeCounter * 100 / 1440).toFixed(2); // Hardcoded 1440 which is minutes in 24h
    }

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
                return(<HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit">{status.timestamp}</Typography>
                        </React.Fragment>
                    }
                >
                        <button key={status.timestamp} style={availableVLine}/>
                </HtmlTooltip>
                    )
            } else if (status.availability === "partially-unavailable") {
                return(
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">{status.timestamp}</Typography>
                                <WarningIcon fontSize="small" style={{ color: "#f6c631" }}/>
                                <em>{" Partial outage"}</em> <b>{status.downTime + ' min'} </b>
                            </React.Fragment>
                        }
                    >
                        <button key={status.timestamp} style={partiallyUnavailableVLine}/>
                    </HtmlTooltip>)
            } else if (status.availability === "unavailable") {
                return(
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">{status.timestamp}</Typography>
                                <WarningIcon fontSize="small" style={{ color: "#f6c631" }}/>
                                <em>{" Outage"}</em> <b>{status.downTime + ' min'} </b>
                            </React.Fragment>
                        }
                    >
                        <button key={status.timestamp} style={unavailableVLine}/>
                    </HtmlTooltip>

                    )
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
            <Grid container justify="left"
                  alignItems="center">
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    {availabilityAmount} % availability
                </Grid>
                <Grid item xs={1}/>
            </Grid>

        </Grid>

    );
}