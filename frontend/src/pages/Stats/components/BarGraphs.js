import React from 'react';
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import flatten from "./Flatten";

export default function BarGraph({data}) {
    return <div>
        <h2>{data.title}</h2>

        <BarChart
            width={600}
            height={300}
            data={flatten(data)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            title={data.title}
        >
            <XAxis dataKey="index" stroke="white"/>
            <YAxis stroke="white"/>
            <Tooltip color="black"/>
            <Bar dataKey="value" fill="#c79b3b" name="Number of bans" />
        </BarChart>
    </div>
}