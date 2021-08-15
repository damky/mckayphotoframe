import React from "react";
import BlockContent from "@sanity/block-content-to-react";
// import imageUrlBuilder from "@sanity/image-url";
import client from "./utils/useSanity";
import { Slide, P, H1, RevealJS } from "@gregcello/revealjs-react";
import { useQuery } from "react-query";

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

function App() {
  const imgSlides = useQuery(
    "imgSlides",
    async () => await client.fetch(`*[_type == "sanity.imageAsset"]{_id, url}`)
  );
  const textSlides = useQuery(
    "textSlides",
    async () => await client.fetch(`*[_type == "richText"]`)
  );
  const videoSlides = useQuery("video", async () =>
    client.fetch(`*[_type == "sanity.fileAsset"]`)
  );
  const youTubeSlides = useQuery("youTube", async () =>
    client.fetch(`*[_type == "youTube"]`)
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
        autoSlide={6000}
        autoSlideStoppable={false}
        hideCursorTime={1000}
        width={"100%"}
        height={"100%"}
        margin={0}
      >
        <Slide>
          <H1>
            <P>Hello, World!</P>
          </H1>
        </Slide>
        {imgSlides.data?.map((fig) => (
          <Slide key={fig._id} backgroundColor="#000">
            <img
              style={{ maxWidth: "100%", maxHeight: "100vh", margin: 0 }}
              // src={urlFor(fig.image.asset._ref).url()}
              src={fig.url}
              alt=""
            />
          </Slide>
        ))}
        {videoSlides.data?.map((vid) => (
          <Slide
            key={vid._id}
            backgroundVideo={vid.url}
            backgroundVideoMuted="true"
          ></Slide>
        ))}
        {youTubeSlides.data?.map((vid) => (
          <Slide
            key={vid._id}
            backgroundIframe={`https://www.youtube.com/embed/${
              vid.videoLink.match(/youtu\.be\/(.+)\/?/)[1]
            }?&autoplay=1&mute=1`}
          ></Slide>
        ))}
        {console.log(textSlides.data)}
        {textSlides.data?.map((fig) => (
          <Slide key={fig._id} backgroundColor="#000">
            <P>
              <BlockContent blocks={fig.body} />
            </P>
          </Slide>
        ))}
      </RevealJS>
    </>
  );
}

export default App;
