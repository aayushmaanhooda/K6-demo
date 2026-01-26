from sqlmodel import SQLModel, Field

class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    task: str
    description: str
    completed: bool = Field(default=False)


class TodoCreate(SQLModel):
    task: str
    description: str

class TodoUpdate(SQLModel):
    task: str
    completed: bool 
