import React, { Component } from 'react';

// when poke-list is loading it will give status loading
const Loader = ({showLoader, errorMsg}) => {
    let noteOnLoad = <p></p>;
    if(errorMsg == ''){
        if(showLoader === true)
            noteOnLoad = <p className='loading'>Loading ... </p>
    } else{
        noteOnLoad = <p className='loading'>{errorMsg}</p>
    }
    return (
        <div>{noteOnLoad}</div>
    )
}

export default Loader;