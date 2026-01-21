from fastapi import FastAPI, status
from datetime import datetime
from pydantic import BaseModel


class Users(BaseModel):
    name: str
    job: str


app = FastAPI()


@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: Users):
    username = user.name
    job = user.job

    return {
        "message": "User created successfully",
        "user": username,
        "job": job,
        "created_at": datetime.now().isoformat(),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)


# curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d '{"name": "John", "job": "Engineer"}'
