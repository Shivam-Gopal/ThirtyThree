"use client";
import dynamic from "next/dynamic";
const ContactScene = dynamic(() => import("./ContactScene"), { ssr: false });
export default function ContactSceneLoader() {
  return <ContactScene />;
}
