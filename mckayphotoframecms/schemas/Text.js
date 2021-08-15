export default {
  title: "Rich Text",
  name: "richText",
  type: "document",
  fields: [
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
