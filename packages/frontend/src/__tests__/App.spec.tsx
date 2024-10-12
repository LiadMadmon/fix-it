import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './renderWithProviders';
import App from '../App';
import { mockSuccessResponse } from './mock/api/fsm';
import { getFixRequestFormDriver } from './FixRequestForm.driver';
import { waitFor } from '@testing-library/react';

const fixRequestFormDriver = getFixRequestFormDriver();

describe('App', () => {
  it('should display empty form when app loads', async () => {
    mockSuccessResponse();

    renderWithProviders(<App />);

    const fixRequestFormButton = await fixRequestFormDriver.sendRequestButton();
    const fixTypeSelect = await fixRequestFormDriver.findFixTypeSelect();
    const severitySelect = await fixRequestFormDriver.findSeveritySelect();
    const floorInput = await fixRequestFormDriver.findFloorInput();
    const nameInput = await fixRequestFormDriver.findNameInput();
    const locationInput = await fixRequestFormDriver.findLocationInput();

    await waitFor(() => {
      expect(fixTypeSelect).toHaveTextContent('Keyboard');
      expect(severitySelect).toHaveTextContent('Urgent');
      expect(fixRequestFormButton).toHaveTextContent('Submit');
      expect(floorInput).toHaveValue('');
      expect(nameInput).toHaveValue('');
      expect(locationInput).toHaveValue('');
    })
  })

  // it('should allow user to retry when the request fails', () => {

  // })

  // it('should show success screen when submission succeeds', () => {

  // })

  // it('should show show initial form screen when user resets success screen', () => {

  // })
})