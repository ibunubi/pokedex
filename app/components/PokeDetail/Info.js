import React, { Component } from 'react'

import Sprites from './Sprites'
import Type from './Type'

const Info = ({data}) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-6 col-xs-12'><label>Name : </label></div>
                    <div className='col-sm-6 col-xs-12'>{data.name}</div>
                </div>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-6 col-xs-12'><label>Base Experience : </label></div>
                    <div className='col-sm-6 col-xs-12'>{data.base_experience}</div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-6 col-xs-12'><label>Height : </label></div>
                    <div className='col-sm-6 col-xs-12'>{data.height}</div>
                </div>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-6 col-xs-12'><label>Weight : </label></div>
                    <div className='col-sm-6 col-xs-12'>{data.weight}</div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-6 col-xs-12'><label>Types : </label></div>
                    <div className='col-sm-6 col-xs-12'>
                        <Type pokeTypes={data.types} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='col-md-12'><label>Photos : </label></div>
                    <div className='col-md-12'>
                        <Sprites spritesList={data.sprites} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;