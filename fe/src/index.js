import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { H1, RevealJS, Slide } from "@gregcello/revealjs-react";
import { Main, P } from "@gregcello/revealjs-react";

ReactDOM.render(
  <>
    <RevealJS
      plugins={[]}
      controls={false}
      controlsTutorial={false}
      controlsBackArrows="hidden"
      progress={false}
      slideNumber={false}
      showSlideNumber="print"
      hash={true}
      loop={true}
      shuffle={true}
      pause={false}
      autoPlayMedia={true}
      autoAnimateEasing="ease-in-out"
      autoSlide={3000}
      autoSlideStoppable={false}
      hideCursorTime={1000}
      width={100.0}
      height={100.0}
    >
      <Slide>
        <H1>
          <P>Hello, World!</P>
        </H1>
      </Slide>
      <Slide>
        <h1>
          <p>Hello, World!</p>
        </h1>
      </Slide>
      <Slide>3</Slide>
      <Slide>4</Slide>
      <Slide>5</Slide>
    </RevealJS>
  </>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
