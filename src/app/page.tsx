import { PhotoGallery } from "@/components/photo-gallery";
import { Sidebar } from "@/components/sidebar";

export default async function Home(props: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const searchParams = await props.searchParams;
  const query = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q;

  return (
    <div className="flex h-screen relative">
      <div className="hidden md:block xl:w-[336px] md:w-16 h-[100vh] outline outline-1 outline-gray-300 p-4">
        <Sidebar />
      </div>
      <PhotoGallery query={query} />
    </div>
  );
}
