import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "dxcjf8vw",
  dataset: "production",
  apiVersion: "2021-08-14",
  token: "", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
