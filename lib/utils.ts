import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantUrl(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";

  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  // https://fabio.sellio.com
  return `${protocol}://${tenantSlug}.${domain}`;
}

export function formatCurrency(
  value: number | string,
  options?: Intl.NumberFormatOptions & { locale?: string; currency?: string }
) {
  const {
    locale = "en-US",
    currency = "USD",
    maximumFractionDigits = 0,
    ...rest
  } = options ?? {};

  const num =
    typeof value === "string" ? Number(value.replace(/[^\d.-]/g, "")) : value;

  if (!Number.isFinite(num)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    ...rest,
  }).format(num);
}
