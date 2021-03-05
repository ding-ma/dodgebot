import {KeyToChamp} from "../../../constants/KeyToChampion";

export default function flatten(json){
    const tmp = []
    json.data.forEach((e) => {
        let {index, values} = e
        tmp.push({"index": KeyToChamp[index], "value": values})
    })
    return tmp
}
