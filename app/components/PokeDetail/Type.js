import React, { Component } from 'react'

// populate pokemon types
const Type = ({pokeTypes}) => {
    return (
        <ul className='poke-types'>
        {
            pokeTypes.map((o) => {
                return <li key={o.type.url}>{o.type.name}</li>;
            })
        }
        </ul>
    )
}

export default Type;