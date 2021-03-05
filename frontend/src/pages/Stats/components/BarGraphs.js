import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {InputLabel} from "@material-ui/core";
import flatten from "./Flatten";

export default function BarGraph({data}) {

    return <div>
        <InputLabel htmlFor="">{data.title}</InputLabel>

        <BarChart
            width={600}
            height={300}
            data={flatten(data)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            title="bob"
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="index"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" name="Number of bans"/>
        </BarChart>
    </div>
}