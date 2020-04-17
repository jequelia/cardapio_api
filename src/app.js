const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');


//configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/pratos', (req, res) =>{
  execSQLQuery('SELECT * FROM Pratos', res);
})

router.post('/pratos', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const preço = req.body.preço;
    const foto = req.body.foto.substring(0,11);
    execSQLQuery(`INSERT INTO Pratos(Nome, preço, fato) VALUES('${nome}','${preço}', '${foto}' )`, res);
})

router.delete('/pratos/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Pratos WHERE ID=' + parseInt(req.params.id), res);
})

//inicia o servidor
app.listen(port);

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'cardapio'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}