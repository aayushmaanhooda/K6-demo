from fastapi import FastAPI
from contextlib import asynccontextmanager
from models import Todo, TodoCreate, TodoUpdate
from db import create_db_and_table, get_session
from logger import get_logger


logger = get_logger(__name__)

@asynccontextmanager
def lifespan():
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


if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", port=8080, host="localhost", relaod=True)