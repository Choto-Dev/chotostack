"use client";

import { Button } from "@choto/ui/ui/button";
import createFile from "./create-file";

export default function CreateBtn() {
  return <Button onClick={async () => await createFile()}>Create</Button>;
}
