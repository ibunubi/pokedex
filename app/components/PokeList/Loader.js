import React, { Component } from 'react';

// when poke-list is loading it will give status loading
const Loader = ({showLoader}) => {
    let noteOnLoad = <p></p>;
    if(showLoader === true)
        noteOnLoad = <p className='loading'>Loading ... </p>
    return (
        <div>{noteOnLoad}</div>
    )
}

export default Loader;