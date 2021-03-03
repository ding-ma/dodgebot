import React from 'react';

const Champions = ({champs}) => {

    const renderFavChampions = () => {
        const renderFavChampRole = (role) => {
            if (!role) {
                return <div/>
            }
            return role.map((r) => {
                return (
                    <div>
                        <li>{r}</li>
                    </div>
                )
            })
        }
        return <div>
            <ul>ADC: {renderFavChampRole(champs.adc)}</ul>
            <ul>Support: {renderFavChampRole(champs.sup)}</ul>
            <ul>Mid: {renderFavChampRole(champs.mid)}</ul>
            <ul>Jungle: {renderFavChampRole(champs.jg)}</ul>
            <ul>Top: {renderFavChampRole(champs.top)}</ul>
        </div>
    }

    return (
        <div>
            {renderFavChampions()}
        </div>
    )
}

export default Champions;