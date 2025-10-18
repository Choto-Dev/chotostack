import CreateProjectForm from "@/components/client-components/create-project-form";
import nextMetadata from "@/lib/next-metadata";

export const metadata = nextMetadata("Create a project");

export default function Page() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-4xl items-center justify-center">
      <CreateProjectForm />
    </main>
  );
}
