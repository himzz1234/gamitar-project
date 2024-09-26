import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const sock = io("https://gamitar-project.onrender.com/");
    setSocket(sock);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
