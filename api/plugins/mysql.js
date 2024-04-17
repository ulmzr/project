"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
   fastify.register(require("@fastify/mysql"), {
      // connectionString: "mysql://lppmuisi:lppmuisi2024@localhost/u1563581_lppmuisi",
      connectionString: "mysql://root@localhost/mydb",
      promise: true,
   });
});
