// @flow

import React from 'react';
import { render } from '@testing-library/react';

import LabelItem from './label_item';
import Label from '../../models/label';

describe('LabelItem', () => {
  let result;

  beforeEach(() => {
    const label = new Label({
      id: 1234,
      name: 'some-label-name',
      color: '112233',
    });

    result = render(<LabelItem label={label} />);
  });

  it('renders a label', () => {
    const label = result.getByRole('generic', { name: 'github-label' });

    expect(label).toHaveTextContent('some-label-name');
    expect(label).toHaveClass('github-label');
    expect(label).toHaveAttribute('style');
  });
});
