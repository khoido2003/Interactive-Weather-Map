import { createContext, useContext } from "react";

const content = [
  {
    id: 1,
    title: "How do I navigate the interactive weather map?",
    description:
      "To navigate the map, simply use your mouse or touchpad to pan and zoom. Click on map markers for detailed weather information. Explore various map layers and settings in the menu for a customized experience.",
  },
  {
    id: 2,
    title: "Can I set my preferred location for weather updates?",
    description:
      "Yes, you can set your preferred location by searching for a city or entering your coordinates. You can also save multiple locations for quick access to their weather forecasts.",
  },
  {
    id: 3,
    title: "What browsers are supported?",
    description:
      "Our website is optimized for modern web browsers, including Chrome, Firefox, Safari, and Edge. Please ensure your browser is up-to-date for the best experience.",
  },
  {
    id: 4,
    title: "Is there a mobile app available?",
    description:
      "Currently, we offer a responsive mobile website that adapts to various devices. You can access our services on your smartphone or tablet without needing to install an app.",
  },
];

const SupportsContext = createContext();

function SupportProvider({ children }) {
  return (
    <SupportsContext.Provider value={{ content }}>
      {children}
    </SupportsContext.Provider>
  );
}

function useSupports() {
  const context = useContext(SupportsContext);
  if (context === "undefined")
    throw new Error("SupportsContext was used outside the SupportsProvider");
  return context;
}

export default SupportProvider;
export { useSupports };
