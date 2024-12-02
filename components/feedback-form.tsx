// components/FeedbackForm.tsx

"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  feedback: string;
  rating: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    setSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      feedback: "",
      rating: "",
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border border-gray-300 p-6 shadow-md md:mt-20">
      <h2 className="mb-4 text-center text-2xl font-bold">
        We Value Your Feedback
      </h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Please let us know how we can improve.
      </p>

      {submitted && (
        <div className="mb-4 rounded bg-green-100 p-4 text-green-800">
          Thank you for your feedback!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        {/* Feedback */}
        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Share your thoughts"
            required
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Select
            value={formData.rating}
            onValueChange={handleRatingChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 - Very Poor</SelectItem>
              <SelectItem value="2">2 - Poor</SelectItem>
              <SelectItem value="3">3 - Average</SelectItem>
              <SelectItem value="4">4 - Good</SelectItem>
              <SelectItem value="5">5 - Excellent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
