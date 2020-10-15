import React, {useState} from 'react';
import {Grid, Tooltip, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import styles from './project.module.css';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);


const availableStatus = {
    color: "#4CAF50"

}

const unavailableStatus = {
    color: "#f12c2c"
}


export default function Project(props) {
    let [statusBars, setStatusBars] = useState(generateStatusBars())
    let [availability, setAvailability] = useState(getAvailability())
    let [availabilityAmount, setAvailabilityAmount] = useState(getAvailabilityAmount())

    function getAvailabilityAmount() {
        let downTimeCounter = 0;
        statusBars.forEach(function (item) {
            downTimeCounter += item.downTime;
        })
        return (100 - (downTimeCounter * 100 / 1440)).toFixed(2); // Hardcoded 1440 which is minutes in 24h
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
    function generateStatusBars() {
        let counter = 14;
        let statusBar = {availability: "available", downTime: 0}
        let tempStatusBars = [];
        props.dataset.forEach(function (item, index) {
            if (counter !== 0) {

                if (!item.availability) {
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

    function StatusList(props) {
        const listItems = props.status.map((status, index) => {

            if (status.availability === "available") {
                return (<HtmlTooltip key={index}
                                     title={
                                         <React.Fragment key={index}>
                                             <Typography key={index} color="inherit">{status.timestamp}</Typography>
                                         </React.Fragment>
                                     }
                    >
                        <button key={index} className={styles.availableVLine}/>
                    </HtmlTooltip>
                )
            } else if (status.availability === "partially-unavailable") {
                return (
                    <HtmlTooltip key={index}
                                 title={
                                     <React.Fragment key={index}>
                                         <Typography key={index} color="inherit">{status.timestamp}</Typography>
                                         <div style={{
                                             display: 'flex',
                                             alignItems: 'center'
                                         }}>
                                             <WarningIcon key={index} fontSize="small" style={{color: "#f6c631"}}/>
                                             <em key={index}>&nbsp;Partial outage:&nbsp;</em> <b
                                             key={index}> {status.downTime + ' min'} </b>
                                         </div>
                                     </React.Fragment>
                                 }
                    >
                        <button key={index} className={styles.partiallyUnavailableVLine}/>
                    </HtmlTooltip>)
            } else if (status.availability === "unavailable") {
                return (
                    <HtmlTooltip key={index}
                                 title={
                                     <React.Fragment key={index}>
                                         <Typography key={index} color="inherit">{status.timestamp}</Typography>
                                         <div style={{
                                             display: 'flex',
                                             alignItems: 'center'
                                         }}>
                                             <WarningIcon key={index} fontSize="small" style={{color: "#f6c631"}}/>
                                             <em key={index}>&nbsp;Outage:&nbsp;</em> <b
                                             key={index}> {status.downTime + ' min'} </b>
                                         </div>
                                     </React.Fragment>
                                 }
                    >
                        <button key={index} className={styles.unavailableVLine}/>
                    </HtmlTooltip>

                )
            }
        });
        return (
            <div className={styles.statusBars}>
                {listItems}
            </div>
        );
    }

    return (
        <div className={styles.project}>
            <div style={{margin: "25px"}}>
                <Grid container justify="space-between">

                    <Grid item xs={2}>
                        <p className={styles.projectName}>{props.name}</p>
                    </Grid>

                    <Grid item xs={2} style={{textAlign: "right",}}>
                        <p style={availability ? availableStatus : unavailableStatus}>
                            {availability ? "Available" : "Unavailable"}
                        </p>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <StatusList status={statusBars}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1}>
                        <p className={styles.informativeText}>24 hours ago</p>
                    </Grid>


                    <Grid item xs={10}>
                        <p className={styles.hrSect}>

                            {availabilityAmount} % availability


                        </p>


                    </Grid>

                    <Grid item xs={1} style={{textAlign: "right"}}>
                        <p className={styles.informativeText}>Today</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}