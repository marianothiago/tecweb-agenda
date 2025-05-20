
from user.InvalidUsernameOrPasswordException import InvalidUsernameOrPasswordException
from util.jwt_util import jwtEncode

class UserBC:

    def login(self, user):
        if user.username == "admin@gmail.com" and user.password == "passwd":
            return jwtEncode(user.username)
        raise InvalidUsernameOrPasswordException("username or password is invalid")