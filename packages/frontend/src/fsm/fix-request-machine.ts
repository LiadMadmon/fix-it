import { useCreateFSM, Transition, FSMCallback } from "@fix-it/fsm";
import { useFixSubmission } from "../api/useFixSubmission";
import { openSnackbar } from "../components/openSnackbar";
import { FixRequestEvents, FixRequestStates } from "../types/fsm";
import { useFixRequestStore } from "../stores/fix-store";

export const useFixRequestFSM = () => {
  const fixRequestStore = useFixRequestStore();

  const submitFixRequestSuccess = () => {
    fixRequestFSM.dispatch(FixRequestEvents.fixDone);
    fixRequestStore.increaseDoneFixesCount();
  }

  const submitFixRequestRejected = () => {
    fixRequestFSM.dispatch(FixRequestEvents.fixRejected);
    fixRequestStore.increaseRejectedFixesCount();
  }

  const submitFixRequestError = () => {
    fixRequestFSM.dispatch(FixRequestEvents.submissionFailed);
  }

  const { mutateAsync: submitForm } = useFixSubmission({
    onDone: submitFixRequestSuccess,
    onRejected: submitFixRequestRejected,
    onError: submitFixRequestError,
  });

  const handleSubmissionSuccess = () => {
    openSnackbar({ severity: 'success', children: 'Your request was fixed' });
  }

  const handleSubmissionRejected = () => {
    openSnackbar({ severity: 'error', children: 'Our staff are busy, please try again soon.' });
  }

  const handleSubmissionFailed = () => {
    openSnackbar({ severity: 'error', children: 'We encountered an error, please try again soon.' });
  }

  const transitions: Transition<FixRequestStates, FixRequestEvents, FSMCallback>[] = [
    { fromState: FixRequestStates.idle, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.rejected, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.failed, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.success, event: FixRequestEvents.fixDone, callback: handleSubmissionSuccess },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.rejected, event: FixRequestEvents.fixRejected, callback: handleSubmissionRejected },
    { fromState: FixRequestStates.submitting, toState: FixRequestStates.failed, event: FixRequestEvents.submissionFailed, callback: handleSubmissionFailed },
    { fromState: FixRequestStates.success, toState: FixRequestStates.idle, event: FixRequestEvents.reset },
  ];

  const fixRequestFSM = useCreateFSM<FixRequestStates, FixRequestEvents>(
    FixRequestStates.idle,
    transitions,
  );

  return fixRequestFSM;
}
