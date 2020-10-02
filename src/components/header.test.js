// @flow

import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  let result;

  beforeEach(() => {
    result = render(<Header />);
  });

  it('renders the header text', () => {
    const linkElement = result.getByText(/Paketo Buildpacks/i);

    expect(linkElement).toBeInTheDocument();
  });

  it('renders the logo', () => {
    const logo = result.getByAltText(/logo/i);

    expect(logo).toBeInTheDocument();
  });
});
