import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaArrowCircleUp } from "react-icons/fa";
import "./ScrollButton.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

  return (
    <button aria-label="Scroll-to-top Button" className="scrollButton">
      <IconContext.Provider value={{ className: "scrollButton__icon" }}>
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
        />
      </IconContext.Provider>
    </button>
  );
}

export default ScrollButton;

/*uses state hook to create a visibility state variable
initialised as false.

Toggilevisible function updates the visible state based on user
scroll position, if scroll position is greater than 300px, sets
visible to true

Scrolltotop function is triggered when button is clicked by using window.scroollto
to smoothly scroll the page to the top

 if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

the scroll button component you provided, the conditional
 check if (typeof window !== "undefined") is used to make sure
  that the event listener for the scroll event is only added when the code is running in a browser environment (i.e., on the client side) and not during server-side rendering (SSR).


Rendering
returns the button class scrollbutton
iconcontext.provider is used to provide stlying info
(so we can style icons within the provided scope)

for visibility it either sets the icon as true otherwise none

*/