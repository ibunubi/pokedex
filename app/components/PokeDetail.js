import React, {Component} from 'react'
import axios from 'axios'

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
        let itemDetail = <p>Loading pokemon data...</p>
        if(this.state.isLoading === false){
            itemDetail = <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'>Name</div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.name}</div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'>Base Experience</div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.base_experience}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'>Height</div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.height}</div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'>Weight</div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.weight}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <div className='col-sm-3 col-xs-12'>Image</div>
                        <div className='col-sm-9 col-xs-12'>
                            <image src={this.state.data.back_default}/>
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            <div className='wrapper'>
                <h1>Poke Detail : {this.props.selectedPoke.name}</h1>
                {itemDetail}
            </div>
        )
    }
}

export default PokeDetail