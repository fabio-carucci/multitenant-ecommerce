import CheckoutNavbar from "@/modules/checkout/components/navigation";
import TenantFooter from "@/modules/tenants/components/footer";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CheckoutLayout = async ({ children, params }: Props) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <CheckoutNavbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  );
};

export default CheckoutLayout;
