"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
   fastify.register(require("@fastify/jwt"), {
      secret: "rahasia",
      sign: {
         expiresIn: "1d",
      },
   });

   fastify.decorate("authenticate", async function (request, reply) {
      try {
         await request.jwtVerify();
      } catch (error) {
         reply.send(error);
      }
   });
});
