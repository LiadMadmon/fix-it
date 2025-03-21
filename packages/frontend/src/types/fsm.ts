import { FSM, FSMCallback } from "@fix-it/fsm";

export enum FixRequestStates { idle = 'idle', submitted = 'submitted', rejected = 'rejected', submitting = 'submitting', success = 'success', failed = 'failed', retrying = 'retrying' };
export enum FixRequestEvents { submit = 'submit', fixDone = 'fixDone', reset = 'reset', submissionSuccess = 'submissionSuccess', fixRejected = 'fixRejected', submissionFailed = 'submissionFailed' };

export type FixRequestFSM = FSM<FixRequestStates, FixRequestEvents, Record<FixRequestEvents, FSMCallback>>
