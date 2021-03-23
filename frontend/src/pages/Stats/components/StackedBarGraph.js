import React from 'react';
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import {DefaultTooltipContent} from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltip = props => {
    if (!props.active) {
        return null
    }

    if (props.payload === undefined){
        return null
    }

    const bans = props.payload[0].value
    const banOrPick = props.payload[0].name
    const newPayload = [
        {
            'name': banOrPick,
            'value': bans
        }
    ];
    return <DefaultTooltipContent {...props} payload={newPayload}/>;
};

const flatten = (json) =>{
    const tmp = []
    json.data.forEach((e) => {
        let {index, values} = e
        tmp.push({"index": index.replace(/\b\w/g, l => l.toUpperCase()), "value": values})
    })
    console.log(tmp)
    return tmp
}

export default function YasBarGraph({data}) {
    return <div>
        <h2>{data.title}</h2>

        <BarChart
            width={600}
            height={300}
            data={flatten(data)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            title={data.title}
        >
            <XAxis
                dataKey="index"
                stroke="white"
            />

            <YAxis stroke="white"/>
            <Bar dataKey="value" fill="#c79b3b" name={data.tooltip} />
            <Tooltip content={<CustomTooltip/>}/>
        </BarChart>
    </div>
}