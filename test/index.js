import React from 'react';
import { test } from 'tap';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Selectable from '../examples/Selectable';
import data from '../examples/datasource';

configure({ adapter: new Adapter() });

test('shallow', (t) => {
    let startTime = 0;
    let endTime = 0;

    const wrapper = shallow(
        <Selectable
            onUpdateStart={() => {
                startTime = Date.now();
            }}
            onUpdateEnd={() => {
                endTime = Date.now();
                const elapsedTime = endTime - startTime;
                console.log(`Elapsed Time: ${elapsedTime} ms`);

                t.end();
            }}
        />
    );

    wrapper.setProps({ data: data });
});
