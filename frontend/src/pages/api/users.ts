import { AllResult, IUser } from "@/interfaces/user";
import { QueryFunction } from "react-query";

interface Result {
  results: IUser[]
  page: number | null
}

export const fetchAllUsers: QueryFunction<Result, "post"> = async ({ pageParam }) => {
  const page = pageParam ? pageParam : 0
  const response = await fetch(`http://localhost:8080/api/users/all?page=${page}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Ошибка при игр пользователя: ${response.statusText}`);
  }

  const data: AllResult = await response.json()

  console.log({
    results: data.users,
    page: data.users.length === 0 ? null : page + 1
  })

  return {
    results: data.users,
    page: data.users.length === 0 ? null : page + 1
  }
}

export async function getUser(id: number): Promise<IUser> {
  const res = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке пользователя: ${res.statusText}`);
  }

  const user: IUser = await res.json()

  return user
}

export async function getRandomUser(): Promise<IUser> {
  const res = await fetch(`http://localhost:8080/api/users/random`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке пользователя: ${res.statusText}`);
  }

  const user: IUser = await res.json()

  return user
}


export async function loadUsers(count: number): Promise<string> {
  const res = await fetch(`http://localhost:8080/api/users/upload?count=${count}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    return `Ошибка при загрузке пользователя: ${res.statusText}`;
  }

  return "Пользователи загружены!"
}
