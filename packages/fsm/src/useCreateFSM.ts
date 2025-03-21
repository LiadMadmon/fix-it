import { Transition, FSMCallback, FSM } from './types/fsm';
import { useState } from 'react';

export const useCreateFSM = <
  State extends string | number | symbol,
  Event extends string | number | symbol,
  CB extends Record<Event, FSMCallback> = Record<Event, FSMCallback>,
>(
  initialState: State,
  transitions: Transition<State, Event, CB[Event]>[],
): FSM<State, Event, CB> => {
  const [state, setState] = useState<State>(initialState);

  const getState = () => state;

  const dispatch = async <E extends Event>(
    event: E,
    ...args: Parameters<CB[E]>
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const transitionFound = transitions.some((transition) => {
        if (transition.fromState !== state || transition.event !== event) {
          return false;
        }

        setState(transition.toState);

        if (transition.callback) {
          try {
            const p = transition.callback(...args);
            if (p instanceof Promise) {
              p.then(resolve).catch(reject);
            } else {
              resolve();
            }
          } catch (e) {
            reject('Exception caught in callback');
          }
        }

        return true;
      });

      if (!transitionFound) {
        reject(new Error('No such transition'));
      } else {
        resolve();
      }
    });
  };

  return {
    dispatch,
    getState,
  };
}
