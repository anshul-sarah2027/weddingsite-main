"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { logoutDashboard } from "@/actions/dashboard-auth";
import {
  loadRsvpPage,
  refreshDashboardData,
  updateRsvpDietaryNotes,
} from "@/actions/dashboard-rsvps";
import { AddRsvpModal } from "@/components/dashboard/add-rsvp-modal";
import { RsvpEntry } from "@/components/dashboard/rsvp-entry";
import { IMAGES } from "@/constants/images";
import {
  DASHBOARD_PAGE_SIZE,
  type RsvpFilter,
  type RsvpNoteItem,
  type RsvpNoteLists,
  type RsvpStats,
} from "@/lib/dashboard-data";
import type { RsvpRow } from "@/types/database";
import { cn } from "@/lib/utils";

type NotesModalKind = "allergies" | "notes" | null;

function SummaryCard({
  value,
  label,
  hint,
  active = false,
  emphasize = false,
  onClick,
}: {
  value: number;
  label: string;
  hint?: string;
  active?: boolean;
  emphasize?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "rounded-sm border bg-[#FFFCFA]/95 px-4 py-5 text-left shadow-[0_8px_28px_rgba(47,58,46,0.05)] transition-[border-color,box-shadow,transform] md:px-5 md:py-6",
    emphasize ? "border-[#B59A63]/35" : "border-forest/10",
    active && "border-[#B59A63]/55 ring-1 ring-[#B59A63]/30",
    onClick &&
      "hover:-translate-y-0.5 hover:border-[#B59A63]/40 hover:shadow-[0_12px_32px_rgba(47,58,46,0.08)]",
  );

  const content = (
    <>
      <p
        className={cn(
          "font-heading text-3xl font-medium tracking-tight md:text-4xl",
          emphasize ? "text-[#B59A63]" : "text-[#2F3A2E]",
        )}
      >
        {value}
      </p>
      <p className="font-heading mt-2 text-[0.7rem] tracking-[0.16em] text-[#2F3A2E]/55 uppercase md:text-xs">
        {label}
      </p>
      {hint ? (
        <p className="font-heading mt-1.5 text-sm text-[#2F3A2E]/45">{hint}</p>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

function NotesModal({
  kind,
  items,
  onClose,
  onDietaryUpdated,
}: {
  kind: "allergies" | "notes";
  items: RsvpNoteItem[];
  onClose: () => void;
  onDietaryUpdated?: (row: RsvpRow) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dietDraft, setDietDraft] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  const title =
    kind === "allergies" ? "Food / allergy notes" : "Extra notes";
  const detailLabel = kind === "allergies" ? "Dietary notes" : "Note";

  function startEdit(item: RsvpNoteItem) {
    setEditingId(item.id);
    setDietDraft(item.detail);
    setActionError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDietDraft("");
    setActionError(null);
  }

  function saveDiet(id: string) {
    setActionError(null);
    startTransition(async () => {
      const result = await updateRsvpDietaryNotes({
        id,
        allergies: dietDraft,
      });
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      onDietaryUpdated?.(result.row);
      cancelEdit();
    });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-end justify-center p-4 sm:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2F3A2E]/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-[min(85vh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-sm border border-[#B59A63]/30 bg-[#FFFCFA] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-forest/10 px-5 py-4 md:px-6">
          <div>
            <p className="font-heading text-[0.65rem] tracking-[0.16em] text-[#B59A63] uppercase">
              {items.length} {items.length === 1 ? "reply" : "replies"}
            </p>
            <h2 className="font-heading mt-1 text-xl font-medium text-[#2F3A2E] md:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-sm border border-forest/15 text-[#2F3A2E] transition-colors hover:bg-forest/5"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 md:px-6 md:py-5"
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          <ul className="space-y-4 pb-2">
            {items.map((item) => {
              const isEditing = kind === "allergies" && editingId === item.id;

              return (
                <li
                  key={item.id}
                  className="rounded-sm border border-forest/10 bg-[#FAF7F2]/80 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-heading text-lg font-medium text-[#2F3A2E]">
                          {item.fullName}
                        </p>
                        {kind === "notes" && (
                          <span
                            className={cn(
                              "font-heading rounded-sm px-2 py-0.5 text-[0.65rem] tracking-[0.1em] uppercase",
                              item.attending
                                ? "bg-[#3E5643]/10 text-[#3E5643]"
                                : "bg-[#8B3A3A]/10 text-[#8B3A3A]",
                            )}
                          >
                            {item.attending ? "Attending" : "Not attending"}
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${item.email}`}
                        className="font-heading mt-0.5 inline-block text-sm text-[#2F3A2E]/50 hover:underline"
                      >
                        {item.email}
                      </a>
                    </div>

                    {kind === "allergies" && !isEditing ? (
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-forest/12 bg-[#FFFCFA] px-2.5 py-1.5 text-[#2F3A2E]/65 transition-colors hover:border-[#B59A63]/40 hover:text-[#2F3A2E]"
                        aria-label={`Update dietary notes for ${item.fullName}`}
                        title="Update dietary notes"
                      >
                        <UtensilsCrossed
                          className="size-3.5"
                          strokeWidth={1.75}
                        />
                        <span className="font-heading text-[0.65rem] tracking-[0.1em] uppercase">
                          Update
                        </span>
                      </button>
                    ) : null}
                  </div>

                  <p className="font-heading mt-3 flex items-center gap-1.5 text-[0.65rem] tracking-[0.14em] text-[#B59A63] uppercase">
                    {kind === "allergies" ? (
                      <UtensilsCrossed className="size-3.5" strokeWidth={1.75} />
                    ) : null}
                    {detailLabel}
                  </p>

                  {isEditing ? (
                    <div className="mt-2">
                      <textarea
                        value={dietDraft}
                        onChange={(event) => setDietDraft(event.target.value)}
                        rows={4}
                        placeholder="e.g. vegetarian, peanut allergy, no shellfish"
                        className="font-heading w-full resize-y rounded-sm border border-forest/12 bg-[#FFFCFA] px-3 py-2.5 text-sm leading-relaxed text-[#2F3A2E] outline-none placeholder:text-[#2F3A2E]/35 focus:border-[#B59A63]/45"
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => saveDiet(item.id)}
                          className="font-heading inline-flex items-center gap-2 rounded-sm bg-[#2F3A2E] px-3.5 py-2 text-xs tracking-[0.12em] text-[#FAF7F2] uppercase transition-opacity disabled:opacity-40"
                        >
                          <UtensilsCrossed
                            className="size-3.5"
                            strokeWidth={1.75}
                          />
                          {isPending ? "Saving…" : "Save dietary notes"}
                        </button>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={cancelEdit}
                          className="font-heading rounded-sm border border-forest/15 px-3.5 py-2 text-xs tracking-[0.12em] text-[#2F3A2E]/65 uppercase transition-colors hover:border-forest/30 disabled:opacity-40"
                        >
                          Cancel
                        </button>
                      </div>
                      {actionError ? (
                        <p
                          className="font-heading mt-2 text-sm text-[#8B3A3A]"
                          role="alert"
                        >
                          {actionError}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="font-heading mt-1.5 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3A2E]/80">
                      {item.detail}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function DashboardView({
  initialRows,
  initialMatchedCount,
  stats: initialStats,
  notes: initialNotes,
  initialError,
}: {
  initialRows: RsvpRow[];
  initialMatchedCount: number;
  stats: RsvpStats;
  notes: RsvpNoteLists;
  initialError: string | null;
}) {
  const [filter, setFilter] = useState<RsvpFilter>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(initialRows);
  const [matchedCount, setMatchedCount] = useState(initialMatchedCount);
  const [stats, setStats] = useState(initialStats);
  const [notes, setNotes] = useState(initialNotes);
  const [listError, setListError] = useState(initialError);
  const [notesModal, setNotesModal] = useState<NotesModalKind>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const skipFirstFetch = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (skipFirstFetch.current) {
      skipFirstFetch.current = false;
      return;
    }

    startTransition(async () => {
      const result = await loadRsvpPage({
        page,
        filter,
        query: debouncedQuery,
      });

      if (result.error) {
        setListError(result.error);
        setRows([]);
        setMatchedCount(0);
        return;
      }

      setListError(null);
      setRows(result.rows);
      setMatchedCount(result.matchedCount);

      const maxPage = Math.max(
        1,
        Math.ceil(result.matchedCount / DASHBOARD_PAGE_SIZE),
      );
      if (page > maxPage) setPage(maxPage);
    });
  }, [page, filter, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(matchedCount / DASHBOARD_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rangeStart =
    matchedCount === 0 ? 0 : (currentPage - 1) * DASHBOARD_PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * DASHBOARD_PAGE_SIZE, matchedCount);

  function updateFilter(next: RsvpFilter) {
    setFilter(next);
    setPage(1);
  }

  function handleRowChanged(updated: RsvpRow) {
    setRows((current) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "attending" && updated.attending) ||
        (filter === "declining" && !updated.attending);

      if (!matchesFilter) {
        setMatchedCount((count) => Math.max(0, count - 1));
        return current.filter((row) => row.id !== updated.id);
      }

      return current.map((row) => (row.id === updated.id ? updated : row));
    });

    refreshSnapshot();
  }

  function handleRowDeleted(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
    setMatchedCount((count) => Math.max(0, count - 1));
    refreshSnapshot();
  }

  function handleRsvpCreated(_row: RsvpRow) {
    setPage(1);
    setFilter("all");
    setQuery("");
    setDebouncedQuery("");
    setAddModalOpen(false);
    startTransition(async () => {
      const snapshot = await refreshDashboardData({
        page: 1,
        filter: "all",
        query: "",
      });
      setStats(snapshot.stats);
      setNotes(snapshot.notes);
      if (!snapshot.page.error) {
        setRows(snapshot.page.rows);
        setMatchedCount(snapshot.page.matchedCount);
        setListError(null);
      }
    });
  }

  function refreshSnapshot() {
    startTransition(async () => {
      const snapshot = await refreshDashboardData({
        page,
        filter,
        query: debouncedQuery,
      });
      setStats(snapshot.stats);
      setNotes(snapshot.notes);
      if (!snapshot.page.error) {
        setRows(snapshot.page.rows);
        setMatchedCount(snapshot.page.matchedCount);
        setListError(null);
      }
    });
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <header className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-medium tracking-[0.12em] text-[#2F3A2E] uppercase md:text-4xl">
          RSVP Overview
        </h1>

        <form action={logoutDashboard}>
          <button
            type="submit"
            className="font-heading text-xs tracking-[0.16em] text-[#2F3A2E]/40 uppercase underline-offset-4 transition-colors hover:text-[#2F3A2E] hover:underline"
          >
            Sign out
          </button>
        </form>
      </header>

      <Image
        src={IMAGES.patterns.divider}
        alt=""
        width={1716}
        height={380}
        sizes="180px"
        className="h-auto w-40 opacity-40 md:w-48"
        aria-hidden="true"
      />

      <section
        aria-label="Full RSVP totals"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        <SummaryCard
          value={stats.totalGuests}
          label="Total guests"
          hint="All attending headcount"
          emphasize
        />
        <SummaryCard
          value={stats.attendingParties}
          label="Attending"
          hint="All yes replies — tap to filter"
          active={filter === "attending"}
          onClick={() => updateFilter("attending")}
        />
        <SummaryCard
          value={stats.decliningParties}
          label="Not attending"
          hint="All no replies — tap to filter"
          active={filter === "declining"}
          onClick={() => updateFilter("declining")}
        />
      </section>

      {(stats.withAllergies > 0 || stats.withNotes > 0) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {stats.withAllergies > 0 && (
            <button
              type="button"
              onClick={() => setNotesModal("allergies")}
              className="rounded-sm border border-forest/10 bg-[#FFFCFA]/90 px-4 py-4 text-left transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#B59A63]/40 hover:shadow-[0_12px_32px_rgba(47,58,46,0.08)]"
            >
              <p className="font-heading text-2xl font-medium text-[#2F3A2E]">
                {stats.withAllergies}
              </p>
              <p className="font-heading mt-1 text-[0.7rem] tracking-[0.14em] text-[#2F3A2E]/50 uppercase">
                Food / allergy notes
              </p>
              <p className="font-heading mt-2 text-sm text-[#B59A63]">
                Tap to view names & details →
              </p>
            </button>
          )}
          {stats.withNotes > 0 && (
            <button
              type="button"
              onClick={() => setNotesModal("notes")}
              className="rounded-sm border border-forest/10 bg-[#FFFCFA]/90 px-4 py-4 text-left transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#B59A63]/40 hover:shadow-[0_12px_32px_rgba(47,58,46,0.08)]"
            >
              <p className="font-heading text-2xl font-medium text-[#2F3A2E]">
                {stats.withNotes}
              </p>
              <p className="font-heading mt-1 text-[0.7rem] tracking-[0.14em] text-[#2F3A2E]/50 uppercase">
                Extra notes
              </p>
              <p className="font-heading mt-2 text-sm text-[#B59A63]">
                Tap to view names & details →
              </p>
            </button>
          )}
        </div>
      )}

      {notesModal === "allergies" && (
        <NotesModal
          kind="allergies"
          items={notes.allergyNotes}
          onClose={() => setNotesModal(null)}
          onDietaryUpdated={handleRowChanged}
        />
      )}
      {notesModal === "notes" && (
        <NotesModal
          kind="notes"
          items={notes.extraNotes}
          onClose={() => setNotesModal(null)}
        />
      )}

      <section aria-label="Guest list" className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter"
          >
            {(
              [
                { id: "all", label: "All" },
                { id: "attending", label: "Attending" },
                { id: "declining", label: "Not attending" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => updateFilter(tab.id)}
                className={cn(
                  "font-heading rounded-sm px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors",
                  filter === tab.id
                    ? "bg-[#2F3A2E] text-[#FAF7F2]"
                    : "border border-forest/15 bg-[#FFFCFA]/70 text-[#2F3A2E]/55 hover:border-[#B59A63]/40 hover:text-[#2F3A2E]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:justify-end">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="font-heading inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-sm border border-forest/15 bg-[#FFFCFA]/90 px-3.5 text-xs tracking-[0.14em] text-[#2F3A2E]/70 uppercase transition-colors hover:border-[#B59A63]/45 hover:text-[#2F3A2E] sm:w-auto"
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
              Add RSVP
            </button>
            <div className="relative w-full sm:max-w-[240px]">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#2F3A2E]/35"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search names…"
                className="font-heading h-10 w-full rounded-sm border border-forest/12 bg-[#FFFCFA]/90 pr-3 pl-9 text-sm text-[#2F3A2E] outline-none placeholder:text-[#2F3A2E]/35 focus:border-[#B59A63]/45"
              />
            </div>
          </div>
        </div>

        <AddRsvpModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onCreated={handleRsvpCreated}
        />

        {listError && (
          <p
            className="font-heading rounded-sm border border-[#8B3A3A]/20 bg-[#8B3A3A]/06 px-4 py-3 text-sm text-[#8B3A3A]"
            role="alert"
          >
            {listError}
          </p>
        )}

        {!listError && matchedCount === 0 && (
          <div className="rounded-sm border border-dashed border-forest/15 bg-[#FFFCFA]/70 px-6 py-14 text-center">
            <p className="font-editorial text-editorial text-xl">
              {stats.totalResponses === 0 ? "No RSVPs yet" : "No matches"}
            </p>
            <p className="font-heading mt-2 text-sm text-[#2F3A2E]/50">
              {stats.totalResponses === 0
                ? "Guest replies will appear here as they come in."
                : "Try another filter or search."}
            </p>
          </div>
        )}

        <div
          className={cn(
            "space-y-3 transition-opacity md:space-y-4",
            isPending && "opacity-55",
          )}
        >
          {rows.map((row) => (
            <RsvpEntry
              key={row.id}
              row={row}
              onChanged={handleRowChanged}
              onDeleted={handleRowDeleted}
            />
          ))}
        </div>

        {!listError && matchedCount > 0 && (
          <div className="flex flex-col items-center gap-4 border-t border-forest/10 pt-6 sm:flex-row sm:justify-between">
            <p className="font-heading text-sm text-[#2F3A2E]/50">
              Showing {rangeStart}–{rangeEnd} of {matchedCount} replies
              {filter !== "all" || debouncedQuery ? " (filtered)" : ""}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1 || isPending}
                  className="font-heading rounded-sm border border-forest/15 bg-[#FFFCFA]/90 px-3 py-2 text-xs tracking-[0.12em] text-[#2F3A2E] uppercase transition-colors hover:border-[#B59A63]/40 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Previous
                </button>
                <p className="font-heading min-w-[5.5rem] text-center text-sm text-[#2F3A2E]/65">
                  Page {currentPage} / {totalPages}
                </p>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages || isPending}
                  className="font-heading rounded-sm border border-forest/15 bg-[#FFFCFA]/90 px-3 py-2 text-xs tracking-[0.12em] text-[#2F3A2E] uppercase transition-colors hover:border-[#B59A63]/40 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
