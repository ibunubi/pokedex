import React, {Component} from 'react'
import axios from 'axios'

import {BASE_URI} from '../config'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.onChange = this.onChange.bind(this);
        this.loadGeneration = this.loadGeneration.bind(this);
    }
    loadGeneration(){
        let me = this;
        axios.get(BASE_URI + 'generation/')
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
        this.loadGeneration();
    }
    onChange(e){
        var id = this.refs.filterOpt.value.toLowerCase();
        console.log(id);
    }
    render () {
        let optionList = <option>Generation data not loaded</option>
        if(this.state.items) {
            optionList = this.state.items.map((item) => {
                return <option key={item.url} value={item.url}>{item.name}</option>
            })
        }
        return (
            <div>
                <label htmlFor='filterOpt'>Generation : </label>
                <select ref='filterOpt' name='filterOpt' onChange={this.onChange}>
                    {optionList}
                </select>
            </div>
        )
    }
}

export default Filter