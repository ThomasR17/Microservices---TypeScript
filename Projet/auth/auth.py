## IMPORT ##

import json
import random

from flask import Flask, request, jsonify, make_response

############
app = Flask(__name__)

PORT = 5000
HOST = 'localhost'


with open('{}/databases/users.json'.format("."), "r") as jsf:
   users = json.load(jsf)["users"]

############

@app.route("/", methods=['GET'])
def homepage() :
   return "<h1>Welcome to the Authentification service</h1>"

@app.route("/users", methods=['GET'])
def show_users() :
   return make_response(jsonify(users), 200)

@app.route("/user/<username>", methods=['GET'])
def show_user(username) :
   for user in users :
      if user["username"] == username :
         return make_response(jsonify(user), 200)
   return make_response(jsonify({"error": "bad input parameter"}), 400)

#input: username, password
@app.route("/user", methods=['POST'])
def create_user() :
   if request.args :
      req = request.args
      for user in users :
         if user["username"] == req["username"] :
            return make_response(jsonify({"error": "bad input parameter"}), 400)
      users.append({"username":req["username"],"password":req["password"]})
      return make_response("user created", 200)
   return make_response(jsonify({"error": "bad input parameter"}), 400)

#input: username newUsername et/ou newPassword
@app.route("/user", methods=['PUT'])
def update_user() :
   if request.args :
      req = request.args
      for user in users :
         if user["username"] == req["username"] :
            users.append({"id":req["new_id"],"name":req["new_name"],"last_active":int(user["last_active"])})
            users.remove(user)
            return make_response("user updated", 200)
   return make_response(jsonify({"error": "bad input parameter"}), 400)



if __name__ == "__main__" :
   print("Server running in port %s"%(PORT))
   app.run(host=HOST, port=PORT)