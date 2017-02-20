import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import Loader from '../../app/components/PokeList/Loader'

describe('Component: PokeList > Loader', () => {
    it("Loader should display", function() {
        expect(shallow(<Loader showLoader={true} />).find('.loading').exists()).toEqual(true);
    });

    it("Loader should gone", function() {
        expect(shallow(<Loader showLoader={false} />).text('p')).toEqual('');
    });
})