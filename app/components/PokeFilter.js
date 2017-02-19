import React, {Component} from 'react'
import axios from 'axios'

import {BASE_URI} from '../config'

class PokeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.loadData = this.loadData.bind(this);
    }
    loadData(){
        let me = this;
        axios.get(BASE_URI + 'type/') // want different type of filter, change this url. but don't forget to modify pokeLoad@PokeList.js
        .then(function (response) {
            me.setState({
                items: response.data.results
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentDidMount(){
        this.loadData();
    }
    render () {
        let optionList = <option>Filter data not loaded</option>
        if(this.state.items) {
            optionList = this.state.items.map((item) => {
                return <option key={item.url} value={item.url}>{item.name}</option>
            })
        }
        return (
            <div className='filter'>
                <label htmlFor='filterOpt'>Poke filter by type : </label>
                <select ref='filterOpt' name='filterOpt' onChange={this.props.onFilterChange}>
                    <option value={BASE_URI + 'pokemon/'} key={BASE_URI + 'pokemon/'}>All Pokemon</option>
                    {optionList}
                </select>
            </div>
        )
    }
}

export default PokeFilter