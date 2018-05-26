import { AsyncResource } from "async_hooks";

export interface Games {
    id: number,
    name: string,
    colour: string,
    board: JSON
  }
  
  const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]
  
  export default Games