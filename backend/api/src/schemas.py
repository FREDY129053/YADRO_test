from typing import List

from pydantic import BaseModel

from backend.api.src.enums import Gender


class BaseUserData(BaseModel):
    name: str
    surname: str
    gender: Gender
    phone: str
    email: str
    street_number: int
    street_name: str
    small_avatar: str


class FullUserData(BaseUserData):
    id: int
    city: str
    country: str
    big_avatar: str


class PagesData(BaseModel):
    page: int
    size: int
    total: int


class Pagination(BaseModel):
    users: List[FullUserData]
    info: PagesData
