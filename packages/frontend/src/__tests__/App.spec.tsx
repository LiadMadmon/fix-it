import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './renderWithProviders';
import App from '../App';
import { mockSuccessResponse } from './mock/api/fsm';
import { screen } from '@testing-library/react';

describe('App', () => {
  it('should display empty form when app loads', async () => {
    mockSuccessResponse();

    renderWithProviders(<App />);

    const button = await screen.findByRole('button', { name: 'submit-fix-request-button' });
    expect(button).toHaveTextContent('Submit');
  })

  // it('should allow user to retry when the request fails', () => {

  // })

  // it('should show success screen when submission succeeds', () => {

  // })

  // it('should show show initial form screen when user resets success screen', () => {

  // })
})