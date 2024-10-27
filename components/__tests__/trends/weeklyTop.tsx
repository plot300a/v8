import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import WeeklyTopTrends from '../../trends/weeklyTop'



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

describe('Test weekly top page', () => {
    
  it('Renders correctly', () => {
    render(<WeeklyTopTrends />);
    expect(screen.getByLabelText('Weekly Top trending posts')).toBeVisible();
    expect(screen.getAllByLabelText('Press to view post')).toHaveLength(9);
  });
});
