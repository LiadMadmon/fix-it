import { FixRequest } from "@fix-it/shared-types";
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from "@mui/material";
import { FixRequestEvents, FixRequestFSM, FixRequestStates } from "../types/fsm";
import { StyledFixRequestForm } from './FixRequestForm.styled';
import { SeveritySelect } from "./SeveritySelect";
import { FixTypeSelect } from "./IssueTypeSelect";

const StateToSubmitTextMapper = {
  [FixRequestStates.failed]: 'Retry',
  [FixRequestStates.idle]: 'Submit',
  [FixRequestStates.retrying]: 'Submit',
  [FixRequestStates.submitted]: 'Submit',
  [FixRequestStates.submitting]: 'Submit',
  [FixRequestStates.success]: 'Submit',
}

const INITIAL_REQUEST_VALUES: FixRequest = {
  location: '',
  name: '',
  severity: 'urgent',
  type: 'keyboard',
  floor: '',
}
export const FixRequestForm = ({ fixRequestFSM }: { fixRequestFSM: FixRequestFSM }) => {
  const methods = useForm<FixRequest>({
    defaultValues: INITIAL_REQUEST_VALUES,
  });

  const { severity, type } = methods.watch();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fixRequestFSM?.dispatch(FixRequestEvents.submit, methods.getValues());
  }

  const fixRequestSubmissionButtonText = StateToSubmitTextMapper[fixRequestFSM.getState()];

  return (
    <StyledFixRequestForm onSubmit={handleSubmit}>
      <Typography color='textPrimary' variant='h4' component='h4'>New Fix Request</Typography>
      <Typography color='textPrimary'>How can we help? Reach out - we're just a message away!</Typography>
      <TextField size='small' variant='outlined' placeholder='Full Name' {...methods.register('name', { required: true })}></TextField>
      <TextField size='small' variant='outlined' placeholder='Office Location' {...methods.register('location', { required: true })}></TextField>
      <TextField size='small' variant='outlined' placeholder='Office Floor' {...methods.register('floor')}></TextField>
      <FixTypeSelect type={type} {...methods.register('type')} />
      <SeveritySelect severity={severity} {...methods.register('severity')} />
      <Button variant='contained' type="submit">{fixRequestSubmissionButtonText}</Button>
    </StyledFixRequestForm>
  )
}
