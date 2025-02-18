import fetcher from "@/lib/fetch";
import useSWR from "swr";

export const useGetPhotos = ({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { data, error, isLoading } = useSWR(
    `https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const result = {
    photos: data,
  };
  return { result, error, isLoading };
};
