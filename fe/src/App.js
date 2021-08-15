import React, { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import client from "./utils/useSanity";
import useGetFigures from "./utils/useGetFigures";
import { Slide, P, useReveal, H1, RevealJS } from "@gregcello/revealjs-react";
import { useQuery } from "react-query";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

function App() {
  const imgSlides = useQuery(
    "imgSlides",
    async () => await client.fetch(`*[_type == "figure"]{_id, image}`)
  );
  const textSlides = useQuery(
    "textSlides",
    async () => await client.fetch(`*[_type == "text"]{_id, text}`)
  );

  return (
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
        width={"100%"}
        height={"100%"}
      >
        <Slide>
          <H1>
            <P>Hello, World!</P>
          </H1>
        </Slide>
        {imgSlides.data?.map((fig) => (
          <Slide key={fig._id}>
            <img
              style={{ maxWidth: "100%" }}
              src={urlFor(fig.image.asset._ref).url()}
              alt=""
            />
          </Slide>
        ))}
        {textSlides.data?.map((fig) => (
          <Slide key={fig._id}>
            <P>
              <BlockContent blocks={fig.body} serializers={serializers} />
            </P>
          </Slide>
        ))}
      </RevealJS>
    </>
  );
}

export default App;
