import expect from 'expect'
import axios from 'axios'

import {BASE_URI} from '../../app/config'

describe('Testing API availability', () => {
    it('Load bulbasaur pokemon from pokeapi salestock with cors enabled', () => {
        axios.get(BASE_URI + 'pokemon/1')
            .then(function (response) {
                expect(response.data.id).toEqual(1);
                expect(response.data.name).toEqual('bulbasaur');
            })
            .catch(function (error) {
                
            });
    });

    it('Load bulbasaur pokemon from pokeapi.co with cors disabled, it will work in specific network ', () => {
        axios.get('http://pokeapi.co/api/v2/pokemon/1')
            .then(function (response) {
                expect(response.data.id).toEqual(1);
                expect(response.data.name).toEqual('bulbasaur');
            })
            .catch(function (error) {
                
            });
    });
});