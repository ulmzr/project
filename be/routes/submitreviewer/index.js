"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;

      const sql =
         "UPDATE ppm SET  uid_kdept = ?, uid_klppm = ?, uid_kpk = ?, uid_reviewer = ? WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            data.kdeptSelected,
            data.klppmSelected,
            data.kpkSelected,
            data.reviewerSelected,
            data.id,
         ]);
         dbData = rows;
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};
