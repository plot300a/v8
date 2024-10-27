import * as React from 'react';
import renderer from 'react-test-renderer';
import Today from '../../../trends/trendPageButton/Today';
jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
      Ionicons: View,
      AntDesign: View,
      EvilIcons: View
    };
  });

test('renders correctly', () => {
    const tree = renderer.create(<Today todayPressed={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

