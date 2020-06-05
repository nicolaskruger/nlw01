

//importar db

const db = require("./database/db");

//apoś iniciar o projeoo e instalar o express
// é hora de iniciar o servidor
const express = require("express");
const server = express();
//configurar pasta public
server.use(express.static("public"));

//habilitar o uso do req body
server.use(express.urlencoded({extended: true}));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views",{
    express: server,
    noCache: true,//sem cache
});
//req: requisição
//res: resposta
server.get("/",(req,res)=>{
    //res.send("ola gay");
    return res.render("index.html");
});

server.post("/savepoint",(req,res)=>{
    console.log(req.body);

    const query=`
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);`;
    const values= [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];
    function afterInsertData(err){
            if (err){
                console.log(err);
                return res.send("erro no cadastro")
            }
            console.log("cadatrado com sucesso");
            console.log(this);

            return res.render("create-point.html",{
                saved: true,

            });
    }
    db.run(query, values,afterInsertData);
    
    //return res.send("ok");
});


server.get("/create-point",(req,res)=>{
    //res.send("ola gay");
    
    return res.render("create-point.html",{
        nome: "volta para home"
    });
});
server.get("/search",(req,res)=>{
    //res.send("ola gay");
    const search = req.query.search;
    if(search==""){
        return res.render("search.html",{
            nome: "volta para home",}); 
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
            if(err){
                return console.log(err);
            }
            //console.log("aqui estão seus registros: ")
            //console.log(rows);
            return res.render("search.html",{
                nome: "volta para home",
                places: rows,
            });
    });
    
});




server.listen(3000);