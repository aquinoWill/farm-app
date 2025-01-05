"use client";

import React, { createContext, useContext, useState } from "react";
import { type RegistryFormTypes } from "@/hooks";

const initialState: FarmsContextProps = {
  farms: [],
  filterFarms: [],
  setFarms: () => {},
  setFilterFarms: () => {},
};

interface FarmsContextProps {
  farms: RegistryFormTypes[];
  filterFarms: RegistryFormTypes[];
  setFarms: (farms: RegistryFormTypes[]) => void;
  setFilterFarms: (value: RegistryFormTypes[]) => void;
}

const FarmsContext = createContext<FarmsContextProps>(initialState);

export const useFarms = () => {
  const context = useContext(FarmsContext);
  if (!context) {
    throw new Error("useFarms must be used within a FarmsProvider");
  }
  return context;
};

export const FarmsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [farms, setFarms] = useState<RegistryFormTypes[]>([]);
  const [filterFarms, setFilterFarms] = useState<RegistryFormTypes[]>([]);

  return (
    <FarmsContext.Provider value={{ farms, filterFarms, setFarms, setFilterFarms }}>
      {children}
    </FarmsContext.Provider>
  );
};

export default FarmsProvider;
