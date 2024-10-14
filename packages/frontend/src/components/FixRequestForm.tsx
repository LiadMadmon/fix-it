import { FixRequest } from "@fix-it/shared-types";
import { useForm } from 'react-hook-form';
import { TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import { FixRequestEvents, FixRequestFSM, FixRequestStates } from "../types/fsm";
import { StyledFixRequestForm } from './FixRequestForm.styled';
import { SeveritySelect } from "./SeveritySelect";
import { FixTypeSelect } from "./IssueTypeSelect";
import { isStringNumber } from "../utils/number";

const StateToSubmitTextMapper = {
  [FixRequestStates.failed]: 'Retry',
  [FixRequestStates.rejected]: 'Retry',
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
  const theme = useTheme();

  const { severity, type } = methods.watch();
  const onSubmit = methods.handleSubmit((data) => {
    fixRequestFSM?.dispatch(FixRequestEvents.submit, data);
  });

  const fixRequestSubmissionButtonText = StateToSubmitTextMapper[fixRequestFSM.getState()];
  const { location: locationError, name: nameError, floor: floorError } = methods.formState.errors;

  return (
    <StyledFixRequestForm onSubmit={onSubmit}>
      <Typography color={theme.palette.text.primary} variant='h4' component='h4'>New Fix Request</Typography>
      <Typography color={theme.palette.text.primary}>How can we help? Reach out - we're just a message away!</Typography>
      <TextField
        data-testid='name-input'
        error={!!nameError}
        helperText={!!nameError ? "Please insert a valid name" : null}
        size='small'
        variant='outlined'
        placeholder='Full Name'
        {...methods.register('name', { required: true })}
      ></TextField>
      <TextField
        data-testid='location-input'
        error={!!locationError}
        helperText={!!locationError ? "Please insert a valid location" : null}
        size='small'
        variant='outlined'
        placeholder='Office Location'
        {...methods.register('location', { required: true })}
      ></TextField>
      <TextField
        data-testid='floor-input'
        error={!!floorError}
        helperText={floorError ? "Please insert your floor number" : null}
        size='small'
        variant='outlined'
        placeholder='Office Floor'
        {...methods.register('floor', {
          required: true,
          validate: isStringNumber,
        })}
      ></TextField>
      <FixTypeSelect type={type} {...methods.register('type')} />
      <SeveritySelect severity={severity} {...methods.register('severity')} />
      <LoadingButton loading={fixRequestFSM.getState() === FixRequestStates.submitting} aria-label='submit fix request button' variant='contained' type="submit">{fixRequestSubmissionButtonText}</LoadingButton>
    </StyledFixRequestForm>
  )
}
