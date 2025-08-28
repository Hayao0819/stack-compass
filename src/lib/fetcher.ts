export const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) {
    const errorBody = await r.json();
    throw new Error(`${r.status} Error: ${errorBody.message ?? r.statusText}`);
  }
  return r.json();
};
