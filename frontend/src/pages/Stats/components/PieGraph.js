import React from "react";
import {Pie, PieChart, Tooltip} from 'recharts';
import flattenRedTeam from "./FlattenRedTeam";
import {InputLabel} from "@material-ui/core";

export default function PieGraph({data}) {
    return (
        <div >
            <InputLabel htmlFor="">{data.title}</InputLabel>

            <PieChart width={730} height={300}>
                <Pie data={flattenRedTeam(data)} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                </Pie>
                <Tooltip/>
            </PieChart>
        </div>
    );
}
