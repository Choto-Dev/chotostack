"use client";

import { zodResolver } from "@choto/ui/lib/hook-form-resolvers";
import { Controller, useForm } from "@choto/ui/lib/react-hook-form";
import { z } from "@choto/ui/lib/zod";
import { Button } from "@choto/ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@choto/ui/ui/card";
import {
  Field,
  // FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@choto/ui/ui/field";
import { Input } from "@choto/ui/ui/input";
import { useId, useState } from "react";

const formSchema = z.object({
  projectName: z.string(),
  workspaceName: z.string(),
});

export default function CreateProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      workspaceName: "",
    },
  });
  const formId = useId();
  const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(false);
    console.log(data);
  }

  return (
    <Card className="w-96 border">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Enter a valid project and workspace name
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="projectName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-projectName`}>
                    Project Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-autocomplete="none"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={`${formId}-projectName`}
                    placeholder="EX: my-app"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="workspaceName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-workspaceName`}>
                    Workspace Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-autocomplete="none"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={`${formId}-workspaceName`}
                    placeholder="EX: workspace"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={loading}
          form={formId}
          type="submit"
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
