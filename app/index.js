import React, {Component} from 'react'
import {render} from 'react-dom'

import {PokeList} from './components'

import './css/bootstrap-grid.css'
import './css/style.css'

class App extends Component {
    render () {
        return (
            <div>
                <header><h1>Pokedex</h1></header>
                <PokeList />
            </div>
        )
    }
}

render(<App/>, document.getElementById('mount-point'));