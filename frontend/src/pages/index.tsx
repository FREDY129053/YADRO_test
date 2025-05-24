import React, { useCallback, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchAllUsers, loadUsers } from "./api/users";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";

export default function Home() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery("post", fetchAllUsers, {
      getNextPageParam: (lastPage) => lastPage.page,
    });

  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.results) : []),
    [data]
  );

  const [count, setCount] = useState<number | undefined>(undefined)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const observer = useRef<IntersectionObserver>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetching, fetchNextPage]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, count: number | undefined) => {
    e.preventDefault()
    if (!count) {
      setErrorMsg("Введите число!")
    }

    setIsUploading(true)
    loadUsers(count!).then((msg) => {setCount(undefined); alert(msg)}).catch((err) => alert(err))
  }

  if (isLoading) return <Loading />;

  if (error) return <h1>Couldnt fetch data</h1>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <form className="w-full flex flex-col gap-2 items-center justify-center" onSubmit={(e) => handleSubmit(e, count)}>
        <input
          className="w-1/2 bg-white/10 border border-white/10 rounded-xl px-4 py-2 outline-none text-white placeholder-white/50 focus:ring-2 focus:ring-[#ffce00]"
          type="number"
          value={count === undefined ? "" : count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
          min={1}
          placeholder="Введите кол-во человек"
        />
        <span className="text-sm min-h-4 text-red-400">{errorMsg}</span>
        <button
          type="submit"
          disabled={!count || isUploading}
          className="w-1/2 cursor-pointer mt-2 bg-[#ffce00] hover:bg-[#ffd836] text-[#1c1c1c] font-semibold rounded-2xl px-6 py-3 transition disabled:cursor-not-allowed disabled:bg-[#ffe28c] disabled:text-[#9e9e9e]"
        >
          Загрузить пользователей
        </button>
      </form>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {flattenedData.map((user, i) => (
          <Link href={`/${user.id}`} key={user.id}>
            <div
              className="bg-white/5 border border-white/10 rounded-xl shadow-md shadow-black/20 p-5 transition hover:shadow-xl hover:scale-103"
              ref={flattenedData.length === i + 1 ? lastElementRef : null}
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <Image
                    src={user.small_avatar}
                    alt={user.name}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white text-xl w-full font-bold break-words">
                  <h2>
                    {user.name} {user.surname}
                  </h2>
                  <span className="text-[#ffce00] text-sm uppercase">
                    {user.gender}
                  </span>
                  <div className="bg-white/10 rounded-lg mt-2 p-3 flex flex-col gap-1">
                    <span className="text-white/80 text-base">
                      <b>Телефон:</b> {user.phone}
                    </span>
                    <span className="text-white/80 text-base">
                      <b>Email:</b> {user.email}
                    </span>
                    <span className="text-white/80 text-base">
                      <b>Адрес:</b> {user.street_name} {user.street_number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {isFetching && <div className="text-center text-[#ffce00]">Fetching more data</div>}
    </div>
  );
}
