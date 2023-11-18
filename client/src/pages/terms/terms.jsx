import React, { useState } from "react";

import "./terms.css";

const Terms = () => {
  // define state
  const [consent, setConsent] = useState(false);

  //Display terms and conditions based on consent state
  return (
    <section id='terms'>
      <h1>Terms and Conditions</h1>
      <div className="text-box">
        {consent ? (
          <>
            <p>Thank you! This will fund our next mega yacht.</p>
          </>
        ) : (
          <>
            <p>ALL YOUR DATA ARE BELONG TO US</p>
            <br />
            <p>You are the product, do you consent to us selling all your data?</p>
            <button onClick={() => setConsent(true)}>Yes</button>
            <button onClick={() => setConsent(true)}>YES!</button>
          </>
        )}
      </div>
    </section>
  );
};

export default Terms;
