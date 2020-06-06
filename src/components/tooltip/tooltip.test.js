// /* globals describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Tooltip from './Tooltip';

const getProps = () => ({
  content: 'this is a tooltiptext',
  children:<div>this is a child</div>
});

describe('Rendering Tooltip', () => {
  it('Tooltip renders using ReactDOM without crashing', () => {
    const props = getProps();
    const div = document.createElement('div');
    ReactDOM.render(<Tooltip {...props} />, div);
  });
  it('Tooltip renders using enzyme shallow without crashing', () => {
    const props = getProps();
    shallow(<Tooltip {...props} />);
  });
  it('Tooltip renders using enzyme mount without crashing', () => {
    const props = getProps();
    const wrapper = mount(<Tooltip {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Tooltip (Snapshot)', () => {
  it('Tooltip renders using renderer without crashing', () => {
    const props = getProps();
    const component = renderer.create(<Tooltip {...props} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('Tooltip', () => {
  it('should show children', () => {
    const props = getProps();
    const component = mount(<Tooltip {...props} />);
    const actual = component.html();
    const expected = `<div>this is a child</div>`;
    expect(actual).toContain(expected);
  });
});
