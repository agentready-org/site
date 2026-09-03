"use client";

import { useState } from "react";
import {
  DATASET_URL,
  EVIDENCE,
  type EvidenceBlock,
  type Practice,
} from "@/lib/guide-data";

export function SourceTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 mr-2 font-mono text-[12px] tracking-wider border rounded align-middle text-muted-foreground/70 border-border/60 whitespace-nowrap">
      {children}
    </span>
  );
}

function EvidenceButton({
  open,
  onClick,
  controlsId,
}: {
  open: boolean;
  onClick: () => void;
  controlsId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controlsId}
      className="inline-flex items-center gap-1 font-mono text-[13px] tracking-wide text-muted-foreground underline decoration-border decoration-2 underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
    >
      <span aria-hidden="true" className="text-[10px]">
        {open ? "▾" : "▸"}
      </span>
      {open ? "hide evidence" : "evidence"}
    </button>
  );
}

function EvidenceView({ block }: { block: EvidenceBlock }) {
  return (
    <div className="border-l-2 border-border bg-muted/20 rounded-r-lg pl-4 pr-4 py-4">
      <p className="font-mono text-[13px] tracking-widest text-muted-foreground/60 mb-2">
        {block.title.toLowerCase()}
      </p>
      <p className="font-serif text-sm text-foreground/80 leading-relaxed mb-3">
        <span className="font-mono text-[13px] tracking-wide text-muted-foreground/70 mr-1.5">
          backs:
        </span>
        “{block.backs}”
      </p>
      {block.intro && (
        <p className="font-serif text-sm text-foreground/75 leading-relaxed mb-3">
          {block.intro}
        </p>
      )}
      {block.tables.map((table, i) => (
        <div key={i} className="mb-3">
          {table.caption && (
            <p className="font-serif text-sm text-foreground/75 leading-relaxed mb-2">
              {table.caption}
            </p>
          )}
          <table className="w-full max-w-md border-collapse text-left">
            <thead>
              <tr className="border-b border-border/70">
                {table.headers.map((h, j) => (
                  <th
                    key={j}
                    className={`py-1.5 font-mono text-[12px] font-normal tracking-widest text-muted-foreground/60 ${
                      j > 0 ? "pl-4 text-right" : "pr-4"
                    }`}
                  >
                    {h.toLowerCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, j) => (
                <tr key={j} className="border-b border-border/40">
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className={`py-1.5 font-serif text-sm leading-relaxed ${
                        k > 0
                          ? "pl-4 text-right font-mono text-[14px] text-foreground/80 whitespace-nowrap align-bottom"
                          : "pr-4 text-foreground/75"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {block.note && (
        <p className="font-serif text-sm text-foreground/70 leading-relaxed mb-2">
          {block.note}
        </p>
      )}
      <p className="font-mono text-[13px] text-muted-foreground/70 leading-relaxed">
        {block.reproduce}
      </p>
      <a
        href={DATASET_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block font-mono text-[13px] tracking-wide text-muted-foreground underline decoration-border decoration-2 underline-offset-4 hover:text-foreground transition-colors"
      >
        browse the dataset →
      </a>
    </div>
  );
}

/**
 * A [STUDIES] claim in running text with its provenance block
 * expandable directly below the paragraph.
 */
export function ProseEvidence({ evidenceId }: { evidenceId: string }) {
  const [open, setOpen] = useState(false);
  const block = EVIDENCE[evidenceId];
  if (!block) return null;
  const panelId = `evidence-${evidenceId}`;
  return (
    <div className="mt-2 max-w-2xl">
      <EvidenceButton
        open={open}
        onClick={() => setOpen((o) => !o)}
        controlsId={panelId}
      />
      {/* Kept in the DOM when closed so the data ships in the initial HTML. */}
      <div id={panelId} hidden={!open} className="mt-3">
        <EvidenceView block={block} />
      </div>
    </div>
  );
}

export function PracticeTable({
  practices,
  firstHeader = "practice",
  lastHeader,
  className = "",
}: {
  practices: readonly Practice[];
  firstHeader?: string;
  lastHeader: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="w-[26%] py-2.5 pr-4 font-mono text-[13px] font-normal tracking-widest text-muted-foreground/60">
              {firstHeader}
            </th>
            <th className="w-[30%] py-2.5 pr-4 font-mono text-[13px] font-normal tracking-widest text-muted-foreground/60">
              what it does
            </th>
            <th className="py-2.5 font-mono text-[13px] font-normal tracking-widest text-muted-foreground/60">
              {lastHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {practices.map((practice) => {
            const block = practice.evidenceId
              ? EVIDENCE[practice.evidenceId]
              : undefined;
            const open = Boolean(block && expanded[practice.id]);
            const panelId = `evidence-${practice.id}`;
            return (
              <PracticeRows
                key={practice.id}
                practice={practice}
                block={block}
                open={open}
                panelId={panelId}
                onToggle={() => toggle(practice.id)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PracticeRows({
  practice,
  block,
  open,
  panelId,
  onToggle,
}: {
  practice: Practice;
  block?: EvidenceBlock;
  open: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        id={practice.id}
        className={`align-top scroll-mt-20 ${
          open ? "" : "border-b border-border/50"
        }`}
      >
        <td className="py-4 pr-4 font-serif text-base text-foreground leading-snug">
          {practice.name}
        </td>
        <td className="py-4 pr-4 font-serif text-sm text-foreground/75 leading-relaxed">
          {practice.what}
        </td>
        <td className="py-4 font-serif text-sm text-foreground/75 leading-relaxed">
          {practice.evidence ? (
            <>
              {practice.evidence.source && (
                <SourceTag>{practice.evidence.source}</SourceTag>
              )}
              {practice.evidence.text}
              {block && (
                <span className="ml-2 whitespace-nowrap">
                  <EvidenceButton
                    open={open}
                    onClick={onToggle}
                    controlsId={panelId}
                  />
                </span>
              )}
            </>
          ) : (
            practice.bestPractice
          )}
        </td>
      </tr>
      {/* Kept in the DOM when closed so the data ships in the initial HTML. */}
      {block && (
        <tr hidden={!open} className="border-b border-border/50">
          <td colSpan={3} className="pb-5 pt-1" id={panelId}>
            <EvidenceView block={block} />
          </td>
        </tr>
      )}
    </>
  );
}
