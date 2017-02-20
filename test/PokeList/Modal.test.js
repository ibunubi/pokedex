import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import Modal from '../../app/components/PokeList/Modal'

describe('Component: PokeList > Modal', () => {

    it("Modal for detail wrapper should display", function() {
        const data = {
            pokeDisplaying: true, 
            closeDetail: () => {}, 
            selectedPoke: 11
        }
        expect(shallow(<Modal {...data} />).find('div.active').exists()).toEqual(true);
    });

    it("Modal for detail wrapper should gone", function() {
        const data = {
            pokeDisplaying: false, 
            closeDetail: () => {}, 
            selectedPoke: 11
        }
        expect(shallow(<Modal {...data} />).text()).toEqual('');
    });

    
})