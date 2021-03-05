export default function flattenRedTeam(json){
    const tmp = []
    json.data.forEach((e) => {
        let {index, redTeamWin} = e
        tmp.push({"index": index, "value": redTeamWin})
    })
    return tmp
}