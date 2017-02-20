import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import PokeFilter from '../../app/components/PokeFilter'

describe('Component: PokeFilter > Index', () => {

    it("PokeFilter for detail wrapper should had item more than 1", function() {
        const data = [{url:'url_target', 'name':'something happen'},{url:'url_target_2', 'name':'whoooaa!!!'}];
        expect(shallow(<PokeFilter />).setState({ items: data }).find('option').length).toBeGreaterThanOrEqualTo(2);
    });
    
})