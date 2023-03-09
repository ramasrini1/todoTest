from flask import Flask, request, jsonify, make_response, json
from sqlalchemy.exc import IntegrityError
from models import db, connect_db, Todo, todo_serializer, User
from flask_cors import CORS, cross_origin
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

CURR_USER_KEY = "curr_user"

## App Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todo1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
##############################################################################

connect_db(app)

def token_required(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    token = None
    if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            print(f'token is {token}')

    if not token:
      return jsonify({'message': 'Token is missing'}), 403
    try:
      data = jwt.decode(token, app.config['SECRET_KEY'])
      current_user = data['username']
      print(f'current user is {current_user}')
    except:
      return jsonify({'message': 'Token is invalid'}), 403
    
    return f(current_user, *args, **kwargs)
  
  return decorated

##############################################################################
# User signup/login

@app.route('/api/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    """Shows the todo by id """
    data = request.json
    try:
        user = User.signup( 
            username=data['username'], 
            password=data['password'] )
        
        db.session.add(user)
        db.session.commit()
    
    except IntegrityError:
        print("integrity error")
        return jsonify(msg='User already taken', status=400)
    
    return jsonify(msg='Registered User', status=200)

@app.route('/login', methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    """Handle user login."""

    data = request.json
    print("In Login ")
    print(f' data is {data}')

    u = data['username']
    p = data['password']
    print(f' username is {u} password is {p}')
    user = User.authenticate(u, p)
    
    if user:
        token = jwt.encode({
                    'username' : u,
                    'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=120)
                }, app.config['SECRET_KEY'] ).decode('utf-8')
        #data = jwt.decode(token, app.config['SECRET_KEY'])
        
        return jsonify(token=token, status=200)
    
    return jsonify(msg='Could not verify', status=400)

@app.route('/protected', methods=["POST"])
@token_required
def protected(current_user):
    """This is a test route to test authorization."""

    msg = f'You have permission to access this route'
    return jsonify(msg=msg, status=200)
   

@app.route('/api/todos', methods=['GET', 'POST'])
def getTodos():
    """Shows all todos get from db"""

    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route('/api/mytodos', methods=['GET', 'POST'])
@token_required
def getMyTodos(current_user):
    """Shows todos for current_user"""

    todos = Todo.query.filter_by(username=current_user)
    output = []
    for todo in todos:
        rows = {}
        rows['id'] = todo.id
        rows['task_name'] = todo.task_name
        rows['complete'] = todo.complete
        rows['username'] = current_user
        output.append(rows)

    return jsonify({'todos' : output})
    

@app.route('/api/add', methods=['POST'])
@token_required
def add(current_user):
    """Add toDo to db"""

    data = request.json
    task = data['task_name']
    print(f'In add task name is {task}')
    try:
        todo = Todo(task_name= data['task_name'], username=current_user)
        db.session.add(todo)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return { 'msg': 'Error in adding to DB', 'status':400}
    
    return { 'msg': 'todo created successfully', 'status':200}

@app.route('/api/<int:id>')
@token_required
@cross_origin(supports_credentials=True)
def getTodoById(current_user, id):
    """Shows the todo by id """

    todos = Todo.query.filter_by(id=id, username=current_user)
    output = []
    for todo in todos:
        rows = {}
        rows['id'] = todo.id
        rows['task_name'] = todo.task_name
        rows['complete'] = todo.complete
        rows['username'] = current_user
        output.append(rows)
    return jsonify({todos: output})

@app.route('/api/delete/<int:id>', methods=['POST'])
@token_required
def deleteTodo(current_user, id):
    """Deletes the todo by id """
    
    try:
        Todo.query.filter_by(id=id, username=current_user).delete()
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return { 'msg': 'Error in deleting from DB', 'status':400}
    return jsonify(msg ='Deleted successfully')

@app.route('/api/update/<int:id>', methods=['POST'])
@token_required
def updateTodo(current_user, id):
    """Updates the todo by id """

    data = request.json
    #t = Todo.query.get(id)
    t = Todo.query.filter_by(id=id, username=current_user).first()
    t.complete = data['complete']

    db.session.commit()
    return { '200': 'Updated successfully'}