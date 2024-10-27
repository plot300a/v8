import * as React from 'react';
import {render, screen,} from '@testing-library/react-native';
import {InfoInput, ProfileInfo, TabHead} from '../../settings/index'



jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
  };
});


describe('Test TabHead component', () => {
    const title = 'Posts'
  it('Renders correctly', () => {
    render(<TabHead title={title} />)
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('Tab heading or title is displayed', () => {
    render(<TabHead title={title} />)
    expect(screen.getByTestId('tab-title')).toBeVisible();
  });
  it('Screen has the right heading or title', () => {
    render(<TabHead title={title} />)
    expect(screen.getByTestId('tab-title')).toHaveTextContent(title);
  });
});

describe('Test InfoInput component', () => {
    const name = 'Bio'
    const value = 'Hello, this is something small about me'
  it('Renders correctly', () => {
    render(<InfoInput name={name} initValue={value} />);
    expect(screen.getByTestId(`input-field-${name}`)).toBeVisible();
    expect(screen.getByTestId(`input-field-${name}`)).toHaveProp('accessibilityLabel',`Edit ${name}`)
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Test ProfileInfo component', () => {
   // Some needed data
   const imageUrl = "",
   devImage = undefined,
   username="Alexander Moore",
   bio="Something little about user",
   website="www.versess.com",
   followers=534,
   folllowing=54,
   location="Accra, Ghana";
  it('Renders correctly', () => {
    render(
        <ProfileInfo  
            username={username}
            bio={bio}
            imageUrl={imageUrl}
            website={website}
            followers={followers}
            folllowing={folllowing}
            location={location}
            devImage={devImage}
        />
    );
    
    expect(screen.getByLabelText(`${username}'s profile image`)).toBeVisible()
    expect(screen.getByText(username)).toBeVisible()
    expect(screen.getByText(website)).toBeVisible()
    expect(screen.getByText(location)).toBeVisible()
  });
});
