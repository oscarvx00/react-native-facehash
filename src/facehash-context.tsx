import React, { createContext, useContext } from "react";
import type { Intensity3D, Shape, Variant } from "./core";

export interface FacehashContextValue {
  colors?: string[];
  size?: number | string;
  variant?: Variant;
  intensity3d?: Intensity3D;
  shape?: Shape;
  showInitial?: boolean;
  faceColor?: string;
}

const FacehashContext = createContext<FacehashContextValue>({});

export function FacehashProvider({
  children,
  ...value
}: FacehashContextValue & { children: React.ReactNode }) {
  return (
    <FacehashContext.Provider value={value}>
      {children}
    </FacehashContext.Provider>
  );
}

export function useFacehashContext(): FacehashContextValue {
  return useContext(FacehashContext);
}
