"use client";
import React, {
  createContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

interface SidebarState {
  open: boolean;
}

export interface SidebarContextType {
  open: boolean;
  handleSidebarToggle: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

const reducer = (
  previousState: SidebarState,
  updatedState: Partial<SidebarState>
): SidebarState => ({
  ...previousState,
  ...updatedState,
});

const initialState: SidebarState = {
  open: true,
};

interface SidebarContextProviderProps {
  children: ReactNode;
}

const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { open } = state;

  const handleSidebarToggle = useCallback(() => {
    const body = document.querySelector("body");

    console.log("open>", open);
    body?.setAttribute("data-sidebar", open ? "open" : "close");
    dispatch({ open: !open });
  }, [open]);

  const value = useMemo(
    () => ({
      open,
      handleSidebarToggle,
    }),
    [handleSidebarToggle, open]
  );

  useEffect(() => {
    const body = document.querySelector("body");
    const resizeWindow = () => {
      if (body) {
        window.innerWidth <= 768
          ? body.setAttribute("data-sidebar-style", "overlay")
          : body.setAttribute("data-sidebar-style", "full");
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
