import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const socketInstance = io(serverUrl);

    setSocket(socketInstance);

    socketInstance.on("server-data", (message) => {
      setData(message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  return { socket, data };
};

export default useSocket;
