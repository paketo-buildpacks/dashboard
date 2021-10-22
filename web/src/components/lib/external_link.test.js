// @flow

import React from 'react';
import { render } from '@testing-library/react';

import ExternalLink from './external_link';

describe('ExternalLink', () => {
  let result;

  beforeEach(() => {
    result = render(
      <ExternalLink href='some-url'>
        some-text
      </ExternalLink>
    );
  });

  it('renders a link', () => {
    const link = result.getByRole('link', { name: 'some-text' });

    expect(link).toHaveAttribute('href', 'some-url');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    expect(link).not.toHaveClass('some-class');
    expect(link).not.toHaveAttribute('aria-label', 'some-label');
  });

  describe('when the link has a className prop', () => {
    beforeEach(() => {
      result.rerender(
        <ExternalLink href='some-url' className='some-class'>
          some-text
        </ExternalLink>
      );
    });

    it('renders a link with a class', () => {
      const link = result.getByRole('link', { name: 'some-text' });

      expect(link).toHaveAttribute('href', 'some-url');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');

      expect(link).toHaveClass('some-class');
    });
  });

  describe('when the link has an aria-label prop', () => {
    beforeEach(() => {
      result.rerender(
        <ExternalLink href='some-url' aria-label='some-label'>
          some-text
        </ExternalLink>
      );
    });

    it('renders a link with a class', () => {
      const link = result.getByRole('link', { name: 'some-label' });

      expect(link).toHaveAttribute('href', 'some-url');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');

      expect(link).toHaveAttribute('aria-label', 'some-label');
    });
  });
});
