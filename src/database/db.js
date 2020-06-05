//importar a denpendecia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciar objeto de banco de dados

const db =new sqlite3.Database("./src/database/database.db");


module.exports = db;

 //utilizar o objeto de banco de dados para nossas aplicações

// db.serialize(()=>{
    //com comandos sql

    // //1. criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT 
    //     );
    // `)
    // //2. inserir dados na tabela
    // const query=`
    //     INSERT INTO places(
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);`;
    // const values= [
    //     "https://images.unsplash.com/photo-1558583055-d7ac00b1adca?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
    //     "Papersider",
    //     "Guilerme Genbala, Jardim América",
    //     "número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ];
    // function afterInsertData(err){
    //     if (err){
    //         return console.log(err);
    //     }
    //     console.log("cadatrado com sucesso");
    //     console.log(this);
    // }
    // db.run(query, values,afterInsertData);
    //3. consultar dados da tabela
    // db.all(`SELECT * FROM places`,function(err,rows){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("aqui estão seus registros: ")
    //     console.log(rows);
    // });
    //4. deletar dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`,[1],(err)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("registro deletado com sucesso!"); 
    // })
 //});