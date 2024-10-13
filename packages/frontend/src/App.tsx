import './App.css'
import { Header } from './components/Header';
import { FixRequestForm } from './components/FixRequestForm';
import { useFixRequestFSM } from './fsm/fix-request-machine';
import { FixRequestSuccess } from './screens/FixRequestSuccess';
import { FixRequestStates } from './types/fsm';
import { AppWrapper, BGPatterns } from './components/App.styled';
import { Box } from '@mui/material';

function App() {
  const fixRequestFSM = useFixRequestFSM();
  const state = fixRequestFSM.getState();

  return (
    <AppWrapper>
      <BGPatterns />
      <Header />
      <Box padding={4}>
        {state !== FixRequestStates.success ? <FixRequestForm fixRequestFSM={fixRequestFSM} /> : null}
        {state === FixRequestStates.success ? <FixRequestSuccess fixRequestFSM={fixRequestFSM} /> : null}
      </Box>
    </AppWrapper>
  );
}

export default App
