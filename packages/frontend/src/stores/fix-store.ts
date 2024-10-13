import { create } from 'zustand'

type FixRequestStoreState = {
  rejectedFixesCount: number;
  doneFixesCount: number;
  increaseRejectedFixesCount: () => void;
  increaseDoneFixesCount: () => void;
}

export const useFixRequestStore = create<FixRequestStoreState>((set) => ({
  rejectedFixesCount: 0,
  doneFixesCount: 0,
  increaseRejectedFixesCount: () => set(({ rejectedFixesCount }) => ({ rejectedFixesCount: rejectedFixesCount + 1 })),
  increaseDoneFixesCount: () => set(({ doneFixesCount }) => ({ doneFixesCount: doneFixesCount + 1 })),
}))
