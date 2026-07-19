"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSubmission } from "@/lib/cms/actions";
import type { FormSubmission } from "@/lib/cms/types";

export function SubmissionDetail({
  submission,
}: {
  submission: FormSubmission;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const status = String(
          formData.get("status"),
        ) as FormSubmission["status"];
        await updateSubmission({
          id: submission.id,
          site_id: submission.site_id,
          status,
          internal_notes: String(formData.get("internal_notes") ?? ""),
        });
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Update failed");
      }
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Follow-up</legend>
        <label>
          Status
          <select name="status" defaultValue={submission.status}>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label>
          Internal notes
          <textarea
            name="internal_notes"
            defaultValue={submission.internal_notes ?? ""}
          />
        </label>
      </fieldset>

      <div className="admin-form-actions">
        <button className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "Saving…" : "Update submission"}
        </button>
      </div>
    </form>
  );
}
