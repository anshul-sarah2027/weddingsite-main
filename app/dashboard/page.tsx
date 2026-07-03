import { Container } from "@/components/layout/container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Guest Dashboard",
  "Manage your RSVP and wedding details.",
);

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-16">
      <Container size="narrow" className="text-center">
        <h1 className="text-headline">Guest Dashboard</h1>
        <p className="text-body-lg text-muted-foreground mt-4">
          Authentication and guest management via Supabase — coming soon.
        </p>
      </Container>
    </div>
  );
}
