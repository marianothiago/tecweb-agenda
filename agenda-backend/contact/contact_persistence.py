from persistence.base_persistence import BasePersistence


class ContactPersistence(BasePersistence):

    def getSizeContacts(self):
        sizeContacts = self.getRecord("select count(*) from contacts")
        return sizeContacts[0]

    def getAll(self, itensByPage, offset):
        params = [itensByPage, offset]
        return self.getRecordsByParameters("select id, email, name, phoneNumber from contacts LIMIT ? OFFSET ?", params)

    def getById(self, id):
        params = [id]
        return self.getRecordByParameter("select id, email, name, phoneNumber from contacts where id = ?", params)

    def save(self, email, name, phoneNumber):
        params = [email, name, phoneNumber]
        return self.runDMLCommand("insert into contacts (email, name, phoneNumber) values (?, ?, ?)", params)
    
    def update(self, id, email, name, phoneNumber):
        params = [email, name, phoneNumber, id]
        return self.runDMLCommand("update contacts set email = ?, name = ?, phoneNumber = ? where id = ?", params)
    
    def delete(self, id):
        params = [id]
        return self.runDMLCommand("delete from contacts where id = ?", params)

    def deleteAll(self):
        return self.runDMLCommand("delete from contacts", params)
