var redis = require('redis')
var express = require('express')

var redis_cliente = redis.createClient(6379, 'db-redis')
var app = express()


redis_cliente.on('connect', function(){
    console.log("conectado a redis")
})


// redis_cliente.set("kylo", "ren")
// redis_cliente.set("luke", "skywalker")

// redis_cliente.get("kylo", function(err, value){
//     console.log(value)
// })
// redis_cliente.get("luke", function(err, value){
//     console.log(value)
// })
// redis_cliente.exists("darth", function(err, value){
//     console.log(value)
// })

// redis_cliente.lpush("personajes", ["luke", "yoda", "han", "chewbacca", "leia"])



app.get('/', function( req, res){
    redis_cliente.lrange('personajes', 0, -1, function(err, values){
        res.send(JSON.stringify(values))
    })
})

app.get('/cargar/:episodio/:personaje', function( req, res){
    const {episodio, personaje} = req.params;
    redis_cliente.lpush(episodio, personaje)
    res.send("Carga OK! ")
})

app.get('/listar/:episodio', function( req, res){
    const {episodio} = req.params;
    redis_cliente.lrange(episodio, 0, -1, function(err, values){
        res.send(JSON.stringify(values))
    })
})

app.get('/remove/:episodio/:count/:element', function( req, res){
    const {episodio, count, element} = req.params;
    redis_cliente.lrem(episodio, count, element)
    res.send('OK')
})



app.listen(3000, function(){
    console.log('Aplicación ejemplo, escuchando el puerto 3000!')
})