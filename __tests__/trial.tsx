import * as React from 'react';
import renderer from 'react-test-renderer';
import Test from '../app/trial';




test('renders correctly', () => {
  const tree = renderer.create(<Test />).toJSON();
  expect(tree).toMatchSnapshot();
});

