import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
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
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="index" stroke="white"/>
            <YAxis stroke="white"/>
            <Tooltip color="white"/>
            <Bar dataKey="value" fill="#c79b3b" name="Number of bans"  color="white"/>
        </BarChart>
    </div>
}