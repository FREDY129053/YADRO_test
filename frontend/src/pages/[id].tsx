import React, { useEffect, useState } from 'react'

import { IUser } from '@/interfaces/user';
import { useRouter } from 'next/router';
import { getUser } from './api/users';
import UserCard from '@/components/UserCard';

export default function User() {
  const [id, setId] = useState<number | null>(null)
  const [user, setUser] = useState<IUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const userID = router.query.id as string
      setId(parseInt(userID!, 10))
    }
  }, [router])

  useEffect(() => {
    if (!id) return

    getUser(id).then(setUser).catch(console.error)
  }, [id])

  return (
    <UserCard user={user} />
  )
}
