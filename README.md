# Fix-It Monorepo

## Overview

**Fix-It** is an IT application designed to streamline issue reporting and resolution processes within an organization. The application is built as a monorepo, containing the following packages:

- **Frontend**: The user interface where users can submit their requests.
- **Backend**: The server-side logic that processes incoming requests and manages responses.
- **FSM (Finite State Machine)**: A library for managing the states and transitions of the application.
- **Shared Types**: TypeScript types that are shared across the packages to ensure type safety and consistency.

### Application Functionality

The application allows users to fill out a request form with the following details:
- Name
- Office Floor
- Office Location
- Issue Type
- Urgency Level

Once submitted, the server processes the request and can respond with either "done" or "rejected." In case of rejection, an illustrative PNG image is displayed to guide the user.

![Illustration](path/to/your/image.png) <!-- Update the path to your PNG image -->

## FSM Library Overview

The **FSM** (Finite State Machine) library provides a simple and effective way to manage states and transitions within the application. The core API is encapsulated in a single React hook:

### `useCreateFSM`

The `useCreateFSM` hook facilitates the creation of a finite state machine. It allows you to define states, events, and transitions, making it easy to manage application state in a predictable manner.

#### API Example

```typescript
import { useCreateFSM } from './path/to/fsm';

const initialState = 'idle';
const transitions = [
  { fromState: 'idle', event: 'submit', toState: 'processing', callback: () => console.log('Processing...') },
  { fromState: 'processing', event: 'resolve', toState: 'done', callback: () => console.log('Request Done') },
  { fromState: 'processing', event: 'reject', toState: 'rejected', callback: () => console.log('Request Rejected') },
];

const { dispatch, getState } = useCreateFSM(initialState, transitions);

// Example usage
dispatch('submit')
  .then(() => dispatch('resolve'))
  .catch(error => console.error(error));

  ## Website Demo

You can explore the live demo of the application at the following URL: [Fix-It Demo](https://liadmadmon.github.io/fix-it)

## Getting Started

To set up the project locally, follow these steps:


1. **Install Dependencies**
```bash
pnpm install
```

2. **Start the client**
```bash
pnpm --filter @fix-it/frontend run start
```