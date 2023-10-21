import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppControlContext = createContext();

function AppControlProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [list, setList] = useState(false);
  const [savedPositions, setSavedPositions] = useLocalStorage([], "saved");

  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [mapPosition, setMapPosition] = useState([0, 0]);

  const [toggleBtn, setToggleBtn] = useState(false);

  return (
    <AppControlContext.Provider
      value={{
        modal,
        setModal,
        list,
        setList,
        savedPositions,
        setSavedPositions,
        location,
        setLocation,
        isLoading,
        setIsLoading,
        displayLocation,
        setDisplayLocation,
        weather,
        setWeather,
        mapPosition,
        setMapPosition,
        toggleBtn,
        setToggleBtn,
      }}
    >
      {children}
    </AppControlContext.Provider>
  );
}

function useAppControl() {
  const context = useContext(AppControlContext);
  if (context === undefined)
    throw new Error("AppControlContext was used outside the CarouselsProvider");
  return context;
}

export { AppControlProvider, useAppControl };
