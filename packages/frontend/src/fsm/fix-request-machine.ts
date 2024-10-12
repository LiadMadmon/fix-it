import { useFSM, Transition, Callback } from "@fix-it/fsm";
import { useFixSubmission } from "../api/useFixSubmission";
import { openSnackbar } from "../components/openSnackbar";
import { FixRequestEvents, FixRequestStates } from "../types/fsm";


export const useFixRequestFSM = () => {
  const useTransitions = (): Transition<FixRequestStates, FixRequestEvents, Callback>[] => {
    const { mutateAsync: submitForm } = useFixSubmission({
      onSuccess: submitFixRequestSuccess,
      onError: submitFixRequestError,
    });

    return ([
      { fromState: FixRequestStates.idle, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
      { fromState: FixRequestStates.submitting, toState: FixRequestStates.success, event: FixRequestEvents.submissionSuccess, callback: () => openSnackbar({ severity: 'success', children: 'Your request was fixed' }) },
      { fromState: FixRequestStates.submitting, toState: FixRequestStates.failed, event: FixRequestEvents.submissionFailed, callback: () => openSnackbar({ severity: 'error', children: 'We could not fix your request please try again' }) },
      { fromState: FixRequestStates.failed, toState: FixRequestStates.idle, event: FixRequestEvents.reset, callback: () => { } },
      { fromState: FixRequestStates.failed, toState: FixRequestStates.submitting, event: FixRequestEvents.submit, callback: submitForm },
      { fromState: FixRequestStates.success, toState: FixRequestStates.idle, event: FixRequestEvents.reset, callback: () => { } },
    ]);
  }

  const submitFixRequestSuccess = () => {
    fixFormFSM?.dispatch(FixRequestEvents.submissionSuccess);
  }

  const submitFixRequestError = () => {
    fixFormFSM?.dispatch(FixRequestEvents.submissionFailed);
  }

  const fixFormFSM = useFSM<FixRequestStates, FixRequestEvents>(
    FixRequestStates.idle,
    useTransitions,
  );

  return fixFormFSM;
}
