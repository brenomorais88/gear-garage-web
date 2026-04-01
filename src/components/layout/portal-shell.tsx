import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type PortalShellProps = {
  children: React.ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-brand-white">{children}</main>
      <SiteFooter />
    </>
  );
}
