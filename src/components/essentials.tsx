import { ESSENTIAL_LAYERS } from "@/lib/guide-data";

export function Essentials() {
  return (
    <div className="max-w-2xl">
      {ESSENTIAL_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className="py-4 border-b border-border/50 sm:grid sm:grid-cols-[4.5rem_1fr] sm:gap-x-8 first:pt-0"
        >
          <div className="mb-2 sm:mb-0 sm:pt-0.5">
            <a
              href={layer.href}
              className="font-mono text-[13px] tracking-widest text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {layer.label}
            </a>
            {layer.note && (
              <p className="font-sans text-xs text-muted-foreground/55 leading-snug mt-1 max-w-[9.5rem]">
                {layer.note}
              </p>
            )}
          </div>
          <ul className="space-y-2">
            {layer.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-sans font-medium text-base text-foreground leading-snug tracking-[-0.01em] hover:text-foreground/60 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
