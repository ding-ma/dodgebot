import React from "react";
// import styled from "styled-components";
import Input from './Input'

type ChampionPanelProps = {
    champions: string[],
    selectBox: Function,
    isFriendlyTeam: Boolean
}

class ChampionPanel extends React.Component<ChampionPanelProps, {}> {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%"}}>
                <Input isFriendlyTeam={this.props.isFriendlyTeam} role="Top Laner" onClick={() => this.props.selectBox(0)}
                       champion={this.props.champions[0]}/>
                <Input isFriendlyTeam={this.props.isFriendlyTeam} role="Jungler" onClick={() => this.props.selectBox(1)}
                       champion={this.props.champions[1]}/>
                <Input isFriendlyTeam={this.props.isFriendlyTeam} role="Mid Laner" onClick={() => this.props.selectBox(2)}
                       champion={this.props.champions[2]}/>
                <Input isFriendlyTeam={this.props.isFriendlyTeam} role="ADC" onClick={() => this.props.selectBox(3)}
                       champion={this.props.champions[3]}/>
                <Input isFriendlyTeam={this.props.isFriendlyTeam} role="Support" onClick={() => this.props.selectBox(4)}
                       champion={this.props.champions[4]}/>
            </div>
        );
    };
}

export default ChampionPanel;