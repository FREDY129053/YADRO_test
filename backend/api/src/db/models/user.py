from tortoise import fields
from tortoise.models import Model

from backend.api.src.enums import Gender


class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    surname = fields.CharField(max_length=100)
    gender = fields.CharEnumField(enum_type=Gender)
    phone = fields.CharField(max_length=20)
    email = fields.CharField(max_length=150)
    street_number = fields.IntField()
    street_name = fields.CharField(max_length=100)
    city = fields.CharField(max_length=100)
    country = fields.CharField(max_length=100)
    small_avatar = fields.CharField(max_length=200)
    big_avatar = fields.CharField(max_length=200)

    class Meta:
        ordering = ["id"]
