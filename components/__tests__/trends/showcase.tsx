import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import ViralShowCase from '../../trends/showcase'



jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
    AntDesign: View,
  };
});

jest.mock('expo-av', () => {
  const { View } = require('react-native');
  return {
    AVPlaybackStatus: {},
    ResizeMode: {},
    Video: View
  };
});

describe('Test viral showcase screen', () => {
    
  it('Renders correctly', () => {
    render(<ViralShowCase />);
    expect(screen.getByLabelText('Viral showcase screen')).toBeVisible();
  });
});