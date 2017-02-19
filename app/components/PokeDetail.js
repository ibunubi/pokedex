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
        // status loading
        let itemDetail = <p>Loading pokemon data...</p>
        if(this.state.isLoading === false){
            // generate image dom for spite images
            let spritesList = this.state.data.sprites,
                imgSprites = Object.keys(spritesList).map(function (key) {
                    if(spritesList[key] !== null) {
                        let img = <img src={spritesList[key]} className='img-circle img-responsive' alt={key}/>;
                        return <span className='img-sprite' key={key}>{key}<br/>{img}</span>;
                    }
                });
            // populate pokemon types
            let pokeTypes = this.state.data.types.map((o) => {
                return <li key={o.type.url}>{o.type.name}</li>;
            });

            itemDetail = <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'><label>Name :</label></div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.name}</div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'><label>Base Experience :</label></div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.base_experience}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'><label>Height :</label></div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.height}</div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'><label>Weight :</label></div>
                        <div className='col-sm-6 col-xs-12'>{this.state.data.weight}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='col-sm-6 col-xs-12'><label>Types :</label></div>
                        <div className='col-sm-6 col-xs-12'><ul>{pokeTypes}</ul></div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <div className='col-md-12'><label>Photos :</label></div>
                        <div className='col-md-12'>
                            {imgSprites}
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            <div className='wrapper'>
                <h2>Poke Detail : {this.props.selectedPoke.name}</h2>
                {itemDetail}
            </div>
        )
    }
}

export default PokeDetail