"use strict";

module.exports = async function (fastify, opts) {
   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;

      const sql =
         "UPDATE profile SET nama_lengkap = ?, uid = ?, nip = ?, nidn = ?, tempat_lahir = ?, tanggal_lahir = ?, alamat_rumah = ?, alamat_kantor = ?, nomor_handphone = ?, nomor_whatsapp = ?, perguruan_tinggi_asal = ?, program_studi = ?, jabatan_fungsional = ?, pangkat_golongan = ? WHERE id = ?";
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            data.nama_lengkap,
            data.uid,
            data.nip,
            data.nidn,
            data.tempat_lahir,
            data.tanggal_lahir,
            data.alamat_rumah,
            data.alamat_kantor,
            data.nomor_handphone,
            data.nomor_whatsapp,
            data.perguruan_tinggi_asal,
            data.program_studi,
            data.jabatan_fungsional,
            data.pangkat_golongan,
            data.id,
         ]);
         dbData = rows;
         connection.release();
         reply.send({
            sent: data,
            data: dbData,
            msg: "Berhasil menyimpan data baru!",
         });
      } catch (error) {
         reply.send({
            error,
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};
