
from contact.contact_controller import ContactBC
from flask import Blueprint, request
from contact.contact import Contact

contactRoutes = Blueprint("contact", __name__)
contactBC = ContactBC()

@contactRoutes.route("/api/v1/contact")
def getAll():
    try:
        if "Authorization" in request.headers:
            return contactBC.getAll(request.headers["Authorization"])
        else:
            return {"message":"no permission"}, 401
    except Exception as error:
        return str(error), 500

@contactRoutes.route("/api/v1/contact", methods=['POST'])
def save():
    try:
        if "Authorization" in request.headers:
            if request.json and "email" in request.json and "name" in request.json and "phoneNumber" in request.json:
                contact = Contact(0, **request.json)
                return contactBC.save(request.headers["Authorization"], contact)
            else:
                return {"message":"Some parameter is missing"}, 200
        else:
            return {"message":"no permission"}, 401
    except Exception as error:
        return str(error), 500

@contactRoutes.route("/api/v1/contact/<string:id>", methods=['PUT'])
def update(id):
    try:
        if "Authorization" in request.headers:
            if request.json and "email" in request.json and "name" in request.json and "phoneNumber" in request.json:
                contact = Contact(id, **request.json)
                return contactBC.update(request.headers["Authorization"], contact)
            else:
                return {"message":"Some parameter is missing"}, 200
        else:
            return {"message":"no permission"}, 401
    except Exception as error:
        return str(error), 500

@contactRoutes.route("/api/v1/contact/<string:id>", methods=['DELETE'])
def delete(id):
    try:
        if "Authorization" in request.headers:
            return contactBC.delete(request.headers["Authorization"], id)
        else:
            return {"message":"no permission"}, 401
    except Exception as error:
        return str(error), 500

@contactRoutes.route("/api/v1/contact", methods=['DELETE'])
def deleteAll():
    try:
        if "Authorization" in request.headers:
            return contactBC.deleteAll(request.headers["Authorization"])
        else:
            return {"message":"no permission"}, 401
    except Exception as error:
        return str(error), 500