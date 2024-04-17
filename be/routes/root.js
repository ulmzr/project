module.exports = async (fastify, opts) => {
   fastify.get("/", async (request, reply) => {
      reply.send({ root: "API" });
   });
};
