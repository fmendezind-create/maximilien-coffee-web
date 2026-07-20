import type { Metadata } from "next";
import { ConfirmacionClient } from "@/components/checkout/confirmacion-client";

export const metadata: Metadata = { title: "Pedido confirmado — Maximilien Coffee" };

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; id?: string; status?: string }>;
}) {
  const params = await searchParams;
  return <ConfirmacionClient params={params} />;
}
