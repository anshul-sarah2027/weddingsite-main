"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { submitRsvp } from "@/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  rsvpFormDefaults,
  type RsvpFormValues,
} from "@/lib/validations/rsvp";
import { cn } from "@/lib/utils";

const fieldClassName =
  "font-heading h-12 rounded-none border-0 border-b border-[#2F3A2E]/18 bg-transparent px-0 text-base text-forest shadow-none placeholder:text-forest/30 focus-visible:border-[#B59A63] focus-visible:ring-0 md:text-[1.05rem]";

const textareaClassName =
  "font-heading min-h-24 rounded-none border border-[#2F3A2E]/14 bg-[rgba(250,247,242,0.55)] px-3.5 py-3 text-base text-forest shadow-none placeholder:text-forest/30 focus-visible:border-[#B59A63]/55 focus-visible:ring-0 md:text-[1.05rem]";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-heading mb-2.5 block text-[0.7rem] tracking-[0.2em] text-forest/55 uppercase"
    >
      {children}
      {required ? <span className="text-[#B59A63]"> *</span> : null}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-heading mt-2 text-sm text-[#8B3A3A]/85" role="alert">
      {message}
    </p>
  );
}

function resizeGuestNames(names: string[], size: number, primaryName: string) {
  const next = names.slice(0, size);
  while (next.length < size) {
    next.push(next.length === 0 ? primaryName : "");
  }
  if (size > 0 && !next[0]?.trim() && primaryName.trim()) {
    next[0] = primaryName;
  }
  return next;
}

export function RsvpForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<"yes" | "no" | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    defaultValues: rsvpFormDefaults,
    mode: "onBlur",
  });

  const attending = watch("attending");
  const partySize = watch("partySize");
  const fullName = watch("fullName");
  const guestNames = watch("guestNames");

  useEffect(() => {
    if (attending !== true) return;
    const size = Math.min(10, Math.max(1, Number(partySize) || 1));
    const current = getValues("guestNames");
    const primary = getValues("fullName");
    if (current.length === size) return;
    setValue("guestNames", resizeGuestNames(current, size, primary), {
      shouldValidate: false,
    });
  }, [attending, partySize, getValues, setValue]);

  useEffect(() => {
    if (attending !== true || !fullName.trim()) return;
    const current = getValues("guestNames");
    if (current[0]?.trim()) return;
    const next = [...current];
    next[0] = fullName;
    setValue("guestNames", next, { shouldValidate: false });
  }, [fullName, attending, getValues, setValue]);

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    clearErrors();

    startTransition(async () => {
      const result = await submitRsvp(values);

      if (!result.ok) {
        setFormError(result.error);
        if (result.fieldErrors) {
          for (const [path, messages] of Object.entries(result.fieldErrors)) {
            const message = messages[0];
            if (!message) continue;

            if (path === "fullName" || path === "email" || path === "phone" || path === "attending") {
              setError(path, { message });
            } else if (path === "partySize") {
              setError("partySize", { message });
            } else if (path === "allergies") {
              setError("allergies", { message });
            } else if (path === "notes") {
              setError("notes", { message });
            } else if (path === "guestNames" || path.startsWith("guestNames.")) {
              setError("guestNames", { message });
            }
          }
        }
        return;
      }

      setSuccess(result.attending ? "yes" : "no");
    });
  });

  if (success) {
    return (
      <div className="px-2 py-6 text-center md:py-8" role="status">
        <p className="font-editorial text-editorial text-2xl md:text-[1.75rem]">
          {success === "yes"
            ? "We can't wait to celebrate with you"
            : "Thank you for letting us know"}
        </p>
        <h2 className="font-heading mt-4 text-2xl font-medium tracking-[0.16em] text-forest uppercase md:text-3xl">
          {success === "yes" ? "You're on the list" : "RSVP received"}
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[#B59A63]/45" />
        <p className="font-heading mx-auto mt-5 max-w-sm text-base leading-[1.85] text-forest/65 md:text-lg">
          {success === "yes"
            ? "We've saved your details, including your party and any dietary notes. If anything changes, write to us anytime."
            : "We're sorry you can't join us in Kumarakom. If your plans change before 14 August, you're always welcome to update us."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9" noValidate>
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <FieldLabel htmlFor="fullName" required>
            Full name
          </FieldLabel>
          <Input
            id="fullName"
            autoComplete="name"
            className={fieldClassName}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName", { required: "Please enter your full name" })}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClassName}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email", { required: "Please enter your email" })}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="md:col-span-2 md:max-w-md">
          <FieldLabel htmlFor="phone" required>
            Phone number
          </FieldLabel>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClassName}
            placeholder="+353 85 000 0000"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone", {
              required: "Please enter your phone number",
            })}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <p className="font-heading mb-4 text-[0.7rem] tracking-[0.2em] text-forest/55 uppercase">
          Will you attend the wedding? <span className="text-[#B59A63]">*</span>
        </p>
        <Controller
          name="attending"
          control={control}
          rules={{
            validate: (value) => value !== null || "Please select Yes or No",
          }}
          render={({ field }) => (
            <div
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              role="group"
              aria-label="Attendance"
            >
              {[
                { value: true, label: "Joyfully yes" },
                { value: false, label: "Regretfully no" },
              ].map((option) => {
                const selected = field.value === option.value;
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => field.onChange(option.value)}
                    className={cn(
                      "font-heading rounded-none border px-5 py-4 text-sm tracking-[0.14em] uppercase transition-[border-color,background-color,color] duration-300",
                      selected
                        ? "border-[#B59A63] bg-[#B59A63]/12 text-forest"
                        : "border-[#2F3A2E]/15 bg-transparent text-forest/60 hover:border-[#B59A63]/40 hover:text-forest",
                    )}
                    aria-pressed={selected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        />
        <FieldError message={errors.attending?.message} />
      </div>

      {attending === true && (
        <div className="space-y-8 border-t border-[#B59A63]/20 pt-8">
          <div className="max-w-[10rem]">
            <FieldLabel htmlFor="partySize" required>
              Party size
            </FieldLabel>
            <Input
              id="partySize"
              type="number"
              min={1}
              max={10}
              inputMode="numeric"
              className={fieldClassName}
              aria-invalid={Boolean(errors.partySize)}
              {...register("partySize", {
                valueAsNumber: true,
                required: "Please enter your party size",
                min: { value: 1, message: "Party size must be at least 1" },
                max: {
                  value: 10,
                  message: "Please contact us for parties larger than 10",
                },
              })}
            />
            <FieldError message={errors.partySize?.message} />
          </div>

          <div>
            <p className="font-heading mb-4 text-[0.7rem] tracking-[0.2em] text-forest/55 uppercase">
              Guest names <span className="text-[#B59A63]">*</span>
            </p>
            <div className="space-y-5">
              {guestNames.map((_, index) => (
                <div key={`guest-${index}`}>
                  <Input
                    aria-label={
                      index === 0
                        ? "Primary guest name"
                        : `Guest ${index + 1} name`
                    }
                    className={fieldClassName}
                    placeholder={
                      index === 0
                        ? "Your name"
                        : `Guest ${index + 1} full name`
                    }
                    {...register(`guestNames.${index}` as const, {
                      required: "Please enter each guest's name",
                    })}
                  />
                </div>
              ))}
            </div>
            <FieldError
              message={
                typeof errors.guestNames?.message === "string"
                  ? errors.guestNames.message
                  : errors.guestNames?.root?.message ||
                    (Array.isArray(errors.guestNames)
                      ? errors.guestNames.find((item) => item?.message)?.message
                      : undefined)
              }
            />
          </div>

          <div>
            <FieldLabel htmlFor="allergies">
              Food allergies / dietary needs
            </FieldLabel>
            <Textarea
              id="allergies"
              className={textareaClassName}
              placeholder="Shared notes for your whole party"
              {...register("allergies")}
            />
            <FieldError message={errors.allergies?.message} />
          </div>
        </div>
      )}

      {attending !== null && (
        <div
          className={cn(
            attending === true && "border-t border-[#B59A63]/20 pt-8",
          )}
        >
          <FieldLabel htmlFor="notes">Additional notes</FieldLabel>
          <Textarea
            id="notes"
            className={textareaClassName}
            placeholder="Anything else you'd like us to know"
            {...register("notes")}
          />
          <FieldError message={errors.notes?.message} />
        </div>
      )}

      {formError && (
        <p
          className="font-heading border border-[#8B3A3A]/20 bg-[#8B3A3A]/06 px-4 py-3 text-sm text-[#8B3A3A]/90"
          role="alert"
        >
          {formError}
        </p>
      )}

      <div className="pt-1 text-center md:text-left">
        <Button
          type="submit"
          disabled={isPending || attending === null}
          size="lg"
          className="font-heading h-12 w-full rounded-none border border-forest bg-forest px-10 text-sm tracking-[0.2em] text-[#FAF7F2] uppercase transition-[background-color,border-color,opacity] hover:border-[#2F3A2E] hover:bg-[#2F3A2E] disabled:opacity-40 md:w-auto"
        >
          {isPending ? "Sending…" : "Send RSVP"}
        </Button>
      </div>
    </form>
  );
}
