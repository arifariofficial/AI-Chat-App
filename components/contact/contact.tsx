"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface ContactFormProps {
  dictionary: Dictionary;
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mocking a form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Display success toast
      toast({
        title: dictionary.contactForm.successToastTitle,
        description: dictionary.contactForm.successToastDescription,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      // Handle form submission error
      console.error("Failed to send message:", error);
      // Display error toast
      toast({
        title: dictionary.contactForm.errorToastTitle,
        description: dictionary.contactForm.errorToastDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto my-10 max-w-lg px-4">
      <h2 className="mb-6 text-center text-3xl font-bold">
        {dictionary.contactForm.title}
      </h2>
      <p className="mb-8 text-center text-gray-600">
        {dictionary.contactForm.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{dictionary.contactForm.nameLabel}</Label>
          <Input
            id="name"
            name="name"
            placeholder={dictionary.contactForm.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{dictionary.contactForm.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={dictionary.contactForm.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">{dictionary.contactForm.messageLabel}</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={dictionary.contactForm.messagePlaceholder}
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? dictionary.contactForm.sendingButton
            : dictionary.contactForm.submitButton}
        </Button>
      </form>
    </div>
  );
}
