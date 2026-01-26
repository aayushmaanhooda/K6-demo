from sqlmodel import SQLModel, Session, create_engine 
from dotenv import load_dotenv
import os

load_dotenv()

url  = os.getenv("DATABASE_URL")

engine = create_engine(url, echo=True)

def create_db_and_table():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

