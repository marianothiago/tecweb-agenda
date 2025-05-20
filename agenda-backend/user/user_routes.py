from user.InvalidUsernameOrPasswordException import InvalidUsernameOrPasswordException
from user.user_controller import UserBC
from flask import Blueprint, request
from user.user import User


userRoutes = Blueprint("user", __name__)

@userRoutes.route("/api/v1/user/login", methods=['POST'])
def login():
    try:
        if 'username' in request.json and 'password' in request.json:
            username = request.json['username']
            password = request.json['password']
            if username and password:
                user = User(**request.json)
                userBC = UserBC()
                token = userBC.login(user)
                return {"token":token}, 200
            else:
                return {"message":"Parameters cannot be empty"}, 500
        else:
            return {"message":"Some parameter is missing"}, 500
    except Exception as error:
        return str(error), 500
    except InvalidUsernameOrPasswordException as error:
        return str(error), 401