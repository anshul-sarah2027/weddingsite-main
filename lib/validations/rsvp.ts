import { z } from "zod";

const notesField = z
  .string()
  .trim()
  .max(1000, "Please keep notes under 1000 characters")
  .optional()
  .or(z.literal(""));

const baseFields = {
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .max(120, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  notes: notesField,
};

export const rsvpAttendingSchema = z
  .object({
    ...baseFields,
    attending: z.literal(true),
    partySize: z.coerce
      .number()
      .int("Party size must be a whole number")
      .min(1, "Party size must be at least 1")
      .max(10, "Please contact us for parties larger than 10"),
    guestNames: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Please enter each guest's name")
          .max(120, "Name is too long"),
      )
      .min(1)
      .max(10),
    allergies: z
      .string()
      .trim()
      .max(1000, "Please keep allergies under 1000 characters")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.guestNames.length !== data.partySize) {
      ctx.addIssue({
        code: "custom",
        message: "Please provide a name for each person in your party",
        path: ["guestNames"],
      });
    }
  });

export const rsvpDecliningSchema = z.object({
  ...baseFields,
  attending: z.literal(false),
});

export const rsvpSchema = z.discriminatedUnion("attending", [
  rsvpAttendingSchema,
  rsvpDecliningSchema,
]);

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type RsvpFormValues = {
  fullName: string;
  email: string;
  attending: boolean | null;
  partySize: number;
  guestNames: string[];
  allergies: string;
  notes: string;
};

export const rsvpFormDefaults: RsvpFormValues = {
  fullName: "",
  email: "",
  attending: null,
  partySize: 1,
  guestNames: [""],
  allergies: "",
  notes: "",
};

/** Validate after the user has chosen Yes/No */
export function parseRsvpForm(values: RsvpFormValues): RsvpInput {
  if (values.attending === null) {
    throw new Error("Please let us know if you can attend");
  }

  if (values.attending) {
    return rsvpAttendingSchema.parse({
      fullName: values.fullName,
      email: values.email,
      attending: true,
      partySize: values.partySize,
      guestNames: values.guestNames,
      allergies: values.allergies || undefined,
      notes: values.notes || undefined,
    });
  }

  return rsvpDecliningSchema.parse({
    fullName: values.fullName,
    email: values.email,
    attending: false,
    notes: values.notes || undefined,
  });
}
