import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './renderWithProviders';
import App from '../App';
import { mockRejectedResponse, mockRequestDoneResponse } from './mock/api/fsm';
import { getFixRequestFormDriver } from './FixRequestForm.driver';
import { fireEvent, waitFor } from '@testing-library/react';

const fixRequestFormDriver = getFixRequestFormDriver();

describe('App', () => {
  it('should display empty form when app loads', async () => {
    renderWithProviders(<App />);

    const fixRequestFormButton = await fixRequestFormDriver.findSendRequestButton();
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

  it('should allow user to retry when the request fails', async () => {
    mockRejectedResponse();

    renderWithProviders(<App />);

    const sendRequestButton = await fixRequestFormDriver.findSendRequestButton();
    fireEvent.click(sendRequestButton);

    await waitFor(() => {
      expect(sendRequestButton).toHaveTextContent('Retry');
    })
  })

  it('should show allow users to click back from success card and re-submit a new fix when the request succeeds', async () => {
    mockRequestDoneResponse();

    renderWithProviders(<App />);

    const sendRequestButton = await fixRequestFormDriver.findSendRequestButton();
    fireEvent.click(sendRequestButton);


    const backButton = await fixRequestFormDriver.findBackButton();
    await waitFor(async () => {
      expect(sendRequestButton).not.toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    })

    fireEvent.click(backButton);

    await waitFor(async () => {
      expect(await fixRequestFormDriver.findSendRequestButton()).toBeInTheDocument();
    })
  })

  // it('should show show initial form screen when user resets success screen', () => {

  // })
})