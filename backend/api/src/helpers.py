import httpx

from backend.api.src.db.models import User


async def load_users(count: int = 1000) -> bool:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://randomuser.me/api/?results={count}")
            response.raise_for_status()
            results = response.json()["results"]

            to_upload = []
            for user in results:
                to_upload.append(
                    User(
                        name=user["name"]["first"],
                        surname=user["name"]["last"],
                        gender=user["gender"],
                        phone=user["phone"],
                        email=user["email"],
                        street_number=user["location"]["street"]["number"],
                        street_name=user["location"]["street"]["name"],
                        city=user["location"]["city"],
                        country=user["location"]["country"],
                        small_avatar=user["picture"]["thumbnail"],
                        big_avatar=user["picture"]["large"],
                    )
                )

            await User.bulk_create(to_upload, batch_size=100)
            print("\033[032mINFO\033[037m\t  Пользователи загружены успешно")
            return True
    except Exception as e:
        print(f"\033[031mERROR\033[037m\t  Пользователи не загружены: {e}")
        return False
