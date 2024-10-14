export type Transition<State, Event, CB> = {
  fromState: State;
  event: Event;
  toState: State;
  callback?: CB;
}

export type FSMCallback = (...args: any[]) => any;

export type FSM<
  State extends string | number | symbol,
  Event extends string | number | symbol,
  CB extends Record<Event, FSMCallback>,
> = {
  dispatch: <E extends Event>(event: E, ...args: Parameters<CB[E]>) => Promise<void>;
  getState: () => State;
}
