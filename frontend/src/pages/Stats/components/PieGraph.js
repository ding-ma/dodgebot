import React from "react";
import {Pie, PieChart, Tooltip} from 'recharts';
import flattenRedTeam from "./FlattenRedTeam";
import {DefaultTooltipContent} from 'recharts/lib/component/DefaultTooltipContent';


const convertNumbToText = (n)=>{
    return n === 0? 'Lose': 'Win'
}

const CustomTooltip = props => {
    if (!props.active) {
        return null
    }

    if (props.payload === undefined){
        return null
    }

    const {index, value} = props.payload[0].payload.payload

    const newPayload = [
        {
            'name': 'Outcome',
            'value': convertNumbToText(index)
        },
        {
            'name': 'Matches',
            'value': value
        }
    ];
    return <DefaultTooltipContent {...props} payload={newPayload}/>;
};

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
                <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
        </div>
    );
}
