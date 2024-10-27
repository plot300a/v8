import * as React from 'react';
import { render, screen, } from '@testing-library/react-native';
import { SelectableVideoItem } from '@/components/post/videoo';


jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ name, size, color }: string | number | any) => ({
        name,
        size,
        color,
    }),
}));


describe('Test SelectableFileItem component', () => {
    const asset = { uri: 'any', filename: 'video.mp4' };
    it('Renders correctly', () => {
        render(<SelectableVideoItem asset={asset as any} />);
        expect(screen.getByLabelText(`Video item from your device. This video is named ${asset.filename}`)).toBeVisible()
    });
});