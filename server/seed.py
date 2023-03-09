from app import app
from models import db, Todo, User

db.drop_all()
db.create_all()

#Some psql commands

#This empties table Model User
# db.session.query(User).delete()
# db.session.commit()
# u1 = User(username='rama', password='pass')
# db.session.add_all([u1])
# db.session.commit()

# t1 = Todo(
#     task_name="Make Bread", complete=True, username='rama1'
# )
# t2 = Todo(
#     task_name="Do Laundary", complete=False, username='rama1'
# )

# db.session.add_all([t1, t2])
# db.session.commit()
