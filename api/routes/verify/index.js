"use strict";

module.exports = async function (fastify, opts) {
   // verify user
   fastify.post("/", async function (request, reply) {
      let { username, password, code } = request.body;

      try {
         const sql = "SELECT * FROM users WHERE username = ? AND code = ?";
         const connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [username, code]);
         if (rows.length === 1) {
            const sql2 =
               "UPDATE users SET password = ?, code = null, active = 1 WHERE username = ?";
            await connection.query(sql2, [password, username]);
            reply.send();
         } else {
            reply.code(204).send();
         }
         connection.release();
      } catch (error) {
         reply.send(error);
      }
   });
};
