import {ChampToKey} from "../constants/ChampToKey"
import {KeyToChamp} from "../constants/KeyToChampion";

/**
 * List of Champion IDs
 */
export type ChampionID = typeof ChampToKey[keyof typeof ChampToKey]

/**
 * List of Champion Name (Strings)
 */
export type ChampionName = typeof KeyToChamp[keyof typeof KeyToChamp]