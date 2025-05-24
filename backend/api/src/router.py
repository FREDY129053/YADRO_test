from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse

import backend.api.src.service as UserService
from backend.api.src.schemas import FullUserData, Pagination

router = APIRouter(prefix="/api/users")


@router.get("/all", response_model=Pagination)
async def get_all_users(
    page: int = Query(ge=0, default=0), size: int = Query(ge=1, default=30)
):
    """### Получение страниц пользователей"""
    message = await UserService.get_user_page(page=page, size=size)

    return JSONResponse(content=message.message, status_code=message.status_code)


@router.get("/random")
async def get_random_user():
    """### Получение случайного пользователя"""
    message = await UserService.get_random_user()

    return message.message


@router.get(
    "/{id}", response_model=FullUserData, responses={404: {"detail": "user not found"}}
)
async def get_user(id: int):
    """### Получение данных о **конкретном** пользователе"""
    message = await UserService.get_user(id)
    if message.is_error:
        raise HTTPException(status_code=message.status_code, detail=message.message)

    return message.message


@router.post("/upload")
async def upload_users(count: int = Query(ge=1, default=30)):
    """### Добавление новых пользователей в базу данных"""
    message = await UserService.upload_users(count=count)
    if not message.is_error:
        raise HTTPException(status_code=message.status_code, detail=message.message)

    return JSONResponse(
        content={"message": message.message}, status_code=message.status_code
    )
