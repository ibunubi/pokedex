import React, { Component } from 'react';

// create poke-list
const Items = ({pokeItems, detail}) => {
    let item = <li>Pokemon data not loaded</li>
    if(pokeItems) {
        item = pokeItems.map((item) => {
            return <li key={item.url} value={item.url} onClick={detail.bind(this, item)}>{item.name}</li>
        })
    }
    return (
        <ul className="poke-list">
        {item}
        </ul>
    )
}

export default Items;