export interface ServerToClientEvents {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  ClientMsg: (data: { msg: string; room: string }) => void;
}
