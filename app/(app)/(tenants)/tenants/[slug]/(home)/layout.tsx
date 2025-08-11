import TenantNavbar from "@/components/tenants/navigation";
import TenantFooter from "@/components/tenants/footer";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const TenantHomeLayout = async ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <TenantNavbar />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  );
};

export default TenantHomeLayout;
