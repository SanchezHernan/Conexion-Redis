from flask import Flask, render_template, jsonify
import time
import json
import redis


app = Flask(__name__)

precio = 200

def connect_db():
    '''crear conexion a base de datos'''
    conexion = redis.StrictRedis(host='127.0.0.1', port=6379, db=1)
    if(conexion.ping()):
        print('conetado al servidor de redis')
    else:
        print('error...')
    return conexion

def db_almacenar(key, value):
    db = connect_db()
    db.set(key, value)

def db_get_list(nombre):
    db = connect_db()
    db.lpush(nombre, "luke, leia, han, chewbbaca")
    lista = db.lrange(nombre,0,-1)
    return { 'lista': lista}

def db_keys():
    db = connect_db()
    keys = []
    resp = []
    size = db.dbsize()
    for i in range(0, size):
        keys.append('Chapter '+str(i+1))
    for key in keys:
        txt = db.get(key).decode('utf-8')
        value = getSubStrings(txt)
        resp.append([key, value[0], value[1]])
    return resp

def db_get(key):
    db = connect_db()
    keys = db.get(key)
    x = getSubStrings(keys.decode("utf-8"))
    return x

def db_del(key):
    db = connect_db()
    db.delete(key)

def db_getset(episodio):
    db = connect_db()
    print(episodio[0])
    print(episodio[1])

def getkeys():
    db = connect_db()
    keys = db.keys('*')
    return {'keys': keys}

def getSubStrings(txt):
    pos=txt.find('|')
    a = (txt[:pos])
    b = (txt[pos+1:])
    return ([a, b])




#rutas
@app.route('/')
def index():
    """Retorna la pagina index."""   
    connect_db()
    return render_template('/index.html')

@app.route('/cargar/<key>/<value>')
def cargar(key, value):
    db_almacenar(key, value)
    return 'Cargado con exito'

@app.route('/verdatos')
def verdatos():
    datos = getkeys()
    return datos

@app.route('/ver/<key>')
def ver(key):
    datos = db_get(key)
    return datos

@app.route('/eliminar/<key>')
def eliminar(key):
    datos = db_del(key)
    return 'Eliminacion Exitosa'

@app.route('/cargarlista')
def cargarlista():
    lista = db_get_list("personajes")
    return lista

@app.route('/about')
def about():
    """Retorna la pagina about."""
    return 'About Python Flask'

@app.route('/alquilar')
def alquilar():
    lista = db_keys()
    return render_template('alquiler.html', lista=lista)

@app.route("/confirmar/<chapter>/<name>", methods=['POST'])
def confirmar(chapter, name):
    value = name+'|Reservado'
    db_almacenar(chapter, value)
    return render_template('confirmar.html', chapter=chapter, name=name, precio=precio)
    

@app.route('/alquilar/<chapter>/<name>/<estado>', methods=['POST'])
def back_alquilar(chapter, name, estado):
    value = name+estado
    db_almacenar(chapter, value)
    lista = db_keys()
    return render_template('alquiler.html', lista=lista)

@app.route("/cancelar/<chapter>/<name>")
def cancelar(chapter, name):
    value = name+'|Disponible'
    db_almacenar(chapter, value)
    return render_template('cancel.html')
    




if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)