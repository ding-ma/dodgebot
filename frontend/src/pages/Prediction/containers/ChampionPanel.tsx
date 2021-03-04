import React from "react";
import styled from "styled-components";
import Input from './Input'

type ChampionPanelProps = {
    champions: string[],
    selectBox: Function,
    isLeftSide: Boolean
}

class ChampionPanel extends React.Component<ChampionPanelProps, {}> {
    render() {
        return (
            <div>
                <Input isLeftSide={this.props.isLeftSide} onClick={() => this.props.selectBox(0)} champion={this.props.champions[0]} />
                <Input isLeftSide={this.props.isLeftSide} onClick={() => this.props.selectBox(1)} champion={this.props.champions[1]} />
                <Input isLeftSide={this.props.isLeftSide} onClick={() => this.props.selectBox(2)} champion={this.props.champions[2]} />
                <Input isLeftSide={this.props.isLeftSide} onClick={() => this.props.selectBox(3)} champion={this.props.champions[3]} />
                <Input isLeftSide={this.props.isLeftSide} onClick={() => this.props.selectBox(4)} champion={this.props.champions[4]} />
            </div>
        );
    };
}

export default ChampionPanel;