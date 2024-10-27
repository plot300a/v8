import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import {Trending, WeeklyTop} from '../../home'



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

describe('Test weekly top component', () => {
    const data = {
        text: 'Excepteur sint occaet cupidat non proido hugc jokn',
        imageUrl: '',
        devImage: undefined, 
    }
  it('Renders correctly', () => {
    render(<WeeklyTop {...data} />);
    expect(screen.getByLabelText('Press to view post')).toBeVisible();
    expect(screen.getByLabelText("Post's image banner")).toBeVisible();
    expect(screen.getByText(data.text)).toBeVisible();
  });
});

describe('Test Trending component', () => {
  const data = {
      text: 'Excepteur sint occaet cupidat non proido hugc jokn',
      imageUrl: '',
      devImage: undefined, 
      title: 'Test title',
      date: '02-8-2021',
      viewCount: 576,
      id: '67',
      type: 'image'
  }
  it('Renders correctly', () => {
    render(<Trending {...data} />);
    expect(screen.getByLabelText('Press to view post')).toBeVisible();
    expect(screen.getByLabelText("Post's image")).toBeVisible();
    expect(screen.getByText(data.text)).toBeVisible();
  });
});