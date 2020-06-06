// /* globals describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router-dom';
import RouterLink from './RouterLink';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

describe('Rendering RouterLink ', () => {
  it('RouterLink  renders using ReactDOM without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router history={history}>
        <RouterLink href='/' />
      </Router>,
      div
    );
  });
  it(
    'RouterLink  renders using enzyme shallow without crashing',
    () => {
      shallow(
        <Router history={history}>
          <RouterLink href='/' />
        </Router>
      );
    }
  );
  it(
    'RouterLink renders using enzyme mount without crashing',
    () => {
      const wrapper = mount(
        <Router history={history}>
          <RouterLink href='/' />
        </Router>
      );
      expect(wrapper.exists()).toBe(true);
    }
  );
});

describe('RouterLink (Snapshot)', () => {
  it('RouterLink  renders using renderer without crashing', () => {
    const component = renderer.create(
      <Router history={history}>
        <RouterLink href='/' />
      </Router>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
