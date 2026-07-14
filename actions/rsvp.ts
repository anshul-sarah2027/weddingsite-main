"use server";

import {
  parseRsvpForm,
  type RsvpFormValues,
  type RsvpInput,
} from "@/lib/validations/rsvp";
import {
  createSupabaseServerClient,
  getSupabaseEnv,
} from "@/lib/supabase/server";
import type { RsvpInsert } from "@/types/database";
import { ZodError } from "zod";

export type SubmitRsvpResult =
  | { ok: true; attending: boolean }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function toInsert(data: RsvpInput): RsvpInsert {
  if (data.attending) {
    return {
      full_name: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone.trim(),
      attending: true,
      party_size: data.partySize,
      guest_names: data.guestNames,
      allergies: data.allergies?.trim() || null,
      notes: data.notes?.trim() || null,
    };
  }

  return {
    full_name: data.fullName,
    email: data.email.toLowerCase(),
    phone: data.phone.trim(),
    attending: false,
    party_size: null,
    guest_names: null,
    allergies: null,
    notes: data.notes?.trim() || null,
  };
}

function flattenZodError(error: ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    fieldErrors[key] ??= [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}

export async function submitRsvp(
  values: RsvpFormValues,
): Promise<SubmitRsvpResult> {
  try {
    if (values.attending === null) {
      return {
        ok: false,
        error: "Please let us know if you can attend",
        fieldErrors: { attending: ["Please select Yes or No"] },
      };
    }

    const data = parseRsvpForm(values);

    if (!getSupabaseEnv()) {
      return {
        ok: false,
        error:
          "RSVP storage is not configured yet. Please add Supabase environment variables.",
      };
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("rsvps").insert(toInsert(data));

    if (error) {
      console.error("[submitRsvp]", error.message);
      return {
        ok: false,
        error: "We couldn't save your RSVP. Please try again in a moment.",
      };
    }

    return { ok: true, attending: data.attending };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        error: "Please check the highlighted fields",
        fieldErrors: flattenZodError(error),
      };
    }

    if (error instanceof Error && error.message.includes("Please let us know")) {
      return {
        ok: false,
        error: error.message,
        fieldErrors: { attending: [error.message] },
      };
    }

    console.error("[submitRsvp]", error);
    return {
      ok: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
