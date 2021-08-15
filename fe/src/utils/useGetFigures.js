import client from "./useSanity";

export default async function useGetFigures() {
  return await client.fetch(`*[_type == "figure"]{_id, image}`);
}
