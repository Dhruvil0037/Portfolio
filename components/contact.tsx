"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [formData, setFormData] = useState({
    senderEmail: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      senderEmail: "",
      message: ""
    });
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading index="06 — Contact">Contact me</SectionHeading>

      <p className="text-ink/70 -mt-6">
        Please contact me directly at{" "}
        <a className="text-accent underline underline-offset-2" href="mailto:dhruvildhamecha2003.com">
          dhruvildhamecha2003@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col"
        action={async (formDataObj) => {
          const { data, error } = await sendEmail(formDataObj);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
          resetForm();
        }}
      >
        <input
          className="h-14 px-4 rounded borderInk bg-paper text-ink transition-all outline-none focus:border-accent"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
          value={formData.senderEmail}
          onChange={handleInputChange}
        />
        <textarea
          className="h-52 my-3 rounded borderInk bg-paper text-ink p-4 transition-all outline-none focus:border-accent"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
          value={formData.message}
          onChange={handleInputChange}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}