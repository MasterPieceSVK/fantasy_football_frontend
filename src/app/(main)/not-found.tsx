import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center flex-col gap-4 items-center">
      <h1>404 - Page Not Found</h1>
      <Link href={"/"}>
        <button className="btn btn-primary">Go back</button>
      </Link>
    </div>
  );
}
