"use client";

import { spotifyClient } from "@/spotify/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category({ params }) {
  const [response, setResponse] = useState();

  useEffect(() => {
    const effect = async () => {
      const cat = await spotifyClient.browse.getPlaylistsForCategory(
        params.category
      );

      setResponse(cat);
    };
    effect();
  }, [params.category]);

  return (
    <main className="flex flex-col items-center p-24">
      <pre>{JSON.stringify({ params }, null, 2)}</pre>
      <div>
        {response &&
          response.playlists.items.map((playlist) => (
            <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
              <div>{playlist.name}</div>
              <img
                src={playlist.images[0].url}
                alt={`${playlist.name} playlist image`}
                priority
              />
            </Link>
          ))}
      </div>
      <pre>{JSON.stringify({ response }, null, 2)}</pre>
    </main>
  );
}
