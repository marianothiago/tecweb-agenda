from persistence.base_persistence import BasePersistence


class ContactPersistence(BasePersistence):

    def getAll(self):
        return self.getRecords("select id, email, name, phoneNumber from contacts")

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
