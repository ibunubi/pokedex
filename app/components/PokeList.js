import React, {Component} from 'react'
import axios from 'axios'

import PokeDetail from './PokeDetail'
import PokeFilter from './PokeFilter'
import {BASE_URI} from '../config'

class PokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            poke: [],
            defaultUrl: BASE_URI + 'pokemon/',
            nextUrl: BASE_URI + 'pokemon/',
            loading: false,
            pokeDisplaying: false ,
            selectedPoke: [],
            doFilter: false
        };

        this.loadPoke = this.loadPoke.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    loadPoke(){
        let me = this;
        
        // if there is no more data to load, it will stop here
        if(!this.state.nextUrl) return false;

        // everytime we start request, it will give status loading
        this.setState({loading: true});

        axios.get(me.state.nextUrl)
        .then(function (response) {
            let newPoke = [];
            if(me.state.doFilter){
                // filter results give different object, so we need to map it manually
                response.data.pokemon.map((val) => {
                    newPoke.push(val.pokemon);
                })
            } else {
                // carrying the old data for infinite scroll
                let loadedPoke = me.state.poke;
                newPoke = loadedPoke.concat(response.data.results);
            }
            me.setState({
                poke: newPoke,
                nextUrl: response.data.next, // set next url to next infinite request
                loading: false // hide status loading
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
            this.loadPoke();
        }
    }
    openDetail(val){
        document.body.className = 'overlay';
        this.setState({
            selectedPoke: val,
            pokeDisplaying: true
        });
    }
    closeDetail(){
        document.body.classList.remove("overlay");
        this.setState({
            pokeDisplaying: false
        });
    }
    onFilterChange({target}){
        let loadedPoke = this.state.poke;
        // poke state reset if the target url is eq. with default
        if(target.value == this.state.defaultUrl)
            loadedPoke = [];

        this.setState({
            nextUrl: target.value,
            doFilter: (target.value != this.state.defaultUrl), // if target url not eq. with default, it will give filter 
            poke: loadedPoke
        }, () => {
            this.loadPoke();
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
        // create poke-list
        let item = <li>Pokemon data not loaded</li>
        if(this.state.poke) {
            item = this.state.poke.map((item) => {
                return <li key={item.url} value={item.url} onClick={this.openDetail.bind(this, item)}>{item.name}</li>
            })
        }
        // when poke-list clicked, and open poke-detail
        let showDetail = '';
        if(this.state.pokeDisplaying){
            showDetail = <div className={'dialog active'}>
                    <a href="#" onClick={this.closeDetail.bind(this)}>Close</a>
                    <PokeDetail selectedPoke={this.state.selectedPoke} />
                </div>;
        }
        // when poke-list is loading it will give status loading
        let noteOnLoad = '';
        if(this.state.loading === true)
            noteOnLoad = <p className='loading'>Loading ... </p>

        return (
            <div>
                <PokeFilter onFilterChange={this.onFilterChange.bind(this)}/>
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