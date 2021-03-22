import React from "react";
import { Pie, PieChart, Tooltip} from 'recharts';
import flattenRedTeam from "./FlattenRedTeam";

export default function PieGraph({data}) {
    return (
        <div>
            <h2>{data.title}</h2>

            <PieChart width={730} height={300}>
                <Pie data={flattenRedTeam(data)}
                     dataKey="value"
                     nameKey="name"
                     cx="50%"
                     cy="50%"
                     outerRadius={120}
                     fill="#c79b3b"
                     name={data.tooltip}
                />
                <Tooltip color="black"/>
            </PieChart>
        </div>
    );
}
