from util.jwt_util import jwtDecode
from functools import wraps

def loginRequired(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            if len(args) > 1:
                decodedToken = jwtDecode(args[1])
                if not decodedToken:
                    return {"message":"invalid token"}, 401
                new_args = list(args)
                new_args.pop(1)
                args = tuple(new_args)
                return func(*args, **kwargs)
            return {"message":"token is missing"}, 401
        except Exception as err:
            return {"message":str(err)}, 401
    return wrapper
