import React, { useEffect, useState } from 'react'
import { IUser } from '@/interfaces/user';
import { getRandomUser } from './api/users';
import UserCard from '@/components/UserCard';

export default function Random() {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    getRandomUser().then(setUser).catch(console.error)
  }, [])

  const click = () => {
    getRandomUser().then(setUser).catch(console.error)
  }

  return (
    <UserCard user={user} isRandom={true} onClick={click} />
  )
}
