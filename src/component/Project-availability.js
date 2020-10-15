import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import Project from "./Project";


/*
Generating 24h dataset with 1 minute precision.
Example:
[
    { availability: true, timestamp: "00:00:00Z / 14NOV20" }
    { availability: true, timestamp: "00:01:00Z / 14NOV20" }
    ...
    { availability: false, timestamp: "23:59:00Z / 14NOV20" }
]
 */
function generate_series(step) {
    const dt = new Date(2020, 10, 14);
    const series = [];

    while (dt.getDate() === 14) {
        let t = dateFormat(dt, "HH:MM:ss'Z' / ddmmmyy").toUpperCase();
        let availability = true;
        if (Math.floor(Math.random() * 10) > 8) { // Change the chance of generating false values here
            availability = false;
        }
        let obj = {availability: availability, timestamp: t};

        series.push(obj);
        dt.setMinutes(dt.getMinutes() + step);
    }
    return series;
}

export default function Availability() {

    return (
        <React.Fragment>

            <Project dataset={generate_series(1)} name={"Project A"}/>
            <Project dataset={generate_series(1)} name={"Project B"}/>
            <Project dataset={generate_series(1)} name={"Project C"}/>
            <Project dataset={generate_series(1)} name={"Project D"}/>
        </React.Fragment>
    );
}