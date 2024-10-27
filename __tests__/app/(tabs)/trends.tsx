import * as React from 'react';
import renderer from 'react-test-renderer';
import Trending from '@/app/(tabs)/trending';

jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
      Ionicons: View,
      AntDesign: View,
      EvilIcons: View,
      FontAwesome: View,
      FontAwesome5: View,
      MaterialIcons: View,
      
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

test('renders correctly', () => {
    const tree = renderer.create(<Trending />).toJSON();
    // expect(tree).toMatchSnapshot();
});

