import React from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import flatten from "./Flatten";
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

const convertPickBan = (name) => {
  return name.includes("bans") ? "Bans" : "Picks";
};

const CustomTooltip = (props) => {
  if (!props.active) {
    return null;
  }

  if (props.payload === undefined) {
    return null;
  }

  const champ = props.label;
  const bans = props.payload[0].value;
  const banOrPick = props.payload[0].name;

  const newPayload = [
    {
      name: "Champion",
      value: champ,
    },
    {
      name: convertPickBan(banOrPick),
      value: bans,
    },
  ];

  return <DefaultTooltipContent payload={newPayload} />;
};

export default function BarGraph({ data }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>{data.title}</h2>
      <BarChart
        width={600}
        height={300}
        data={flatten(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        title={data.title}
      >
        <XAxis
          dataKey="index"
          stroke="white"
          angle={-45}
          textAnchor="end"
          interval={0}
        />

        <YAxis stroke="white" />
        <Bar dataKey="value" fill="#c79b3b" name={data.tooltip} />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </div>
  );
}
