import { renderHook, act } from '@testing-library/react-hooks';
import { FSMCallback, Transition } from '../types/fsm';
import { useCreateFSM } from '../fsm';

describe('useCreateFSM with Car States', () => {

  type State = 'parked' | 'driving' | 'neutral' | 'broken';
  type Event = 'start' | 'drive' | 'park' | 'breakDown';


  const createCarTransitions = (callbacks: Partial<Record<Event, FSMCallback>> = {}): Transition<State, Event, FSMCallback>[] => [
    {
      fromState: 'parked',
      event: 'start',
      toState: 'neutral',
      callback: callbacks.start,
    },
    {
      fromState: 'neutral',
      event: 'drive',
      toState: 'driving',
      callback: callbacks.drive,
    },
    {
      fromState: 'neutral',
      event: 'park',
      toState: 'parked',
      callback: callbacks.park,
    },
    {
      fromState: 'driving',
      event: 'park',
      toState: 'parked',
      callback: callbacks.park,
    },
    {
      fromState: 'driving',
      event: 'breakDown',
      toState: 'broken',
      callback: callbacks.breakDown,
    }
  ];

  it('should handle transition without a callback', async () => {
    const { result } = renderHook(() =>
      useCreateFSM<State, Event>('neutral', createCarTransitions())
    );

    expect(result.current.getState()).toBe('neutral');

    await act(async () => {
      await result.current.dispatch('park');
    });

    expect(result.current.getState()).toBe('parked');
  });

  it('should handle async callback when promise rejects and still move states', async () => {
    const asyncBreakDown = jest.fn(async () => {
      return Promise.reject(new Error('Car engine failure'));
    });

    const { result } = renderHook(() =>
      useCreateFSM<State, Event>('driving', createCarTransitions({ breakDown: asyncBreakDown }))
    );

    expect(result.current.getState()).toBe('driving');

    await act(async () => {
      try {
        await result.current.dispatch('breakDown');
      } catch (error) {

      }
    });

    expect(result.current.getState()).toBe('broken');
    expect(asyncBreakDown).toHaveBeenCalledTimes(1);
  });

  it('should handle sync callback when moving from one state to another', async () => {
    const syncPark = jest.fn(() => {
      return;
    });

    const { result } = renderHook(() =>
      useCreateFSM<State, Event>('driving', createCarTransitions({ park: syncPark }))
    );

    expect(result.current.getState()).toBe('driving');

    await act(async () => {
      await result.current.dispatch('park');
    });

    expect(result.current.getState()).toBe('parked');
    expect(syncPark).toHaveBeenCalledTimes(1);
  });

  it('should handle sync callback that throws an error when moving states', async () => {
    const syncStartError = jest.fn(() => {
      throw new Error('Starter malfunction');
    });

    const { result } = renderHook(() =>
      useCreateFSM<State, Event>('parked', createCarTransitions({ start: syncStartError }))
    );

    expect(result.current.getState()).toBe('parked');

    await act(async () => {
      try {
        await result.current.dispatch('start');
      } catch (error) {

      }
    });

    expect(result.current.getState()).toBe('neutral');
    expect(syncStartError).toHaveBeenCalledTimes(1);
  });

  it('should handle async callback when promise resolves', async () => {
    const asyncDrive = jest.fn(async () => {
      return Promise.resolve();
    });

    const { result } = renderHook(() =>
      useCreateFSM<State, Event>('neutral', createCarTransitions({ drive: asyncDrive }))
    );

    expect(result.current.getState()).toBe('neutral');

    await act(async () => {
      await result.current.dispatch('drive');
    });

    expect(result.current.getState()).toBe('driving');
    expect(asyncDrive).toHaveBeenCalledTimes(1);
  });
});
