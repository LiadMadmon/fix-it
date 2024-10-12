import { FSM, FSMCallback } from "@fix-it/fsm";

export enum FixRequestStates { idle = 'idle', submitted = 'submitted', submitting = 'submitting', success = 'success', failed = 'failed', retrying = 'retrying' };
export enum FixRequestEvents { submit = 'submit', submitSuccess = 'submitSuccess', reset = 'reset', submitError = 'submitError', submissionSuccess = 'submissionSuccess', submissionFailed = 'submissionFailed' };

export type FixRequestFSM = FSM<FixRequestStates, FixRequestEvents, Record<FixRequestEvents, FSMCallback>>
