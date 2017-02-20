import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import {PokeList, PokeFilter} from '../../app/components'
import Modal from '../../app/components/PokeList/Modal'
import Items from '../../app/components/PokeList/Items'
import Loader from '../../app/components/PokeList/Loader'

describe('Component: PokeList', () => {
    it("The component is exist", function() {
        expect(shallow(<PokeList />).length).toEqual(1);
    });

    it("Should has Filter", function() {
        expect(shallow(<PokeList />).find('PokeFilter').length).toEqual(1);
    });
    
    it("Should has Modal", function() {
        expect(shallow(<PokeList />).find('Modal').length).toEqual(1);
    });
    
    it("Should has Item", function() {
        expect(shallow(<PokeList />).find('Items').length).toEqual(1);
    });
    
    it("Should has Loader", function() {
        expect(shallow(<PokeList />).find('Loader').length).toEqual(1);
    });
    
})