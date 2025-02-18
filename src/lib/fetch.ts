export default async function fetcher(...args: Parameters<typeof fetch>) {
  const [url, options] = args;

  const modifiedOptions = {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    mode: "cors" as RequestMode,
  };

  const res = await fetch(url, modifiedOptions);

  return res.json();
}
