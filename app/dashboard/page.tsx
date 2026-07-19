import { redirect } from "next/navigation";

import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <DashboardClient userName={session.name} />;
}
