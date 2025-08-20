import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads" as any).insert({ name, email, message });
      if (error) throw error;
      toast.success("Message sent! I’ll be in touch shortly.");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t">
      <div className="container py-16 md:py-24">
        <h2 className="font-playfair text-3xl md:text-4xl">Contact</h2>
        <p className="mt-2 text-muted-foreground">Let’s create something beautiful together</p>

        <form onSubmit={onSubmit} className="mt-8 grid max-w-2xl gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="min-h-[120px] w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Tell me about your project or event"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-primary-foreground shadow-md transition disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>

        <aside className="mt-6 text-sm text-muted-foreground">
          <p>Email: hello@avacarter.com • Phone: +1 (555) 231-9876</p>
          <p>Instagram • Behance • Pinterest</p>
        </aside>
      </div>
    </section>
  );
};

export default ContactSection;
