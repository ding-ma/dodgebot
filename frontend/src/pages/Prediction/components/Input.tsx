import React from "react";
// import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = [
    {id: 1, case: 266, value: 'Aatrox',},
    {id: 2, case: 412, value: 'Thresh',},
    {id: 3, case: 23, value: 'Tryndamere',},
    {id: 4, case: 79, value: 'Gragas',},
    {id: 5, case: 69, value: 'Cassiopeia',},
    {id: 6, case: 136, value: 'Aurelion Sol',},
    {id: 7, case: 13, value: 'Ryze',},
    {id: 8, case: 78, value: 'Poppy',},
    {id: 9, case: 14, value: 'Sion',},
    {id: 10, case: 1, value: 'Annie',},
    {id: 11, case: 202, value: 'Jhin',},
    {id: 12, case: 43, value: 'Karma',},
    {id: 13, case: 111, value: 'Nautilus',},
    {id: 14, case: 240, value: 'Kled',},
    {id: 15, case: 99, value: 'Lux',},
    {id: 16, case: 103, value: 'Ahri',},
    {id: 17, case: 2, value: 'Olaf',},
    {id: 18, case: 112, value: 'Viktor',},
    {id: 19, case: 34, value: 'Anivia',},
    {id: 20, case: 27, value: 'Singed',},
    {id: 21, case: 86, value: 'Garen',},
    {id: 22, case: 127, value: 'Lissandra',},
    {id: 23, case: 57, value: 'Maokai',},
    {id: 24, case: 25, value: 'Morgana',},
    {id: 26, case: 105, value: 'Fizz',},
    {id: 27, case: 74, value: 'Heimerdinger',},
    {id: 28, case: 138, value: 'Zed',},
    {id: 29, case: 68, value: 'Rumble',},
    {id: 30, case: 82, value: 'Mordekaiser',},
    {id: 31, case: 37, value: 'Sona',},
    {id: 32, case: 96, value: 'Kog Maw',},
    {id: 33, case: 55, value: 'Kled',},
    {id: 34, case: 117, value: 'Lulu',},
    {id: 35, case: 22, value: 'Ashe',},
    {id: 36, case: 30, value: 'Karthus',},
    {id: 37, case: 12, value: 'Alistar',},
    {id: 38, case: 55, value: 'Aatrox',},
    {id: 39, case: 122, value: 'Darius',},
    {id: 40, case: 67, value: 'Vayne',},
    {id: 41, case: 110, value: 'Varus',},
    {id: 42, case: 77, value: 'Udyr',},
    {id: 43, case: 89, value: 'Leona',},
    {id: 44, case: 126, value: 'Jayce',},
    {id: 45, case: 134, value: 'Syndra',},
    {id: 46, case: 80, value: 'Pantheon',},
    {id: 47, case: 92, value: 'Riven',},
    {id: 48, case: 121, value: 'Kha Zix',},
    {id: 49, case: 42, value: 'Corki',},
    {id: 50, case: 268, value: 'Azir',},
    {id: 51, case: 51, value: 'Caitlyn',},
    {id: 52, case: 76, value: 'Nidalee',},
    {id: 53, case: 85, value: 'Kennen',},
    {id: 54, case: 3, value: 'Galio',},
    {id: 55, case: 45, value: 'Veigar',},
    {id: 56, case: 432, value: 'Bard',},
    {id: 57, case: 150, value: 'Gnar',},
    {id: 58, case: 90, value: 'Malzahar',},
    {id: 59, case: 104, value: 'Graves',},
    {id: 60, case: 254, value: 'Vi',},
    {id: 61, case: 10, value: 'Kayle',},
    {id: 62, case: 39, value: 'Irelia',},
    {id: 63, case: 64, value: 'Lee Sin',},
    {id: 64, case: 420, value: 'Illaoi',},
    {id: 65, case: 60, value: 'Elise',},
    {id: 66, case: 106, value: 'Volibear',},
    {id: 67, case: 20, value: 'Nunu',},
    {id: 68, case: 4, value: 'Twisted Fate',},
    {id: 69, case: 24, value: 'Jax',},
    {id: 70, case: 102, value: 'Shyvana',},
    {id: 71, case: 429, value: 'Kalista',},
    {id: 72, case: 36, value: 'Dr. Mundo',},
    {id: 73, case: 427, value: 'Ivern',},
    {id: 74, case: 131, value: 'Diana',},
    {id: 75, case: 223, value: 'Tahm Kench',},
    {id: 76, case: 63, value: 'Brand',},
    {id: 77, case: 113, value: 'Sejuani',},
    {id: 78, case: 8, value: 'Vladimir',},
    {id: 79, case: 154, value: 'Zac',},
    {id: 80, case: 421, value: 'Rek Sai',},
    {id: 81, case: 133, value: 'Quinn',},
    {id: 82, case: 84, value: 'Akali',},
    {id: 83, case: 163, value: 'Taliyah',},
    {id: 84, case: 18, value: 'Tristana',},
    {id: 85, case: 120, value: 'Sivir',},
    {id: 86, case: 15, value: 'Lucian',},
    {id: 87, case: 236, value: 'Lucian',},
    {id: 88, case: 107, value: 'Rengar',},
    {id: 89, case: 19, value: 'Warwick',},
    {id: 90, case: 72, value: 'Skarner',},
    {id: 91, case: 54, value: 'Malphite',},
    {id: 92, case: 157, value: 'Yasuo',},
    {id: 93, case: 101, value: 'Xerath',},
    {id: 94, case: 17, value: 'Teemo',},
    {id: 95, case: 75, value: 'Nasus',},
    {id: 96, case: 58, value: 'Renekton',},
    {id: 97, case: 119, value: 'Draven',},
    {id: 98, case: 35, value: 'Shaco',},
    {id: 99, case: 50, value: 'Swain',},
    {id: 100, case: 91, value: 'Talon',},
    {id: 101, case: 40, value: 'Janna',},
    {id: 102, case: 115, value: 'Ziggs',},
    {id: 103, case: 245, value: 'Ekko',},
    {id: 104, case: 61, value: 'Orianna',},
    {id: 105, case: 114, value: 'Fiora',},
    {id: 106, case: 9, value: 'Fiddlesticks',},
    {id: 107, case: 31, value: 'Cho Gath',},
    {id: 108, case: 33, value: 'Rammus',},
    {id: 109, case: 7, value: 'LeBlanc',},
    {id: 110, case: 16, value: 'Soraka',},
    {id: 111, case: 26, value: 'Zilean',},
    {id: 112, case: 56, value: 'Nocturne',},
    {id: 113, case: 222, value: 'Jinx',},
    {id: 114, case: 83, value: 'Yorick',},
    {id: 115, case: 6, value: 'Urgot',},
    {id: 116, case: 203, value: 'Kindred',},
    {id: 117, case: 21, value: 'Miss Fortune',},
    {id: 118, case: 62, value: 'Wukong',},
    {id: 119, case: 53, value: 'Blitzcrank',},
    {id: 120, case: 98, value: 'Shen',},
    {id: 121, case: 201, value: 'Braum',},
    {id: 122, case: 5, value: 'Xin Zhao',},
    {id: 123, case: 29, value: 'Twitch',},
    {id: 124, case: 11, value: 'Master Yi',},
    {id: 125, case: 44, value: 'Taric',},
    {id: 126, case: 32, value: 'Amumu',},
    {id: 127, case: 41, value: 'Gangplank',},
    {id: 128, case: 48, value: 'Trundle',},
    {id: 129, case: 38, value: 'Kassadin',},
    {id: 130, case: 161, value: 'Vel Koz',},
    {id: 131, case: 143, value: 'Zyra',},
    {id: 132, case: 267, value: 'Nami',},
    {id: 133, case: 59, value: 'Jarvan IV',},
    {id: 134, case: 81, value: 'Ezreal',},
];

type InputProps = {
    champion: string,
    onClick: Function,
    isFriendlyTeam: Boolean,
    role: String
}

class Input extends React.Component<InputProps, {}> {
    render() {
        const imgSrc = this.props.champion === "" ? `../RoleIcons/` + this.props.role + `.png` : `../ChampionIcons/` + this.props.champion + `Square.png`;
        const img = <img alt="" onClick={() => this.props.onClick()} src={imgSrc} style={{
            height: "10vh",
            width: "10vh",
            border: "1px solid #5a4820",
            borderRadius: "2px",
            cursor: "pointer"
        }}/>;
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "2%"}}>
                {/* Display img on left of select button if right panel */}
                {this.props.isFriendlyTeam ? img : null}
                
                {/* Select button */}
                <div style={{
                    height: "55%",
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #5a4820",
                    margin: "4%",
                    borderRadius: "2px",
                    cursor: "pointer"
                }} onClick={() => this.props.onClick()}>
                    {/* Champ name */}
                    <p style={{color: "#87742a"}}>
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