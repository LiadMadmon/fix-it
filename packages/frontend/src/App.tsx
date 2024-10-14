import './App.css'
import { Header } from './components/Header';
import { FixRequestForm } from './components/FixRequestForm';
import { useFixRequestFSM } from './fsm/fix-request-machine';
import { FixRequestSuccess } from './screens/FixRequestSuccess';
import { FixRequestStates } from './types/fsm';
import { AppWrapper, BGPatterns, FixRequestBodyWrapper } from './components/App.styled';

function App() {
  const fixRequestFSM = useFixRequestFSM();
  const state = fixRequestFSM.getState();

  return (
    <AppWrapper>
      <BGPatterns />
      <Header />
      <FixRequestBodyWrapper>
        {state !== FixRequestStates.success ? <FixRequestForm fixRequestFSM={fixRequestFSM} /> : null}
        {state === FixRequestStates.success ? <FixRequestSuccess fixRequestFSM={fixRequestFSM} /> : null}
      </FixRequestBodyWrapper>
    </AppWrapper>
  );
}

export default App
