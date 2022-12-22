import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

export default function NotesDetail() {
  const router = useRouter();
  const notesId = router.query.id as string;
  const { data: messageDetail, isLoading } = trpc.notes.detailNote.useQuery({
    id: notesId,
  });

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <main className="mx-auto flex min-h-screen flex-col justify-center py-10 md:container">
        <Link
          className="indigo-700 inline-block py-4 text-base font-semibold leading-7 text-green-700"
          href="/"
        >
          Go back
        </Link>
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-left sm:text-3xl">
          Note details
        </h1>
        <div className="flex flex-col rounded-lg bg-stone-100 p-5 text-xl">
          <div className="mb-5 text-sm">Note ID: {messageDetail?.id}</div>
          <h6 className="mb-5">Title: {messageDetail?.title}</h6>
          <p className="mb-5">Description: {messageDetail?.description}</p>
        </div>
      </main>
    </>
  );
}
