import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import Items from '../../app/components/PokeList/Items'

describe('Component: PokeList > Items', () => {
    const data = {
        pokeItems: [{url:'url_target', 'name':'something happen'},{url:'url_target_2', 'name':'whoooaa!!!'}],
        detail: () => {}
    };
    it("Items should load list", function() {
        expect(shallow(<Items {...data} />).find('li').length).toBeGreaterThanOrEqualTo(1);
    });
})