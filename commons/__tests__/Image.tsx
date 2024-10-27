import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import { CustomImageComponent } from '../Image';



jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
  };
});

describe('Test InfoInput component', () => {
    const alt = 'My lovely cat image'
  it('Renders correctly', () => {
    render(<CustomImageComponent uri='null' imageAlt={alt} />)
    expect(screen.getByLabelText(alt)).toBeVisible();
  });
});