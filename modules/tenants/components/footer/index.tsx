import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
});

const TenantFooter = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full gap-2 px-4 py-6 lg:px-12">
        <p>Powered by</p>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
          <span className={cn("text-2xl font-semibold", poppins.className)}>
            Sellio
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default TenantFooter;
