import React from "react";

type ChampionScrollState = {
    listOfChampions: string[],
    filteredListOfChamps: string[]
    searchValue: string,
}

type ChampionScrollProps = {
    selectChamp: Function,
    unavailableChamps: String[],
}

class ChampionScroll extends React.Component<ChampionScrollProps, ChampionScrollState> {
    constructor(props: any) {
        super(props)
        this.state = {
            listOfChampions: [],
            filteredListOfChamps: [],
            searchValue: ""
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)

    }

    componentWillMount() {
        // Gets all champ image names
        var listOfImages = (require.context('../../../../public/ChampionIcons/', false, /\.(png|jpe?g|svg)$/)).keys();
        listOfImages = listOfImages.map((image: string) => image.replace("./", ""))
        // Sets initial lists
        this.setState({
            listOfChampions: listOfImages.map((image: string) => image.replace("Square.png", "")),
            filteredListOfChamps: listOfImages.map((image: string) => image.replace("Square.png", "")),
        })
    }

    handleSearchChange(event: any) {
        // Filter champs
        var temp = this.state.listOfChampions.filter((a) => a.toLowerCase().includes((event.target.value as string).toLowerCase()))
        this.setState({
            searchValue: event.target.value,
            filteredListOfChamps: temp
        })
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Search bar */}
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", height: "5vh" }}>
                    <input style={{
                        color: "gray",
                        width: "15%",
                        height: "3vh",
                        textAlign: "center",
                        border: "1px solid #3e7f75",
                        background: "#0a1b23",
                        borderRadius: "10px"
                    }} placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} />
                </div>

                {/* Scrollable champ select */}
                <div style={{
                    height: "70vh",
                    width: "84vh",
                    display: "flex",
                    flexWrap: "wrap",
                    overflowY: "auto",
                    alignContent: "flex-start",
                }}>
                    {this.state.filteredListOfChamps.map(
                        (champName: string, index: any) => {
                            const imgFilter = this.props.unavailableChamps.includes(champName) ? "grayscale(100%)" : "none"
                            return (<div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "12vh",
                                marginRight: "2vh",
                                marginLeft: "2vh",
                                marginTop: "1vh",
                                marginBottom: "1vh"
                            }}>
                                <img style={{ height: "10vh", width: "10vh", filter: imgFilter, cursor: "pointer", background: "rgba(0,0,0,0.3)" }} key={index}
                                    src={`../ChampionIcons/` + champName + `Square.png`} alt="info"
                                    onClick={() => this.props.selectChamp(champName)} />
                                <p style={{ margin: 0, color: "gray", marginTop: "0.6vh" }}>{champName}</p>
                            </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default ChampionScroll;