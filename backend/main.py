from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel


client = MongoClient("mongodb://localhost:27017/")
db = client["parser-db"]

app = FastAPI()
