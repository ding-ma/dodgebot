import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {KeyToChamp} from "../../../constants/KeyToChampion"
import {InputLabel} from "@material-ui/core";

const flatten = (json) => {
    const tmp = []
    json.data.forEach((e) => {
        let {index, values} = e
        tmp.push({"index": KeyToChamp[index], "value": values})
    })
    return tmp
}


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
            <Legend/>
            <Bar dataKey="value" fill="#8884d8" name="Number of bans"/>
        </BarChart>
    </div>
}