import { Button, Typography } from "@mui/material"
import { FixRequestEvents, FixRequestFSM } from "../types/fsm"
import { SubmittedFormSuccessCard } from "../components/FixRequestForm.styled";
import { Done } from '@mui/icons-material';

export const FixRequestSuccess = ({ fixRequestFSM }: { fixRequestFSM: FixRequestFSM }) => {
  const handleReset = () => {
    fixRequestFSM.dispatch(FixRequestEvents.reset);
  }

  return (
    <SubmittedFormSuccessCard>
      <Done sx={{ width: 100, height: 100 }} />
      <Typography marginBottom={4}>Your issue was fixed!</Typography>
      <Button fullWidth aria-label='back button' variant='contained' onClick={handleReset}>back</Button>
    </SubmittedFormSuccessCard>
  )
}
