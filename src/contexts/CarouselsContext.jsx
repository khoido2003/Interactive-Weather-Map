import { createContext, useContext, useState } from "react";

const CarouselContexts = createContext();

const content = [
  {
    id: 1,
    img: "/carousels/carousel1.png",
    title: "Interactive Excellence",
    description:
      "Our weather map isn't just a tool; it's an adventure. We've designed it to be intuitive, responsive, and visually captivating. With easy-to-use features and smooth navigation, you'll find exploring weather patterns a delightful experience.",
    btnText: "Let's begin our journey🌚",
  },

  {
    id: 2,
    img: "/carousels/carousel3.png",
    title: "Continuous Innovation",
    description:
      "Weather is ever-changing, and so are we. Our team of dedicated meteorologists and developers constantly strive to enhance your experience. Expect regular updates, new features, and even more ways to connect with weather through our platform.",
    btnText: "We're waiting you here😙",
  },

  {
    id: 3,
    img: "/carousels/carousel5.png",
    title: "About Our Interactive Weather Map",
    description:
      "Welcome to SkyCrafters, your go-to source for up-to-the-minute weather information. Our mission is to provide you with the most accurate and comprehensive weather data, empowering you to make informed decisions for your daily activities, travel plans, and more.",
    btnText: "Using the map 😍",
  },
  {
    id: 4,
    img: "/carousels/carousel2.png",
    title: "Precision and Reliability",
    description:
      "Your trust is our utmost priority. Our team of dedicated meteorologists and data experts work tirelessly to ensure our weather information is precise and dependable. We harness cutting-edge technology and data sources to provide you with the most trustworthy forecasts and observations.",
    btnText: "Start here!",
  },

  {
    id: 5,
    img: "/carousels/carousel4.png",
    title: "Community Engagement",
    description:
      "Join our weather-loving community, where you can share your weather observations, tips, and experiences with fellow users. Together, we can stay informed and prepared.",
    btnText: "Join us!",
  },
];

function CarouselsProvider({ children }) {
  const [curSlide, setCurSlide] = useState(2);

  function handleClickRight() {
    if (curSlide > 4) return;
    setCurSlide((i) => i + 1);
  }

  function handleClickLeft() {
    if (curSlide < 0) return;
    setCurSlide((i) => i - 1);
  }

  return (
    <CarouselContexts.Provider
      value={{
        content,
        curSlide,
        setCurSlide,
        handleClickLeft,
        handleClickRight,
      }}
    >
      {children}
    </CarouselContexts.Provider>
  );
}

function useCarousels() {
  const context = useContext(CarouselContexts);
  if (context === undefined)
    throw new Error("CarouselsContext was used outside the CarouselsProvider");
  return context;
}

export { CarouselsProvider, useCarousels };
