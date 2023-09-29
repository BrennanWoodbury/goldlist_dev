from fastapi import FastAPI
from routers import goldlist
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(root_path="/api/v1")
app.include_router(goldlist.router, prefix="/goldlist")

origins = ["localhost:3000", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    expose_headers=["Content-Disposition"],
)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}
