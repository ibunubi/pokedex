import React, { Component } from 'react';

import PokeDetail from '../PokeDetail'

// when poke-list clicked, and open poke-detail
const Modal = ({pokeDisplaying, closeDetail, selectedPoke}) => {
    let showDetail = '';
    if(pokeDisplaying){
        showDetail = <div className={'dialog active'}>
                <a href="#" onClick={closeDetail.bind(this)}>Close</a>
                <PokeDetail selectedPoke={selectedPoke} />
            </div>;
    }
    return (
        <div>{showDetail}</div>
    )
}

export default Modal;