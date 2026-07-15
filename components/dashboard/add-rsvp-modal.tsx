"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { createDashboardRsvp } from "@/actions/dashboard-rsvps";
import type { RsvpRow } from "@/types/database";
import { cn } from "@/lib/utils";

type AddRsvpModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (row: RsvpRow) => void;
};

function resizeGuestNames(names: string[], size: number) {
  const next = names.slice(0, size);
  while (next.length < size) next.push("");
  return next;
}

export function AddRsvpModal({ open, onClose, onCreated }: AddRsvpModalProps) {
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState(true);
  const [partySize, setPartySize] = useState(1);
  const [guestNames, setGuestNames] = useState([""]);
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        reset();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  function reset() {
    setFullName("");
    setEmail("");
    setPhone("");
    setAttending(true);
    setPartySize(1);
    setGuestNames([""]);
    setAllergies("");
    setNotes("");
    setError(null);
  }

  function close() {
    onClose();
    reset();
  }

  function updatePartySize(next: number) {
    const size = Math.min(10, Math.max(1, next));
    setPartySize(size);
    setGuestNames((current) => {
      const resized = resizeGuestNames(current, size);
      if (size >= 1 && !resized[0]?.trim() && fullName.trim()) {
        resized[0] = fullName.trim();
      }
      return resized;
    });
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center md:p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2F3A2E]/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-rsvp-title"
        className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-sm border border-[#B59A63]/28 bg-[#FFFCFA] shadow-[0_24px_70px_rgba(47,58,46,0.18)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-forest/10 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <h2
              id="add-rsvp-title"
              className="font-heading text-xl font-medium tracking-[0.12em] text-[#2F3A2E] uppercase"
            >
              Add RSVP
            </h2>
            <p className="font-heading mt-1.5 text-sm leading-relaxed text-[#2F3A2E]/55">
              Enter a guest reply from a phone call, WhatsApp, or in person.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-9 shrink-0 items-center justify-center text-[#2F3A2E]/40 transition-colors hover:text-[#2F3A2E]"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            startTransition(async () => {
              const result = await createDashboardRsvp({
                fullName,
                email,
                phone,
                attending,
                partySize: attending ? partySize : undefined,
                guestNames: attending ? guestNames : undefined,
                allergies: attending ? allergies : undefined,
                notes,
              });
              if (!result.ok) {
                setError(result.error);
                return;
              }
              onCreated(result.row);
              close();
            });
          }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6">
            <div className="space-y-5">
              <Field
                id="add-full-name"
                label="Full name"
                value={fullName}
                onChange={(value) => {
                  setFullName(value);
                  setGuestNames((current) => {
                    if (!attending || current.length === 0) return current;
                    const next = [...current];
                    if (!next[0]?.trim()) next[0] = value;
                    return next;
                  });
                }}
                required
              />
              <Field
                id="add-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <Field
                id="add-phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                required
              />

              <fieldset>
                <legend className="font-heading mb-2 text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase">
                  Attendance
                </legend>
                <div className="flex gap-2">
                  {(
                    [
                      { value: true, label: "Attending" },
                      { value: false, label: "Not attending" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => {
                        setAttending(option.value);
                        if (option.value) {
                          updatePartySize(Math.max(1, partySize));
                        }
                      }}
                      className={cn(
                        "font-heading flex-1 rounded-sm border px-3 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
                        attending === option.value
                          ? "border-[#2F3A2E] bg-[#2F3A2E] text-[#FAF7F2]"
                          : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/65 hover:border-[#B59A63]/40",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {attending ? (
                <>
                  <div>
                    <label
                      htmlFor="add-party-size"
                      className="font-heading mb-2 block text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase"
                    >
                      Party size
                    </label>
                    <input
                      id="add-party-size"
                      type="number"
                      min={1}
                      max={10}
                      value={partySize}
                      onChange={(event) =>
                        updatePartySize(Number(event.target.value) || 1)
                      }
                      className="font-heading h-11 w-24 rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 text-sm text-[#2F3A2E] outline-none focus:border-[#B59A63]/45"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="font-heading text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase">
                      Guest names
                    </p>
                    {guestNames.map((name, index) => (
                      <input
                        key={`guest-${index}`}
                        type="text"
                        value={name}
                        onChange={(event) => {
                          const value = event.target.value;
                          setGuestNames((current) =>
                            current.map((item, i) =>
                              i === index ? value : item,
                            ),
                          );
                        }}
                        placeholder={
                          index === 0 ? "Primary guest" : `Guest ${index + 1}`
                        }
                        required
                        className="font-heading h-11 w-full rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 text-sm text-[#2F3A2E] outline-none placeholder:text-[#2F3A2E]/35 focus:border-[#B59A63]/45"
                      />
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="add-allergies"
                      className="font-heading mb-2 block text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase"
                    >
                      Dietary notes (optional)
                    </label>
                    <textarea
                      id="add-allergies"
                      value={allergies}
                      onChange={(event) => setAllergies(event.target.value)}
                      rows={3}
                      className="font-heading w-full resize-y rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 py-2.5 text-sm text-[#2F3A2E] outline-none focus:border-[#B59A63]/45"
                    />
                  </div>
                </>
              ) : null}

              <div>
                <label
                  htmlFor="add-notes"
                  className="font-heading mb-2 block text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase"
                >
                  Extra note (optional)
                </label>
                <textarea
                  id="add-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  className="font-heading w-full resize-y rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 py-2.5 text-sm text-[#2F3A2E] outline-none focus:border-[#B59A63]/45"
                />
              </div>

              {error ? (
                <p
                  className="font-heading border border-[#8B3A3A]/20 bg-[#8B3A3A]/06 px-4 py-3 text-sm text-[#8B3A3A]/90"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 border-t border-forest/10 px-5 py-4 md:px-6">
            <button
              type="submit"
              disabled={isPending}
              className="font-heading inline-flex h-10 items-center gap-2 rounded-sm bg-[#2F3A2E] px-4 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40"
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
              {isPending ? "Saving…" : "Add RSVP"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={close}
              className="font-heading inline-flex h-10 items-center rounded-sm border border-forest/15 px-4 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-heading mb-2 block text-[0.7rem] tracking-[0.18em] text-[#2F3A2E]/55 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="font-heading h-11 w-full rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 text-sm text-[#2F3A2E] outline-none focus:border-[#B59A63]/45"
      />
    </div>
  );
}
