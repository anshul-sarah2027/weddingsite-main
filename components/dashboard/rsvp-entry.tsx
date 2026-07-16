"use client";

import { useEffect, useState, useTransition } from "react";
import {
  CheckCircle2,
  Pencil,
  Trash2,
  UtensilsCrossed,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";
import {
  deleteRsvp,
  updateRsvpAttendance,
  updateRsvpDietaryNotes,
  updateRsvpParty,
} from "@/actions/dashboard-rsvps";
import type { RsvpRow } from "@/types/database";
import { cn } from "@/lib/utils";

type ManagePanel = "attendance" | "diet" | "party" | "delete" | null;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function resizeGuestNames(names: string[], size: number) {
  const next = names.slice(0, size);
  while (next.length < size) next.push("");
  return next;
}

function initialPartySize(row: RsvpRow) {
  const guests = row.guest_names?.filter(Boolean) ?? [];
  return Math.max(1, row.party_size ?? (guests.length || 1));
}

export function RsvpEntry({
  row,
  onChanged,
  onDeleted,
}: {
  row: RsvpRow;
  onChanged: (row: RsvpRow) => void;
  onDeleted: (id: string) => void;
}) {
  const guests = row.guest_names?.filter(Boolean) ?? [];
  const partyCount = row.party_size ?? guests.length;
  const allergies = row.allergies?.trim();
  const notes = row.notes?.trim();
  const [panel, setPanel] = useState<ManagePanel>(null);
  const [dietDraft, setDietDraft] = useState(row.allergies ?? "");
  const [partySizeInput, setPartySizeInput] = useState(() =>
    String(initialPartySize(row)),
  );
  const [guestNamesDraft, setGuestNamesDraft] = useState(() =>
    resizeGuestNames(row.guest_names ?? [row.full_name], initialPartySize(row)),
  );
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const size = initialPartySize(row);
    setDietDraft(row.allergies ?? "");
    setPartySizeInput(String(size));
    setGuestNamesDraft(
      resizeGuestNames(row.guest_names ?? [row.full_name], size),
    );
  }, [row]);

  function closePanel() {
    setPanel(null);
    setActionError(null);
    const size = initialPartySize(row);
    setDietDraft(row.allergies ?? "");
    setPartySizeInput(String(size));
    setGuestNamesDraft(
      resizeGuestNames(row.guest_names ?? [row.full_name], size),
    );
  }

  function parsePartySize(raw: string) {
    const size = Math.min(10, Math.max(1, Number(raw) || 1));
    return size;
  }

  function handlePartySizeChange(raw: string) {
    // Allow clearing while typing on mobile (don't force back to 1).
    if (raw === "") {
      setPartySizeInput("");
      return;
    }
    if (!/^\d{1,2}$/.test(raw)) return;
    setPartySizeInput(raw);
    const size = Number(raw);
    if (size >= 1 && size <= 10) {
      setGuestNamesDraft((current) => resizeGuestNames(current, size));
    }
  }

  function commitPartySize() {
    const size = parsePartySize(partySizeInput);
    setPartySizeInput(String(size));
    setGuestNamesDraft((current) => resizeGuestNames(current, size));
    return size;
  }

  function saveAttendance(nextAttending: boolean) {
    setActionError(null);
    startTransition(async () => {
      const result = await updateRsvpAttendance({
        id: row.id,
        attending: nextAttending,
      });
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      onChanged(result.row);
      closePanel();
    });
  }

  function saveDiet() {
    setActionError(null);
    startTransition(async () => {
      const result = await updateRsvpDietaryNotes({
        id: row.id,
        allergies: dietDraft,
      });
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      onChanged(result.row);
      closePanel();
    });
  }

  function saveParty() {
    setActionError(null);
    const partySize = parsePartySize(partySizeInput);
    const names = resizeGuestNames(guestNamesDraft, partySize);
    setPartySizeInput(String(partySize));
    setGuestNamesDraft(names);
    startTransition(async () => {
      const result = await updateRsvpParty({
        id: row.id,
        partySize,
        guestNames: names,
      });
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      onChanged(result.row);
      closePanel();
    });
  }

  function confirmDelete() {
    setActionError(null);
    startTransition(async () => {
      const result = await deleteRsvp(row.id);
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      onDeleted(row.id);
      closePanel();
    });
  }

  return (
    <article
      className={cn(
        "rounded-sm border bg-[#FFFCFA]/95 p-5 shadow-[0_8px_30px_rgba(47,58,46,0.04)] md:p-6",
        row.attending
          ? "border-[#B59A63]/25 border-l-[3px] border-l-[#3E5643]"
          : "border-forest/10 border-l-[3px] border-l-[#8B3A3A]/55",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-heading text-xl font-medium text-[#2F3A2E] md:text-2xl">
              {row.full_name}
            </h3>
            <span
              className={cn(
                "font-heading inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[0.65rem] tracking-[0.12em] uppercase",
                row.attending
                  ? "bg-[#3E5643]/10 text-[#3E5643]"
                  : "bg-[#8B3A3A]/10 text-[#8B3A3A]",
              )}
            >
              {row.attending ? (
                <CheckCircle2 className="size-3.5" strokeWidth={1.75} />
              ) : (
                <XCircle className="size-3.5" strokeWidth={1.75} />
              )}
              {row.attending ? "Attending" : "Not attending"}
            </span>
          </div>
          <a
            href={`mailto:${row.email}`}
            className="font-heading mt-1.5 inline-block text-sm text-[#2F3A2E]/50 transition-colors hover:text-[#2F3A2E] hover:underline"
          >
            {row.email}
          </a>
          {row.phone?.trim() ? (
            <a
              href={`tel:${row.phone.replace(/\s+/g, "")}`}
              className="font-heading mt-1 block text-sm text-[#2F3A2E]/50 transition-colors hover:text-[#2F3A2E] hover:underline"
            >
              {row.phone}
            </a>
          ) : null}
        </div>

        <div className="shrink-0 sm:pt-1 sm:text-right">
          {row.attending ? (
            <p className="font-heading text-lg font-medium text-[#2F3A2E]">
              {partyCount}{" "}
              <span className="text-sm font-normal tracking-[0.06em] text-[#2F3A2E]/45 uppercase">
                {partyCount === 1 ? "guest" : "guests"}
              </span>
            </p>
          ) : null}
          <p className="font-heading mt-1 text-xs tracking-[0.04em] text-[#2F3A2E]/40">
            Replied {formatDate(row.created_at)}
          </p>
        </div>
      </div>

      {row.attending && guests.length > 0 && (
        <div className="mt-5 border-t border-forest/8 pt-4">
          <p className="font-heading text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase">
            In this party
          </p>
          <p className="font-heading mt-2 text-base leading-relaxed text-[#2F3A2E]/80">
            {guests.join("  ·  ")}
          </p>
        </div>
      )}

      {(allergies || notes) && (
        <div
          className={cn(
            "mt-4 grid gap-4",
            allergies && notes && "md:grid-cols-2",
            !guests.length && "border-t border-forest/8 pt-4",
          )}
        >
          {allergies ? (
            <div className="rounded-sm bg-[#FAF7F2]/90 px-3.5 py-3">
              <p className="font-heading flex items-center gap-1.5 text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase">
                <UtensilsCrossed className="size-3.5" strokeWidth={1.75} />
                Dietary notes
              </p>
              <p className="font-heading mt-1.5 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3A2E]/75">
                {allergies}
              </p>
            </div>
          ) : null}
          {notes ? (
            <div className="rounded-sm bg-[#FAF7F2]/90 px-3.5 py-3">
              <p className="font-heading text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase">
                Note
              </p>
              <p className="font-heading mt-1.5 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3A2E]/75">
                {notes}
              </p>
            </div>
          ) : null}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 border-t border-forest/8 pt-4 sm:flex-row sm:flex-wrap">
        {row.attending ? (
          <button
            type="button"
            onClick={() =>
              setPanel((value) => (value === "attendance" ? null : "attendance"))
            }
            className={cn(
              "font-heading inline-flex items-center justify-center gap-2 rounded-sm border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
              panel === "attendance"
                ? "border-[#8B3A3A]/35 bg-[#8B3A3A]/08 text-[#8B3A3A]"
                : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/70 hover:border-[#8B3A3A]/30 hover:text-[#8B3A3A]",
            )}
          >
            <UserX className="size-3.5" strokeWidth={1.75} />
            Mark as not attending
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setPanel((value) => (value === "attendance" ? null : "attendance"))
            }
            className={cn(
              "font-heading inline-flex items-center justify-center gap-2 rounded-sm border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
              panel === "attendance"
                ? "border-[#3E5643]/35 bg-[#3E5643]/08 text-[#3E5643]"
                : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/70 hover:border-[#3E5643]/30 hover:text-[#3E5643]",
            )}
          >
            <UserCheck className="size-3.5" strokeWidth={1.75} />
            Mark as attending
          </button>
        )}

        {row.attending ? (
          <button
            type="button"
            onClick={() =>
              setPanel((value) => (value === "party" ? null : "party"))
            }
            className={cn(
              "font-heading inline-flex items-center justify-center gap-2 rounded-sm border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
              panel === "party"
                ? "border-[#B59A63]/45 bg-[#B59A63]/10 text-[#2F3A2E]"
                : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/70 hover:border-[#B59A63]/40 hover:text-[#2F3A2E]",
            )}
          >
            <Pencil className="size-3.5" strokeWidth={1.75} />
            Edit party
          </button>
        ) : null}

        <button
          type="button"
          onClick={() =>
            setPanel((value) => (value === "diet" ? null : "diet"))
          }
          className={cn(
            "font-heading inline-flex items-center justify-center gap-2 rounded-sm border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
            panel === "diet"
              ? "border-[#B59A63]/45 bg-[#B59A63]/10 text-[#2F3A2E]"
              : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/70 hover:border-[#B59A63]/40 hover:text-[#2F3A2E]",
          )}
        >
          <UtensilsCrossed className="size-3.5" strokeWidth={1.75} />
          {allergies ? "Update dietary notes" : "Add dietary notes"}
        </button>

        <button
          type="button"
          onClick={() =>
            setPanel((value) => (value === "delete" ? null : "delete"))
          }
          className={cn(
            "font-heading inline-flex items-center justify-center gap-2 rounded-sm border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
            panel === "delete"
              ? "border-[#8B3A3A]/35 bg-[#8B3A3A]/08 text-[#8B3A3A]"
              : "border-forest/15 bg-[#FAF7F2]/80 text-[#2F3A2E]/70 hover:border-[#8B3A3A]/30 hover:text-[#8B3A3A]",
          )}
        >
          <Trash2 className="size-3.5" strokeWidth={1.75} />
          Delete
        </button>
      </div>

      {panel === "attendance" && (
        <div className="mt-4 rounded-sm border border-forest/10 bg-[#FAF7F2]/95 px-4 py-4">
          <p className="font-heading text-sm leading-relaxed text-[#2F3A2E]/70">
            {row.attending
              ? `Confirm that ${row.full_name} can no longer attend. Guest totals will update immediately.`
              : `Confirm that ${row.full_name} will now attend. Guest totals will update immediately.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => saveAttendance(!row.attending)}
              className={cn(
                "font-heading inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40",
                row.attending ? "bg-[#8B3A3A]" : "bg-[#3E5643]",
              )}
            >
              {row.attending ? (
                <UserX className="size-3.5" strokeWidth={1.75} />
              ) : (
                <UserCheck className="size-3.5" strokeWidth={1.75} />
              )}
              {isPending
                ? "Saving…"
                : row.attending
                  ? "Confirm — not attending"
                  : "Confirm — attending"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={closePanel}
              className="font-heading rounded-sm border border-forest/15 px-4 py-2.5 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
            >
              Keep current status
            </button>
          </div>
          {actionError ? (
            <p className="font-heading mt-3 text-sm text-[#8B3A3A]" role="alert">
              {actionError}
            </p>
          ) : null}
        </div>
      )}

      {panel === "party" && (
        <div className="mt-4 rounded-sm border border-forest/10 bg-[#FAF7F2]/95 px-4 py-4">
          <p className="font-heading text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase">
            Edit party
          </p>
          <div className="mt-3">
            <label
              htmlFor={`party-size-${row.id}`}
              className="font-heading mb-2 block text-xs tracking-[0.08em] text-[#2F3A2E]/55 uppercase"
            >
              Party size
            </label>
            <input
              id={`party-size-${row.id}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              value={partySizeInput}
              onChange={(event) => handlePartySizeChange(event.target.value)}
              onBlur={commitPartySize}
              className="font-heading h-10 w-24 rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 text-sm text-[#2F3A2E] outline-none focus:border-[#B59A63]/45"
            />
          </div>
          <div className="mt-4 space-y-2.5">
            <p className="font-heading text-xs tracking-[0.08em] text-[#2F3A2E]/55 uppercase">
              Guest names
            </p>
            {guestNamesDraft.map((name, index) => (
              <input
                key={`${row.id}-guest-${index}`}
                type="text"
                value={name}
                onChange={(event) => {
                  const value = event.target.value;
                  setGuestNamesDraft((current) =>
                    current.map((item, i) => (i === index ? value : item)),
                  );
                }}
                placeholder={
                  index === 0 ? "Primary guest" : `Guest ${index + 1}`
                }
                className="font-heading h-10 w-full rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 text-sm text-[#2F3A2E] outline-none placeholder:text-[#2F3A2E]/35 focus:border-[#B59A63]/45"
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={saveParty}
              className="font-heading inline-flex items-center gap-2 rounded-sm bg-[#2F3A2E] px-4 py-2.5 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40"
            >
              <Pencil className="size-3.5" strokeWidth={1.75} />
              {isPending ? "Saving…" : "Save party"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={closePanel}
              className="font-heading rounded-sm border border-forest/15 px-4 py-2.5 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
            >
              Cancel
            </button>
          </div>
          {actionError ? (
            <p className="font-heading mt-3 text-sm text-[#8B3A3A]" role="alert">
              {actionError}
            </p>
          ) : null}
        </div>
      )}

      {panel === "diet" && (
        <div className="mt-4 rounded-sm border border-forest/10 bg-[#FAF7F2]/95 px-4 py-4">
          <label
            htmlFor={`diet-${row.id}`}
            className="font-heading flex items-center gap-1.5 text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase"
          >
            <UtensilsCrossed className="size-3.5" strokeWidth={1.75} />
            Food allergies & dietary needs
          </label>
          <textarea
            id={`diet-${row.id}`}
            value={dietDraft}
            onChange={(event) => setDietDraft(event.target.value)}
            rows={4}
            placeholder="e.g. vegetarian, peanut allergy, no shellfish"
            className="font-heading mt-3 w-full resize-y rounded-sm border border-forest/12 bg-[#FFFCFA] px-3.5 py-3 text-sm leading-relaxed text-[#2F3A2E] outline-none placeholder:text-[#2F3A2E]/35 focus:border-[#B59A63]/45"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={saveDiet}
              className="font-heading inline-flex items-center gap-2 rounded-sm bg-[#2F3A2E] px-4 py-2.5 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40"
            >
              <UtensilsCrossed className="size-3.5" strokeWidth={1.75} />
              {isPending ? "Saving…" : "Save dietary notes"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={closePanel}
              className="font-heading rounded-sm border border-forest/15 px-4 py-2.5 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
            >
              Cancel
            </button>
          </div>
          {actionError ? (
            <p className="font-heading mt-3 text-sm text-[#8B3A3A]" role="alert">
              {actionError}
            </p>
          ) : null}
        </div>
      )}

      {panel === "delete" && (
        <div className="mt-4 rounded-sm border border-[#8B3A3A]/20 bg-[#8B3A3A]/06 px-4 py-4">
          <p className="font-heading text-sm leading-relaxed text-[#2F3A2E]/75">
            Delete the RSVP for{" "}
            <span className="font-medium text-[#2F3A2E]">{row.full_name}</span>?
            This cannot be undone.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={confirmDelete}
              className="font-heading inline-flex items-center gap-2 rounded-sm bg-[#8B3A3A] px-4 py-2.5 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40"
            >
              <Trash2 className="size-3.5" strokeWidth={1.75} />
              {isPending ? "Deleting…" : "Yes, delete"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={closePanel}
              className="font-heading rounded-sm border border-forest/15 px-4 py-2.5 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
            >
              Keep RSVP
            </button>
          </div>
          {actionError ? (
            <p className="font-heading mt-3 text-sm text-[#8B3A3A]" role="alert">
              {actionError}
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}
