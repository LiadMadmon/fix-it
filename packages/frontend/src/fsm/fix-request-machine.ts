import { useCreateFSM, Transition, FSMCallback } from "@fix-it/fsm";
import { useFixSubmission } from "../api/useFixSubmission";
import { openSnackbar } from "../components/openSnackbar";
import { FixRequestEvents, FixRequestStates } from "../types/fsm";

export const useFixRequestFSM = () => {
  const submitFixRequestSuccess = () => {
    fixRequestFSM.dispatch(FixRequestEvents.submissionSuccess);
  }

  const submitFixRequestRejected = () => {
    fixRequestFSM.dispatch(FixRequestEvents.submissionRejected);
  }

  const submitFixRequestError = () => {
    fixRequestFSM.dispatch(FixRequestEvents.submissionFailed);
  }

  const { mutateAsync: submitForm } = useFixSubmission({
    onDone: submitFixRequestSuccess,
    onRejected: submitFixRequestRejected,
    onError: submitFixRequestError,
  });

  const transitions: Transition<FixRequestStates, FixRequestEvents, FSMCallback>[] = [
    { fromState: FixRequestStates.idle, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.rejected, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.failed, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.success, event: FixRequestEvents.submissionSuccess, callback: () => openSnackbar({ severity: 'success', children: 'Your request was fixed' }) },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.rejected, event: FixRequestEvents.submissionRejected, callback: () => openSnackbar({ severity: 'error', children: 'We could not fix your request please try again' }) },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.failed, event: FixRequestEvents.submissionFailed, callback: () => openSnackbar({ severity: 'error', children: 'We could not fix your request please try again' }) },
    { fromState: FixRequestStates.rejected, toState: FixRequestStates.idle, event: FixRequestEvents.reset },
    { fromState: FixRequestStates.success, toState: FixRequestStates.idle, event: FixRequestEvents.reset },
  ];

  const fixRequestFSM = useCreateFSM<FixRequestStates, FixRequestEvents>(
    FixRequestStates.idle,
    transitions,
  );

  return fixRequestFSM;
}
