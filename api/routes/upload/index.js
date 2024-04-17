("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get("/:randomFileName", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);

      const randomFileName = request.params.randomFileName;
      console.log(randomFileName);
      // let arr = judul.split(" ");
      // const username = decodedToken.username;
      // const filename =
      //    "rab-" +
      //    username +
      //    "_" +
      //    arr
      //       .map((str) => str.charAt(0))
      //       .join("")
      //       .toLowerCase() +
      //    ".xlsx";

      const filepath = path.join(
         __dirname,
         "../../../upload",
         randomFileName + ".xlsx"
      );

      try {
         const buffer = fs.readFileSync(filepath);
         reply.code(200);
         reply.send(buffer);
      } catch (error) {
         reply.code(404).send({ error });
      }
   });

   // Upload File
   fastify.post("/", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);

      const fileData = request.body.file;
      const randomFileName = request.body.randomFileName;
      // console.log(randomFileName);

      // const username = decodedToken.username;
      // let arr = judul.split(" ");
      // let filename =
      //    "rab-" +
      //    username +
      //    "_" +
      //    arr
      //       .map((str) => str.charAt(0))
      //       .join("")
      //       .toLowerCase() +
      //    ".xlsx";

      const filepath = "./upload/" + randomFileName + ".xlsx";

      try {
         const buffer = Buffer.from(fileData.data, "base64");
         fs.writeFileSync(filepath, buffer);
         reply.code(200);
         reply.send({ success: true, message: "File uploaded successfully" });
      } catch (error) {
         console.error("Error handling file upload:", error);
         reply
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
      }

      // const data = await request.file();
      // let title =
      //    "Metode penelitian menggunakan angka dan statistik dalam pengumpulan serta analisis data yang dapat diukur";
      // let arr = title.split(" ");
      // let namafile =
      //    "rab-" +
      //    username +
      //    "-" +
      //    arr
      //       .map((str) => str.charAt(0))
      //       .join("")
      //       .toLowerCase() +
      //    ".xlsx";

      // // const namafile = "test";
      // try {
      //    const buffer = await data.toBuffer();
      //    // const filepath = "./upload/rab-" + namafile + ".xlsx";
      //    const filepath = "./upload/" + namafile;
      //    fs.writeFileSync(filepath, buffer);
      //    reply.code(200);
      //    reply.send({
      //       msg: "Sukses",
      //    });
      // } catch (error) {
      //    console.log(error);
      //    reply.code(404);
      //    reply.send({
      //       error,
      //    });
      // }
   });
};
