import React from "react";
import Input from "./Input";
import bot from "../../../images/roles/bot.png";
import top from "../../../images/roles/top.png";
import jungle from "../../../images/roles/jungle.png";
import mid from "../../../images/roles/mid.png";
import support from "../../../images/roles/support.png";

type ChampionPanelProps = {
  champions: string[];
  selectBox: Function;
  isFriendlyTeam: Boolean;
  selectedBox: number | null;
};

class ChampionPanel extends React.Component<ChampionPanelProps, {}> {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Input
          isFriendlyTeam={this.props.isFriendlyTeam}
          role="Top"
          onClick={() => this.props.selectBox(0)}
          champion={this.props.champions[0]}
          isSelected={this.props.selectedBox === 0 ? true : false}
          roleImg={top}
        />
        <Input
          isFriendlyTeam={this.props.isFriendlyTeam}
          role="Jungle"
          onClick={() => this.props.selectBox(1)}
          champion={this.props.champions[1]}
          isSelected={this.props.selectedBox === 1 ? true : false}
          roleImg={jungle}
        />
        <Input
          isFriendlyTeam={this.props.isFriendlyTeam}
          role="Mid"
          onClick={() => this.props.selectBox(2)}
          champion={this.props.champions[2]}
          isSelected={this.props.selectedBox === 2 ? true : false}
          roleImg={mid}
        />
        <Input
          isFriendlyTeam={this.props.isFriendlyTeam}
          role="Bot"
          onClick={() => this.props.selectBox(3)}
          champion={this.props.champions[3]}
          isSelected={this.props.selectedBox === 3 ? true : false}
          roleImg={bot}
        />
        <Input
          isFriendlyTeam={this.props.isFriendlyTeam}
          role="Support"
          onClick={() => this.props.selectBox(4)}
          champion={this.props.champions[4]}
          isSelected={this.props.selectedBox === 4 ? true : false}
          roleImg={support}
        />
      </div>
    );
  }
}

export default ChampionPanel;
