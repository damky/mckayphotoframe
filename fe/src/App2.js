import React, { useState, useEffect } from "react";
import BlockContent from "@sanity/block-content-to-react";
import client from "./utils/useSanity";
import { useQuery } from "react-query";
import styled from "styled-components";

const Display = styled.div`
  font-family: Roboto;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Anton;
  }
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: #000;

  img {
    object-fit: contain;
    width: 100vw;
    height: 100vh;
  }
`;
const Item = styled(ItemGetter)`
  display: inherit;
`;

export default function App2() {
  const all_ids = useQuery(
    "all_ids",
    async () =>
      await client.fetch(`*[
      _type == "sanity.imageAsset" ||
      _type == "richText" ||
      _type == "sanity.fileAsset" ||
      _type == "youTube"
    ]`)
  );
  const shuffled_ids =
    all_ids.isSuccess &&
    JSON.stringify(
      all_ids.data.sort((a, b) => Math.random() - 0.5).map((item) => item._id)
    );
  const idsJson = shuffled_ids && JSON.parse(shuffled_ids);
  const [lineUp, setLineUp] = useState({ active: 0, staged: 1 });

  function ChangeUp() {
    useEffect(() => {
      let timer = setTimeout(() => {
        if (lineUp.staged === idsJson.length - 1) {
          setLineUp({ active: idsJson.length - 1, staged: 0 });
        } else if (lineUp.active === idsJson.length - 1) {
          setLineUp({ active: 0, staged: 1 });
        } else {
          setLineUp((prev) => ({
            active: prev.active + 1,
            staged: prev.staged + 1,
          }));
        }
      }, 10000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {console.log(lineUp)}
        {lineUp.active >= 0 && (
          <Item ids={idsJson} lineUp={lineUp} setLineUp={setLineUp} />
        )}
      </>
    );
  }

  return (
    <>
      <Display>
        <ChangeUp />
      </Display>
    </>
  );
}

function ItemGetter({ ids, lineUp }) {
  const activeItem = useQuery(
    "activeItem",
    async () => await client.fetch(`*[_id == "${ids[lineUp.active]}"]`)
  );

  return (
    <>
      {activeItem.isSuccess &&
        activeItem?.data[0]?._type === "sanity.imageAsset" && (
          <img src={activeItem.isSuccess && `https://damkymedia.mo.cloudinary.net/mckayPhotoFrame/${activeItem?.data[0]?.url.replace('https://cdn.sanity.io/images/dxcjf8vw/production/','')}`} alt="" />
        )}
      {activeItem.isSuccess && activeItem?.data[0]?._type === "youTube" && (
        <iframe
          title="youtube video"
          height="auto"
          width="100%"
          src={`https://www.youtube.com/embed/${
            activeItem.isSuccess &&
            activeItem?.data[0]?.videoLink.match(/youtu\.be\/(.+)\/?/)[1]
          }?&autoplay=1&mute=1`}
        ></iframe>
      )}
      {activeItem.isSuccess && activeItem?.data[0]?._type === "richText" && (
        <BlockContent
          blocks={activeItem.isSuccess && activeItem?.data[0]?.body}
        />
      )}
      {activeItem.isSuccess &&
        activeItem?.data[0]?.mimeType?.includes("video") && (
          <video
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            src={activeItem.isSuccess && activeItem?.data[0]?.url}
            alt=""
            width="100%"
          />
        )}
    </>
  );
}
