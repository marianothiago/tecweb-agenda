from contact.contact_routes import contactRoutes
from user.user_routes import userRoutes
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(userRoutes)
app.register_blueprint(contactRoutes)
CORS(app)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)