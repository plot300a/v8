import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, screen,} from '@testing-library/react-native';
import Settings from '../../settings/index'



jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
  };
});


describe('Test settings page', () => {
  it('Screen renders correctly', () => {
    render(<Settings />)
    expect(screen.getByTestId('screen-title')).toBeVisible();
    expect(screen.getByTestId('screen-title')).toHaveTextContent('Settings');
    expect(screen.getByText('Name')).toBeVisible()
    expect(screen.getByText('Bio')).toBeVisible()
    expect(screen.getByText('Website')).toBeVisible()
    expect(screen.getByText('Location')).toBeVisible()
  });
});