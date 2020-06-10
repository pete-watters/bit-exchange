import { createContext } from 'react';
// defining the context with empty channels object
export const SocketContext = createContext({
  channels: [],
  // FIXME - I made channels an array? Maybe I should have an object for each channel here?
});