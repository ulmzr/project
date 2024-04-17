"use strict";

const { uid } = require("../../libs");

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // get detail user aka profile
   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;
      let dbData;
      let connection;

      if (idFromToken === id) {
         const sql = "SELECT * FROM profile WHERE uid = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
            dbData = rows;
            connection.release();
            reply.send({
               ...dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db profile",
            });
         }
      } else if (roleFromToken === "admin") {
         const sql = "SELECT * FROM profile WHERE uid = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
            dbData = rows;
            connection.release();
            reply.send({
               ...dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db profile",
            });
         }
      } else {
         reply.send({
            msg: "Anda tidak memiliki hak akses halaman ini",
         });
      }
   });

   // get users
   fastify.get("/", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      // const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;

      let dbData;
      const sql = "SELECT id, username, email, role, active FROM users";
      let connection;

      if (roleFromToken === "admin") {
         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, []);
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
      } else {
         reply.send({
            msg: "Anda tidak memiliki hak akses halaman ini",
         });
      }
   });

   // register user
   fastify.post("/", async function (request, reply) {
      // 1 code sesuai alur. Dianggap semua payload/kondisi === true
      // 2 Perangkap kesalahan
      // 3 Otorisasi
      let pesan = "Sukses!";
      const { username, email } = request.body;
      const sql = "INSERT INTO users (username, code, email) values(?, ?, ?)";
      let connection;

      try {
         const code = uid();
         // send code to email;
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [username, code, email]);
         connection.release();
         reply.send({
            pesan,
         });
      } catch (error) {
         if (error.code === "ER_DUP_ENTRY") {
            reply.code(409).send({
               msg: "User already exsists!",
               error,
            });
         }
      }
   });

   // patch/edit
   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;
      const sql = "UPDATE users SET active = ?, role = ? WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            data.active,
            data.role,
            data.id,
         ]);
         dbData = rows;
         connection.release();
         reply.send({
            data: dbData,
            msg: "berhasilss",
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};

function sendEmail(code, email) {
   //prosedur kirim email
}
