// module.exports = {
//   instances: [
//     {
//       app: "Employee",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:8082" // production endpoint IP/URL
//           : "http://3.111.116.96:8082",
//     },
//     {
//       app: "Roles",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:8081" // production endpoint IP/URL
//           : "http://3.111.116.96:8081",
//     },
//     {
//       app: "auth",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5000/" // production endpoint IP/URL
//           : "http://3.111.116.96:5000/",
//     },
//     {
//       app: "Customers",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5001/" // production endpoint IP/URL
//           : "http://3.111.116.96:5001/",
//     },
//     {
//       app: "UserReq",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5090/" // production endpoint IP/URL
//           : "http://3.111.116.96:5090/",
//     },
//     {
//       app: "Leads",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5002/" // production endpoint IP/URL
//           : "http://3.111.116.96:5002/",
//     },
//     {
//       app: "Hubs",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5003/" // production endpoint IP/URL
//           : "http://3.111.116.96:5003/",
//     },

//     {
//       app: "Products",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5004/" // production endpoint IP/URL
//           : "http://3.111.116.96:5004/",
//     },
//     {
//       app: "Inventory",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5005/" // production endpoint IP/URL
//           : "http://3.111.116.96:5005/",
//     },
//     {
//       app: "OrderRequest",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5090/" // production endpoint IP/URL
//           : "http://3.111.116.96:5090/",
//     },
//     {
//       app: "Masterinfo",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5007/" // production endpoint IP/URL
//           : "http://3.111.116.96:5007/",
//     },
//     {
//       app: "Vendors",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5009/" // production endpoint IP/URL
//           : "http://3.111.116.96:5009/",
//     },
//     {
//       app: "custominventory",
//       baseURL:
//         process.env.NODE_ENV !== "production"
//           ? "http://3.111.116.96:5099/" // production endpoint IP/URL
//           : "http://3.111.116.96:5099/",
//     },
//   ],
// };

module.exports = {
  instances: [
    {
      app: "Employee",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:8082" // production endpoint IP/URL
          : "http://localhost:8082",
    },
    {
      app: "Roles",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:8081" // production endpoint IP/URL
          : "http://localhost:8081",
    },
    {
      app: "auth",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5000/" // production endpoint IP/URL
          : "http://localhost:5000/",
    },
    {
      app: "Customers",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5001/" // production endpoint IP/URL
          : "http://localhost:5001/",
    },
    {
      app: "UserReq",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5090/" // production endpoint IP/URL
          : "http://localhost:5090/",
    },
    {
      app: "Leads",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5002/" // production endpoint IP/URL
          : "http://localhost:5002/",
    },
    {
      app: "Hubs",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5003/" // production endpoint IP/URL
          : "http://localhost:5003/",
    },

    {
      app: "Products",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5004/" // production endpoint IP/URL
          : "http://localhost:5004/",
    },
    {
      app: "Inventory",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5005/" // production endpoint IP/URL
          : "http://localhost:5005/",
    },
    {
      app: "OrderRequest",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5006/" // production endpoint IP/URL
          : "http://localhost:5006/",
    },
    {
      app: "Masterinfo",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5007/" // production endpoint IP/URL
          : "http://localhost:5007/",
    },
    {
      app: "Vendors",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5009/" // production endpoint IP/URL
          : "http://localhost:5009/",
    },
    {
      app: "custominventory",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5099/" // production endpoint IP/URL
          : "http://localhost:5099/",
    },
    {
      app: "purchaseOrder",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:6002/" // production endpoint IP/URL
          : "http://localhost:6002/",
    },
    {
      app: "GRN",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:6004/" // production endpoint IP/URL
          : "http://localhost:6004/",
    },
    {
      app: "PAYMENTS",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:6005/" // production endpoint IP/URL
          : "http://localhost:6005/",
    },
    {
      app: "MaterialRequest",
      baseURL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:6003/" // production endpoint IP/URL
          : "http://localhost:6003/",
    },
    // MaterialRequest
  ],
};
