"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, jobId }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Unable to submit application");

      form.reset();
      setState("success");
      setMessage("Your demo application was submitted successfully.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input className="input" id="fullName" name="fullName" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input className="input" id="email" name="email" required type="email" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone number</label>
          <input className="input" id="phone" name="phone" required type="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="city">Your Florida city</label>
          <input className="input" id="city" name="city" required />
        </div>
        <div className="form-field">
          <label htmlFor="licenseType">Security license</label>
          <select className="select" defaultValue="" id="licenseType" name="licenseType" required>
            <option disabled value="">
              Select one
            </option>
            <option value="Class D">Class D</option>
            <option value="Class D and G">Class D and G</option>
            <option value="In progress">In progress</option>
            <option value="None">No license yet</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="yearsExperience">Years of experience</label>
          <input
            className="input"
            id="yearsExperience"
            max="60"
            min="0"
            name="yearsExperience"
            required
            type="number"
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="availability">Availability</label>
        <select className="select" id="availability" name="availability" required>
          <option value="Immediately">Immediately</option>
          <option value="Within two weeks">Within two weeks</option>
          <option value="Within one month">Within one month</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="note">Note to the employer (optional)</label>
        <textarea
          className="textarea"
          id="note"
          maxLength={1200}
          name="note"
          placeholder="Briefly share why you're interested in this role."
        />
      </div>
      <label className="checkbox-row">
        <input name="consent" required type="checkbox" value="true" />
        I agree to share this application with the employer shown above. This
        demonstration does not upload or request a résumé.
      </label>
      {message && (
        <p
          aria-live="polite"
          className={`form-message ${
            state === "success" ? "form-message-success" : "form-message-error"
          }`}
        >
          {message}
        </p>
      )}
      <button className="button button-primary" disabled={state === "submitting"} type="submit">
        <Send size={17} /> {state === "submitting" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
