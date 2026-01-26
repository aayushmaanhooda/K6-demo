from fastapi import FastAPI, Depends, HTTPException
from contextlib import asynccontextmanager
from models import Todo, TodoCreate, TodoUpdate
from db import create_db_and_table, get_session
from logger import get_logger
from sqlmodel import Session, select

logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up....")
    create_db_and_table()
    yield
    logger.info("Shutting down...")

app = FastAPI(lifespan=lifespan)


@app.get("/")
def health():
    return {
        "message" : "Server runnning successfully"
    }

@app.post("/todo")
def create_todo(todo: TodoCreate, session: Session = Depends(get_session)):
    task = todo.task
    description = todo.description

    statement = select(Todo).where(Todo.task == task, Todo.description == description)
    result = session.exec(statement).first()

    if result:
        raise HTTPException(status_code=400, detail="Todo already exists")
    
    new_todo = Todo(task=task, description=description)
    session.add(new_todo)
    session.commit()
    session.refresh(new_todo)

    return {
        "message" : "Todo created sucessfully",
        "todo": new_todo
    }

@app.get("/todo")
def get_todo(session: Session = Depends(get_session)):
    statement = select(Todo)
    results = session.exec(statement)
    if not results:
        raise HTTPException(status_code=404, detail="No subscriber found")
    
    return {
        "message": "all todo",
        "todos": [res for res in results]
    }


@app.get("/todo/{id}")
def get_todo_byid(id: int , session: Session = Depends(get_session)):
    statement = select(Todo).where(Todo.id == id)
    result = session.exec(statement).first()
    if not result:
        raise HTTPException(status_code=404, detail="No todo found")
    
    return {
        "message": "Your todo",
        "todo": result
    }

@app.put("/todo/{id}")
def update_todo(id: int, todo: TodoUpdate , session: Session = Depends(get_session)):
    statement = select(Todo).where(Todo.id == id)
    result = session.exec(statement).first()
    if not result:
        raise HTTPException(status_code=404, detail="No todo found")

    result.completed = todo.completed
    session.add(result)
    session.commit()
    session.refresh(result)
    
    return {
        "message": "Todo updated successfully",
        "todo": result
    }



@app.delete("/todo/{id}")
def delete_todo(id: int, session:Session = Depends(get_session)):
    statement = select(Todo).where(Todo.id == id)
    result = session.exec(statement).first()

    if not result:
        raise HTTPException(status_code=404, detail="No todo found")
    
    session.delete(result)
    session.commit()

    return {
        "message": "Todo deleted",
        "todo": result
    }



if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", port=8080, host="localhost", reload=True)