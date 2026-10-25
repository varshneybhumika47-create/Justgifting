/**
 * @file page4/components/ShareLinkCard.tsx
 * @owner Member 3 — Frontend Dev 3
 *
 * Public share-link card: shows the shareable URL with copy-to-clipboard,
 * a public/private toggle, and a regenerate-link action. Week 4 wires the
 * actions to the corresponding mutations in lib/api.ts.
 */

import React from 'react';
import { Copy, Link2, Eye, EyeOff, RefreshCw, Check } from 'lucide-react';
import { cx } from '../lib/utils';

interface ShareLinkCardProps {
  shareUrl: string;
  isPublic: boolean;
}

export function ShareLinkCard({
  shareUrl,
  isPublic,
}: ShareLinkCardProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Week 4: surface a toast when clipboard API is unavailable.
    }
  }, [shareUrl]);

  return (
    <section
      aria-label="Public share link"
      className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-stone-800">
          <Link2 className="h-4 w-4 text-stone-500" aria-hidden="true" />
          Public gifting link
        </h2>
        <span
          className={cx(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1',
            isPublic
              ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
              : 'bg-stone-100 text-stone-500 ring-stone-200',
          )}
        >
          {isPublic ? (
            <>
              <Eye className="h-3 w-3" aria-hidden="true" />
              Public
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3" aria-hidden="true" />
              Private
            </>
          )}
        </span>
      </div>

      <div className="flex items-stretch gap-2">
        <input
          readOnly
          value={shareUrl}
          aria-label="Shareable campaign URL"
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
          aria-label="Copy share link to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-stone-500">
        <span>Anyone with this link can contribute — no signup required.</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
          aria-label="Regenerate share link (old link will stop working)"
        >
          <RefreshCw className="h-3 w-3" aria-hidden="true" />
          Regenerate
        </button>
      </div>
    </section>
  );
}
