"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // get all ppm where uidkdept/klppm/kpk === userid
   fastify.get("/:uid", async function (request, reply) {
      const uid = Number(request.params.uid);
      let dbData;
      let connection;
      const sql =
         "SELECT * FROM ppm WHERE uid_kdept = ? or uid_klppm = ? or uid_kpk = ? or uid_reviewer = ?";
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [uid, uid, uid, uid]);
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
