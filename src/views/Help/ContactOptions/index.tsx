"use client";

import ContactCard from "@/src/components/ContactCard";
import { IconMail, IconPhone } from "@tabler/icons-react";
import styles from "./ContactOptions.module.css";

export default function ContactOptions() {
  return (
    <div className={styles.contactOptions}>
      <ContactCard
        href="tel:+18001234567"
        icon={<IconPhone size={24} />}
        label="Call Us"
        value="1-800-123-4567"
      />
      <ContactCard
        href="mailto:support@returnrun.com"
        icon={<IconMail size={24} />}
        label="Email Us"
        value="support@returnrun.com"
      />
    </div>
  );
}
