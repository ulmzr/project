const path = require("path");
const cwd = process.cwd();

const port = 10443;
const host = "0.0.0.0";

const fastify = require("fastify")({
   logger: true,
   // logger: {
   //    level: "error",
   // },
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, "plugins"),
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, "routes"),
});

async function run() {
   try {
      await fastify.listen({ port, host });
   } catch (err) {
      fastify.log.error(err);
   }
}

run();
