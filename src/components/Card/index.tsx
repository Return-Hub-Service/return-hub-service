"use client";

import { ReactNode } from "react";
import { Card as MantineCard, Image, Group, Text } from "@mantine/core";

interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
  bordered?: boolean;
  className?: string;
}

export default function Card({
  title,
  children,
  actions,
  image,
  imageAlt,
  compact = false,
  bordered = true,
  className = "",
}: CardProps) {
  return (
    <MantineCard
      shadow="sm"
      padding={compact ? "sm" : "lg"}
      radius="md"
      withBorder={bordered}
      className={className}
    >
      {image && (
        <MantineCard.Section>
          <Image
            src={image}
            height={192}
            alt={imageAlt || title || "Card image"}
          />
        </MantineCard.Section>
      )}

      {title && (
        <Text fw={500} size="lg" mt={image ? "md" : 0}>
          {title}
        </Text>
      )}

      <Text size="sm" c="dimmed" mt={title ? "xs" : 0}>
        {children}
      </Text>

      {actions && (
        <Group justify="flex-end" mt="md">
          {actions}
        </Group>
      )}
    </MantineCard>
  );
}
