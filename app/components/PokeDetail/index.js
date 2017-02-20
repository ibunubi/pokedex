import React, {Component} from 'react'
import axios from 'axios'

import Info from './Info'

class PokeDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
        this.loadDetail = this.loadDetail.bind(this);
    }
    loadDetail(){
        let me = this;

        axios.get(this.props.selectedPoke.url)
        .then(function (response) {
            me.setState({
                isLoading: false,
                data: response.data
            })
        })
        .catch(function (error) {
            console.log('error :', error);
        });
    }
    componentDidMount(){
        this.loadDetail();
    }
    
    render () {
        // status loading
        let itemDetail = <p>Loading pokemon data...</p>
        if(this.state.isLoading === false){
            itemDetail = <Info data={this.state.data} />
        }
        return (
            <div className='wrapper'>
                <h2>Pokemon Detail : {this.props.selectedPoke.name}</h2>
                {itemDetail}
            </div>
        )
    }
}

export default PokeDetail