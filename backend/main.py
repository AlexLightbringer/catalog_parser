from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create the model for store users
class User(BaseModel):
    _id: str
    username: str
    email: str
    password: str
    selected_categories: List[str]

# set the db
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["parser-db"]
collection = db["users"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# create the user
@app.post("/users", response_model=User)
async def create_user(user: User):
    check_user_exist = await collection.find_one({"email": user.email})
    if check_user_exist:
        raise HTTPException(status_code=400, detail="There is already a user with this email!")

    # hashing the passwd
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password

    if "selected_categories" not in user:
        user.selected_categories = []

    # save the user
    current_user = await collection.insert_one(user.dict())
    user._id = str(current_user.inserted_id)

    return user


@app.get("/users", response_model=List[User])
async def get_users():
    users = []
    async for user_data in collection.find():
        users.append(User(**user_data))
    return users


@app.put("/users", response_model=User)
async def update_user(user: User):
    current_user = await collection.find_one({"email": user.email})
    if current_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    await collection.update_one({"email": user.email}, {"$set": {"selected_categories": user.selected_categories}})

    updated_user = await collection.find_one({"email": user.email})

    return User(**updated_user)


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
