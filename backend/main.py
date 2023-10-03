from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create the model for store users
class User(BaseModel):
    _id: str
    username: str
    email: str
    selected_categories: List[str]

# set the db
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["parser-db"]
collection = db["users"]


# create the user
@app.post("/users", response_model=User)
async def create_user(user: User):
    check_user_exist = await collection.find_one({"email": user.email})
    if check_user_exist:
        raise HTTPException(status_code=400, detail="There is already a user with this email!")

    current_user = await collection.insert_one(user.dict())
    user._id = str(current_user.inserted_id)

    return user


@app.get("/users", response_model=List[User])
async def get_users():
    users = []
    async for user_data in collection.find():
        users.append(User(**user_data))
    return users

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)