import { Transition, FSMCallback, FSM } from './types/fsm';
import { useState } from 'react';

export const useFSM = <
  State extends string | number | symbol,
  Event extends string | number | symbol,
  CB extends Record<Event, FSMCallback> = Record<Event, FSMCallback>,
>(
  initalState: State,
  useTransitions: () => Transition<State, Event, CB[Event]>[],
): FSM<State, Event, CB> => {
  const [state, setState] = useState<State>(initalState);
  const transitions = useTransitions();

  const getState = () => {
    return state;
  }

  const dispatch = async <E extends Event>(event: E, ...args: Parameters<CB[E]>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const transitionFount = transitions.some((transition) => {
        if (transition.fromState === state && transition.event === event) {
          setState(transition.toState);
          if (transition.callback) {
            try {
              const p = transition.callback(...args);
              if (p instanceof Promise) {
                p.then(resolve).catch((e: Error) => reject(e));
              } else {
                resolve();
              }
            } catch (e) {
              reject('Exception caught in callback');
            }
          } else {
            resolve();
          }
          return true;
        }
        return false;
      });

      if (!transitionFount) {
        reject(new Error('No such transition'));
      }
    });
  }

  return {
    dispatch,
    getState,
  }
}
