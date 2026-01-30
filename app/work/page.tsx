import { getProjects } from "@/lib/sanity.queries";
import { WorkIndex } from "@/components/WorkIndex";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work | Visual Eyes",
    description: "Index of selected works.",
};

// Revalidate every 60s
export const revalidate = 60;

export default async function WorkPage() {
    const projects = await getProjects();
    return <WorkIndex projects={projects} />;
}
