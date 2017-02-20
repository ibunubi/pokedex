import React, {Component} from 'react'
import axios from 'axios'

import {BASE_URI} from '../../config'

import PokeFilter from '../PokeFilter'
import Items from './Items'
import Loader from './Loader'
import Modal from './Modal'

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
        // start - open dialog handler
        document.body.className = 'overlay';
        this.setState({
            selectedPoke: val,
            pokeDisplaying: true
        });
        // end
    }
    closeDetail(){
        // start - close dialog handler
        document.body.classList.remove("overlay");
        this.setState({
            pokeDisplaying: false
        });
        //end
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
        return (
            <div>
                <PokeFilter onFilterChange={this.onFilterChange.bind(this)}/>
                <Modal pokeDisplaying={this.state.pokeDisplaying} 
                    closeDetail={this.closeDetail.bind(this)} 
                    selectedPoke={this.state.selectedPoke}/>
                <Items pokeItems={this.state.poke} detail={this.openDetail.bind(this)}/>
                <Loader showLoader={this.state.loading}/>
            </div>
        )
    }
}

export default PokeList