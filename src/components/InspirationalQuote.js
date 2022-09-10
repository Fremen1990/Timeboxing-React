import React, { useEffect, useState } from "react";
import Quote from "inspirational-quotes";

const InspirationalQuote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    import("inspirational-quotes")
      .then((Quote) => {
        setQuote(Quote.getQuote());
      })
      .catch(() => console.log("Couldn't load quote"));
  }, []);

  return (
    <>
      {quote ? (
        <figure>
          <blockquote> {quote.text}</blockquote>
          <figcaption>
            <cite>{quote.author}</cite>
          </figcaption>
        </figure>
      ) : (
        "..."
      )}
    </>
  );
};

export default InspirationalQuote;
