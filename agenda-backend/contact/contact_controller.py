from contact.contact_persistence import ContactPersistence
from contact.contact import Contact
from flask import jsonify

from security.notations import loginRequired

class ContactBC:

    def __init__(self):
        self.contactPersistence = ContactPersistence()

    @loginRequired
    def getAll(self, page, itensByPage, offset):
        contacts = [{'id':contactTupla[0], 'email': contactTupla[1], 'name': contactTupla[2], 'phoneNumber': contactTupla[3]} for contactTupla in self.contactPersistence.getAll(itensByPage, offset)]
        sizeContacts = self.contactPersistence.getSizeContacts()
        return jsonify({
            'contacts': contacts,
            'size': sizeContacts,
            'page': page,
            'itensByPage': itensByPage,
            'sizePages': sizeContacts // itensByPage + (1 if sizeContacts % itensByPage > 0 else 0)
        }), 200
        return jsonify(contacts), 200

    @loginRequired
    def getById(self, id):
        contactTupla = self.contactPersistence.getById(id)
        contact = {'id':contactTupla[0], 'email': contactTupla[1], 'name': contactTupla[2], 'phoneNumber': contactTupla[3]}
        return jsonify(contact), 200

    @loginRequired
    def save(self, contact):
        if self.contactPersistence.save(contact.email, contact.name, contact.phoneNumber) > 0:
            return {"message":"contact saved successfully"}, 200
        return {"message":"could not save contact"}, 500

    @loginRequired
    def update(self, contact):
        if self.contactPersistence.update(contact.id, contact.email, contact.name, contact.phoneNumber) > 0:
            return {"message":"contact updated successfully"}, 200
        return {"message":"could not save contact"}, 500

    @loginRequired
    def delete(self, id):
        if self.contactPersistence.delete(id) > 0:
            return {"message":"contact deleted successfully"}, 200
        return {"message":"could not save contact"}, 500
    
    @loginRequired
    def deleteAll(self, id):
        if self.contactPersistence.deleteAll() > 0:
            return {"message":"contact deleted successfully"}, 200
        return {"message":"could not save contact"}, 500

        