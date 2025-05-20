import sqlite3

DATABASE_FILE="./database/phonebook.db"

# conectando...
conn = sqlite3.connect(DATABASE_FILE)

# definindo um cursor
cursor = conn.cursor()

# criando as tabelas
cursor.execute("""
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(30) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL
);
""")
print('Contacts table created successfully.')
conn.commit()
# desconectando...
conn.close()
