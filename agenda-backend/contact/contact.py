class Contact:

    def __init__(self, id, email, name, phoneNumber):
        self.id = id
        self.email = email
        self.name = name
        self.phoneNumber = phoneNumber
    
    def __str__(self):
        return f"id: {self.id}, email: {self.email}, name: {self.name}, phoneNumber: {self.phoneNumber}"