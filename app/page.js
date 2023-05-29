"use client";
import { spotifyClient as spotifyClient } from "@/spotify/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [response, setCategories] = useState();

  useEffect(() => {
    const effect = async () => {
      const cat = await spotifyClient.browse.getCategories();
      setCategories(cat);
    };
    effect();
  }, []);

  console.log(">>>", response?.categories.items);

  return (
    <main className="flex flex-col items-center p-24">
      <div>
        {response &&
          response.categories.items.map((category) => (
            <Link
              key={category.id}
              href={`categories/${category.id}`}
              className="flex"
            >
              <img
                src={category.icons[0].url}
                alt={`${category.name} category image`}
                priority
              />
              <div>{category.name}</div>
            </Link>
          ))}
      </div>
      <pre>{JSON.stringify(response, null, 4)}</pre>
    </main>
  );
}
