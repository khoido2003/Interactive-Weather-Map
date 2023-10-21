import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

const content = [
  {
    id: 1,
    title: "Current Conditions",
    keyword: "Discover Real-Time Weather Data",
    details:
      "Explore the current weather conditions in your area and around the world. Our interactive map provides up-to-the-minute information on temperature, humidity, wind speed, and more. Stay informed and plan your day accordingly.",
  },

  {
    id: 2,
    title: "7-Day Forecast",
    keyword: "Plan Your Week Ahead",
    details:
      "Get a glimpse of the week ahead with our 7-day weather forecast. See how the weather is expected to change over the next week, so you can make informed decisions about your outdoor activities and travel plans.",
  },

  {
    id: 3,
    title: "Favorites",
    keyword: "Save Your Locations",
    details:
      "Save your favorite locations for quick access to their weather information. Whether it's your hometown or a dream vacation spot, easily keep tabs on the places that matter most to you.",
  },
];

function TabsProvider({ children }) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <TabsContext.Provider value={{ content, activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function useTabs() {
  const context = useContext(TabsContext);
  if (content === undefined)
    throw new Error("TabsContext was used outside the TabsProvider");
  return context;
}

export { TabsProvider, useTabs };
