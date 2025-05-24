import random
from unittest.mock import AsyncMock, patch

import httpx
import pytest

from ..src.schemas import FullUserData

BASE_API_URL = "http://localhost:8080/api/users"


# Проверка что данные загружены
@pytest.mark.asyncio
async def test_get_all_users():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_API_URL}/all?page=0&size=1000")
    assert response.status_code == 200
    assert len(response.json()["users"]) >= 1000


# Проверка получения пользователя: пользователь есть / пользователя нет
@pytest.mark.asyncio
async def test_get_user():
    async with httpx.AsyncClient() as client:
        response_good = await client.get(f"{BASE_API_URL}/{23}")
        response_bad = await client.get(f"{BASE_API_URL}/{9898989}")
    assert response_good.status_code == 200
    assert response_bad.status_code == 404


# Проверка рандом: все пользователи уникальные
@pytest.mark.asyncio
async def test_get_random():
    users = []
    n_random_users = 25
    async with httpx.AsyncClient() as client:
        for _ in range(n_random_users):
            response = await client.get(f"{BASE_API_URL}/random")
            result = response.json()
            users.append(FullUserData(**result))
    all_ids = [user.id for user in users]

    assert len(users) == n_random_users
    assert len(set(all_ids)) == n_random_users


# Моковый тест на втсавку данных из внешнего API
@pytest.mark.asyncio
async def test_insert():
    count = random.randint(-10, 2)

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = httpx.Response(
            status_code=200 if count > 0 else 422, json={}
        )

        async with httpx.AsyncClient(
            base_url="http://localhost:8080/api/users"
        ) as client:
            response = await client.post(f"/upload?count={count}")

        mock_post.assert_called_once()

        if count < 1:
            assert response.status_code == 422
        else:
            assert response.status_code == 200
