import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  index?: string;
};

export default function SectionHeading({
  children,
  index,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      {index && <span className="section-index block mb-2">{index}</span>}
      <h2 className="font-display text-3xl font-semibold capitalize sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}
