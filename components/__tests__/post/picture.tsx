import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import {SelectableFileItem} from '../../post/picture'



jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
  };
});





describe('Test SelectableFileItem component', () => {
    const asset = {uri: 'any',albumTitle: 'Recents',filename: 'cat.jpg'};
    it('Renders correctly', () => {
        render(<SelectableFileItem asset={ asset as any}  />);
        expect(screen.getByLabelText( `Image item from your device. This image is named ${asset.filename} form the ${asset.albumTitle}`)).toBeVisible()
        expect(screen.toJSON()).toMatchSnapshot();
    });
});