"use client";

import { spotifyClient as spotifyClient } from "@/spotify/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category({ params: karams }) {
  const [response, setResponse] = useState();

  useEffect(() => {
    const effect = async () => {
      const resp = await spotifyClient.playlists.getPlaylistItems(karams.id);
      setResponse(resp);
    };
    effect();
  }, [karams.id]);

  return (
    <main className="flex flex-col items-center p-24">
      <div>
        {response &&
          response.items.map(({ track }) => (
            <Link
              key={track.id}
              href={`/playlists/${track.id}`}
              className="flex"
            >
              <img
                src={track.album.images[0].url}
                alt={`${track.name} playlist image`}
                priority
                width={150}
              />
              <div>{track.name}</div>
            </Link>
          ))}
      </div>
      <pre>{JSON.stringify({ params: karams }, null, 2)}</pre>
      <pre>{JSON.stringify({ response }, null, 2)}</pre>
    </main>
  );
}
