import math
from typing import Any

from pydantic import BaseModel

import backend.api.src.repository as UserRepo
from backend.api.src.helpers import load_users


class Message(BaseModel):
    is_error: bool = False
    message: Any
    status_code: int = 200


async def get_user_page(page: int, size: int) -> Message:
    offset_min, offset_max = page * size, (page + 1) * size

    data, all_data_len = await UserRepo.get_all_users(offset_min, offset_max)
    return Message(
        message={
            "users": data,
            "info": {
                "page": page,
                "size": size,
                "total": math.ceil(all_data_len / size) - 1,
            },
        }
    )


async def get_user(id: int) -> Message:
    user = await UserRepo.get_user(user_id=id)
    if not user:
        return Message(is_error=True, message="user not found", status_code=404)

    return Message(message=user)


async def get_random_user() -> Message:
    user = await UserRepo.get_random()

    return Message(message=user)


async def upload_users(count: int) -> Message:
    is_loaded = await load_users(count)
    if not is_loaded:
        Message(is_error=True, message="cannot upload users", status_code=400)

    return Message(message="users uploaded")
