import { screen } from '@testing-library/react';

export const getFixRequestFormDriver = () => {
  const sendRequestButton = async () => {
    return screen.findByRole('button', { name: 'submit fix request button' });
  }

  const findFixTypeSelect = async () => {
    return screen.findByTestId('fix-type-select');
  }

  const findSeveritySelect = async () => {
    return screen.findByTestId('severity-select');
  }

  const findFloorInput = async () => {
    return (await screen.findByTestId('floor-input')).querySelector('input');
  }

  const findNameInput = async () => {
    return (await screen.findByTestId('name-input')).querySelector('input');
  }

  const findLocationInput = async () => {
    return (await screen.findByTestId('location-input')).querySelector('input');
  }

  return {
    sendRequestButton,
    findFixTypeSelect,
    findSeveritySelect,
    findFloorInput,
    findNameInput,
    findLocationInput,
  }
}
