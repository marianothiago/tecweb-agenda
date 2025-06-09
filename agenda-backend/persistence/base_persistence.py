import sqlite3

class BasePersistence:

    def connect(self):
        self.conn = sqlite3.connect("./database/phonebook.db")
        self.cur = self.conn.cursor()

    def disconnect(self):
        self.cur.close()
        self.conn.close()

    def getRecordsByParameters(self, query, params):
        print(query)
        print(params)
        self.connect()
        self.cur.execute(query, (params))
        list = self.cur.fetchall()
        self.disconnect()
        return list

    def getRecord(self, query):
        self.connect()
        self.cur.execute(query)
        entity = self.cur.fetchone()
        self.disconnect()
        return entity

    def getRecordByParameter(self, query, params):
        self.connect()
        self.cur.execute(query, (params))
        entity = self.cur.fetchone()
        self.disconnect()
        return entity

    def getRecords(self, query):
        self.connect()
        self.cur.execute(query)
        list = self.cur.fetchall()
        self.disconnect()
        return list

    def runDMLCommand(self, comandoDML, params):
        self.connect()
        modifiedLinesNumber = self.cur.execute(comandoDML, (params)).rowcount
        self.conn.commit()
        self.disconnect()
        return modifiedLinesNumber
