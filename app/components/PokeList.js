import React, {Component} from 'react'
import axios from 'axios'

import PokeDetail from './PokeDetail'
import {BASE_URI} from '../config'

class PokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            poke: [],
            nextUrl: BASE_URI + 'pokemon/',
            loading: false,
            pokeDisplaying: false ,
            selectedPoke: []
        };

        this.loadPoke = this.loadPoke.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    loadPoke(){
        let me = this, 
            loadedPoke = me.state.poke;

        axios.get(me.state.nextUrl)
        .then(function (response) {
            let newPoke = loadedPoke.concat(response.data.results);
            me.setState({
                poke: newPoke,
                nextUrl: response.data.next,
                loading: false
            })
        })
        .catch(function (error) {
            console.log('error :', error);
        });
    }
    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop, // detect margin top
            heightDoc = document.body.clientHeight, // detect document height
            heihghtViewPort = document.documentElement.clientHeight; // detect view port height

        let loadAt = scrollTop + heihghtViewPort - (heihghtViewPort/2), // make loadAt calculation
            heightLimit = heightDoc - heihghtViewPort; // if this height is passed by loadAt, then it will call loadPoke function

        if((loadAt > heightLimit) && this.state.loading === false) {
            this.setState({loading: true});
            this.loadPoke();
        }
    }
    openDetail(val){
        this.setState({
            selectedPoke: val,
            pokeDisplaying: true
        });
    }
    closeDetail(){
        this.setState({
            pokeDisplaying: false
        });
    }
    componentDidMount(){
        this.loadPoke();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render () {
        let item = <li>Pokemon data not loaded</li>
        if(this.state.poke) {
            item = this.state.poke.map((item) => {
                return <li key={item.url} value={item.url} onClick={this.openDetail.bind(this, item)}>{item.name}</li>
            })
        }
        let showDetail = '';
        if(this.state.pokeDisplaying){
            showDetail = <div className={'dialog active'}>
                    <a href="#" onClick={this.closeDetail.bind(this)}>Close</a>
                    <PokeDetail selectedPoke={this.state.selectedPoke} />
                </div>;
        }
        let noteOnLoad = '';
        if(this.state.loading === true)
            noteOnLoad = <p className='loading'>Loading ... </p>
        return (
            <div>
                {showDetail}
                <ul className="poke-list">
                    {item}
                </ul>
                {noteOnLoad}
            </div>
        )
    }
}

export default PokeList