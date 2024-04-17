"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
   const db = createJsonDB("db");
   fastify.decorate("db", db);
});

function createJsonDB(name) {
   const fs = require("fs");
   const fsp = require("fs/promises");
   const path = require("path");
   const cwd = process.cwd();

   let $ = {};
   let utf8 = "utf8";
   let emptyObj = (obj) => Object.keys(obj).length === 0;
   let dbname = path.join(cwd, name + ".json");

   if (!fs.existsSync(dbname)) {
      fs.writeFileSync(dbname, "{}", utf8);
   }

   $.delete = async (tblname, opts = {}) => {
      let where = {};
      if (opts.hasOwnProperty("where")) where = opts.where;

      let currDB = JSON.parse(await fsp.readFile(dbname, utf8));

      if (!tblname && emptyObj(where)) {
         currDB = {};
      } else if (emptyObj(where)) {
         delete currDB[tblname];
      } else {
         currDB[tblname] = currDB[tblname].filter((row) => {
            let match = () => {
               for (const [key, value] of Object.entries(where)) {
                  return row[key] === value;
               }
            };
            return !match();
         });
      }
      return await fsp.writeFile(dbname, JSON.stringify(currDB, null, 3), utf8);
   };

   $.find = async (tblname, opts = {}) => {
      let where = {};
      if (opts.hasOwnProperty("where")) where = opts.where;

      try {
         const currDB = JSON.parse(await fsp.readFile(dbname, utf8));

         // if not exsists tblname
         if (!currDB.hasOwnProperty(tblname)) return [];

         if (!emptyObj(where)) {
            currDB[tblname] = currDB[tblname].filter((row) => {
               let match = () => {
                  for (const [key, value] of Object.entries(where)) {
                     return row[key] === value;
                  }
               };
               return match();
            });
         }
         return currDB[tblname];
      } catch (error) {
         return [];
      }
   };

   $.save = async (tblname, items, opts = {}) => {
      let where = {};
      let saved;
      let id = uid();

      if (opts.hasOwnProperty("where")) where = opts.where;

      try {
         let currDB = JSON.parse(await fsp.readFile(dbname, utf8));
         let table = currDB[tblname];
         if (table) {
            if (!emptyObj(where)) {
               Object.keys(table).forEach((row) => {
                  for (const [key, value] of Object.entries(where)) {
                     if (table[row][key] === value) {
                        saved = {
                           ...table[row],
                           ...items,
                        };
                        table[row] = saved;
                     }
                  }
               });
            } else {
               saved = {
                  id,
                  ...items,
               };
               table.push(saved);
            }
         } else {
            saved = {
               id,
               ...items,
            };
            Object.defineProperty(currDB, tblname, {
               value: [saved],
               enumerable: true,
               configurable: true,
               writable: true,
            });
         }

         try {
            fs.writeFileSync(dbname, JSON.stringify(currDB, null, 3), utf8);
            return saved;
         } catch (error) {
            return [];
         }
      } catch (error) {
         return [];
      }
   };

   return $;
}

function uid() {
   return Number(`${Date.now().valueOf()}`.slice(6));
}
