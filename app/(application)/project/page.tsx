import { Button } from "@/components/ui/button";
import Link from "next/link";
const ProjectPage = () => {
  return (
    <>
      <div>Projects</div>
      <Link href={"/"}>Go to Home Page</Link>
      <Button size="lg" variant="destructive">Click me</Button>
    </>
  );
};

export default ProjectPage;
