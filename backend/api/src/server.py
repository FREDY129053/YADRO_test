# Здесь собирается приложение(app) из роутеров, инициализации БД и т.д.
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.src.db import init_db_tortoise
from backend.api.src.helpers import load_users
from backend.api.src.router import router


# Это инициализирует БД до запуска приложения(параметр lifespan)
@asynccontextmanager
async def lifespan(_app: FastAPI):
    await init_db_tortoise(_app)
    await load_users()
    yield


def create_app() -> FastAPI:
    _app = FastAPI(
        title="Random User API",
        docs_url="/docs",
        lifespan=lifespan,
    )

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(router=router)

    return _app


app = create_app()
