import { fireEvent, screen } from '@testing-library/react';

export const getFixRequestFormDriver = () => {
  const findSendRequestButton = async () => {
    return screen.findByRole('button', { name: 'submit fix request button' });
  }

  const findBackButton = async () => {
    return screen.findByRole('button', { name: 'back button' });
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

  const fillName = async () => {
    const nameInput = await findNameInput();
    fireEvent.change(nameInput!, { target: { value: 'john doe' } })
  }

  const fillLocation = async () => {
    const locationInput = await findLocationInput()
    fireEvent.change(locationInput!, { target: { value: 'tel aviv' } })
  }

  const fillFloor = async () => {
    const floorInput = await findFloorInput();
    fireEvent.change(floorInput!, { target: { value: '23' } })
  }

  return {
    findSendRequestButton,
    findFixTypeSelect,
    fillName,
    fillLocation,
    fillFloor,
    findSeveritySelect,
    findFloorInput,
    findNameInput,
    findLocationInput,
    findBackButton,
  }
}
