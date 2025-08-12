import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantUrl(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
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
