import React from "react";
import './Input.css'


type InputProps = {
    champion: string,
    onClick: Function,
    isFriendlyTeam: Boolean,
    role: String,
    isSelected: boolean,
    roleImg: string
}

class Input extends React.Component<InputProps, {}> {
    render() {
        const imgSrc = this.props.champion === "" ? this.props.roleImg : `../ChampionIcons/` + this.props.champion + `Square.png`;
        const img = <img alt={this.props.champion} src={imgSrc} style={{
            height: "10vh",
            width: "10vh",
            border: "1px solid #5a4820",
            borderRadius: "2px",
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.2)"
        }} />;
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2%" }}>
                {/* Display img on left of select button if right panel */}
                {this.props.isFriendlyTeam ? img : null}

                {/* Select button */}
                <div className="selectBtn" style ={{background: (this.props.isSelected ? "rgba(0,0,0,0.5)" : "")}}
                    onClick={() => this.props.onClick()}>
                    {/* Champ name */}
                    <p style={{ color: "#87742a" }}>
                        {this.props.champion === "" ? (this.props.isFriendlyTeam ? "Friendly " : "Enemy ") + this.props.role : this.props.champion}
                    </p>
                </div>

                {/* Display img on right of select button if left panel */}
                {!this.props.isFriendlyTeam ? img : null}

            </div>
        );
    };
}

export default Input;