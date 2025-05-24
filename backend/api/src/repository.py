from typing import Optional
from random import randint
from backend.api.src.db.models import User


async def get_all_users(offset_min: int, offset_max: int):
    all_users = await User.all().values()
    return all_users[offset_min:offset_max], len(all_users)


async def get_user(user_id: int) -> Optional[User]:
    return await User.get_or_none(id=user_id)


async def get_random() -> User:
    all_users = await User.all()
    total_count = len(all_users)

    return all_users[randint(1, total_count - 1)]
