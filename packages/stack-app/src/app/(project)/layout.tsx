import { redirect } from "next/navigation";
import isValidProjectDir from "@/lib/actions/is-valid-project-dir";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProject = await isValidProjectDir();

  if (!isProject) {
    redirect("/create");
  }

  return <>{children}</>;
}
