"use client";

import { zodResolver } from "@choto/ui/lib/hook-form-resolvers";
import { Controller, useForm } from "@choto/ui/lib/react-hook-form";
// import { cn } from "@choto/ui/lib/utils";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@choto/ui/ui/input-group";
import { useId, useState } from "react";
import createNewProject from "@/lib/actions/create-new-project";
import validProjectName from "@/lib/actions/valid-package-name";
import { schemas, type TCreateProjectSchema } from "@/lib/schemas";

export default function CreateProjectForm() {
  const form = useForm<TCreateProjectSchema>({
    resolver: zodResolver(schemas.createProject),
    defaultValues: {
      projectName: "my-app",
      workspaceName: "workspace",
    },
  });
  const formId = useId();
  const [disabled, setDisabled] = useState(false);
  // const [errorCount, setErrorCount] = useState(0);

  async function onChange(changedData: TCreateProjectSchema) {
    const { packageErrors, scopeErrors } = await validProjectName(changedData);

    // setErrorCount(errors.length);

    if (packageErrors.length > 0) {
      setDisabled(true);
      form.setError("projectName", {
        message: packageErrors[0],
      });
    } else {
      setDisabled(false);
    }

    if (scopeErrors.length > 0) {
      setDisabled(true);
      form.setError("workspaceName", {
        message: scopeErrors[0],
      });
    } else {
      setDisabled(false);
    }
  }

  async function onSubmit(submitData: TCreateProjectSchema) {
    setDisabled(false);
    await createNewProject(submitData).then(() => {
      setDisabled(true);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Enter a valid project and workspace name
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="w-full min-w-72 max-w-96"
          id={formId}
          onChange={form.handleSubmit(onChange)}
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                  <InputGroup>
                    <InputGroupAddon>@</InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      aria-autocomplete="none"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id={`${formId}-workspaceName`}
                      placeholder="EX: workspace"
                    />
                  </InputGroup>
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
          disabled={disabled}
          form={formId}
          type="submit"
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
