import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [jokeiD, setJokeiD] = useState("");
  const [nextJoke, setNextJoke] = useState("");
  const [error, setError] = useState("");
  const [width, setWidth] = useState(0);

  const handleJoke = () => {
    setError("");
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        const {
          data: {
            slip: { advice },
          },
        } = res;

        const {
          data: {
            slip: { id },
          },
        } = res;
        console.log(advice);
        setJoke(advice);
        setJokeiD(id);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Make sure you're connected to the internet");
        } else {
          setError("Something went wrong");
        }
      });
  };

  useEffect(() => {
    handleJoke();
  });

  return (
    <>
      <div className={error === "" ? "error" : "error move-down"}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
        </svg>
        {error}
      </div>
      <main>
        <div className="container">
          <h1>
            ADVICE <span>#</span> {117}
          </h1>
          <div className="joke-div">
            {/* <p>{joke}</p> */}
            <p>
              {joke ||
                "It is easy to sit up andi take notice, what's difficultt is getting up and taking action."}
            </p>
          </div>
          <div className="divider"></div>
          <button onClick={handleJoke}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
              />
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
