const { collection } = require("forest-express-sequelize");

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection("userProfiles", {
  actions: [
    {
      name: "Register User",
      type: "global",
      endpoint: "/forest/actions/user/register",
      httpMethod: "POST",
      fields: [
        {
          field: "Email",
          description: "The Email for login to apps and broadcast information",
          type: "String",
          isRequired: true,
        },
        {
          field: "Name",
          description: "User fullname, name must capitilize",
          type: "String",
          isRequired: true,
        },
        {
          field: "Membership type",
          description: "this is about membership, please choose one",
          type: "Enum",
          enums: ["plus", "gold", "premium"],
          isRequired: true,
        },
        {
          field: "Gender",
          description: "this is about gender's user, please choose one",
          type: "Enum",
          enums: ["male", "female"],
          isRequired: true,
        },
      ],
    },
  ],
  fields: [],
  segments: [],
});
