import React, { useEffect, createContext, useContext, ReactNode } from "react";
import io, { Socket } from "socket.io-client";

import { useGetProfileInfo } from "@/api/user/user.hooks";
import { backendURL } from "@/api/instance";

export const socket = io(backendURL as string);

const SocketContext = createContext<Socket | null>(socket);

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const { data: userData }: any = useGetProfileInfo();

  const user = React.useMemo(() => {
    if (!userData) return [];
    return userData[1] || [];
  }, [userData]);

  useEffect(() => {
    if (user) {
      socket?.emit("register", user.user_id);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
