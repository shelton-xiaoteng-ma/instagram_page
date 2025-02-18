"use client";

import { useGetPhotos } from "@/hooks/use-get-photos";
import { PhotoData } from "@/lib/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { BiSolidMessageRounded } from "react-icons/bi";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

const PAGESIZE = 10;

export const PhotoGallery = ({ query }: { query: string | undefined }) => {
  const photosRef = useRef<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { result: data, isLoading } = useGetPhotos({
    page,
    pageSize: PAGESIZE,
  });

  useEffect(() => {
    if (data?.photos && !isLoading) {
      if (page === 1) {
        photosRef.current = data.photos;
      } else {
        photosRef.current = [...photosRef.current, ...data.photos];
      }
      setHasMore(data.photos.length >= PAGESIZE);
    }
  }, [data.photos, page, isLoading]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const bottom =
        e.currentTarget.scrollHeight ===
        e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      if (bottom && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [isLoading, hasMore]
  );

  return (
    <main
      className="flex flex-1 flex-col items-center justify-start w-full h-[100vh] 
          max-h-[1200px] overflow-y-auto 
          max-w-screen-lg mx-auto 
          px-5 py-6"
      onScroll={handleScroll}
    >
      <div className="flex flex-row justify-between items-center h-10 w-full px-2">
        <h1 className="sticky top-0 z-10 font-bold text-xl bg-white w-full pt-6">
          {query ? query : "#houseplants"}
        </h1>
        <Button variant="ghost">
          <BsThreeDotsVertical className="h-4" />
        </Button>
      </div>
      <div className="w-full h-full flex justify-center py-6">
        <div className="grid grid-cols-3 gap-1 max-w-screen-lg">
          {photosRef.current.map((photo, index) => (
            <Card
              className={cn(
                "relative group cursor-pointer rounded-lg",
                index === 1 ? "col-span-2 row-span-2" : "col-span-1"
              )}
              key={index}
            >
              <Image
                width={index === 1 ? 316 * 2 : 316}
                height={316}
                src={`https://picsum.photos/id/${photo.id}/316/316.jpg`}
                alt={photo.author}
                className="object-cover"
              />
              <CardContent className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CardTitle className="text-white text-lg font-semibold flex items-center justify-between space-x-4">
                  <div className="flex items-center">
                    <GoHeartFill className="mr-4" /> <span>20</span>
                  </div>
                  <div className="flex items-center">
                    <BiSolidMessageRounded className="mr-4" /> <span>30</span>
                  </div>
                </CardTitle>
              </CardContent>
              <div className="absolute inset-0 bg-transparent group-hover:shadow-xl group-hover:shadow-red transition-shadow duration-300 rounded-lg"></div>
            </Card>
          ))}
        </div>

        {isLoading && <Loader2 className="animate-spin size-10 mx-auto" />}
      </div>
    </main>
  );
};
