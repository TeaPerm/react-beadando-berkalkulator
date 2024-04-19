import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function datesWithinTwoYears(today, marriage) {
  const diffInMilliseconds = Math.abs(today - marriage);
  const millisecondsInTwoYears = 2 * 365 * 24 * 60 * 60 * 1000;

  if (marriage > today) {
    return false;
  }
  return diffInMilliseconds <= millisecondsInTwoYears;
}

export function calculateNetto(member) {
  const { brutto, under25, freshMarriage, personalTax, familyTax } = member;
  const szja = 0.15;
  const personalTaxDiscount = 77_300;
  const szjaLimit = 499_952;
  const tb = 0.185;
  var tax = brutto * tb;

  if (under25.checked) {
    tax += szjaLimit < brutto ? (brutto - szjaLimit) * szja : 0;
  } else {
    tax += szja * brutto;
  }

  if (personalTax.checked) {
    if (personalTaxDiscount < tax) {
      tax -= personalTaxDiscount;
    } else {
      tax = 0;
    }
  }

  const supported = familyTax.supported;
  const supportedDiscounted = familyTax.supportedDiscounted;

  if (familyTax.checked) {
    if (supportedDiscounted == 1) {
      tax -= supported * 10_000;
    } else if (supportedDiscounted == 2) {
      tax -= supported * 20_000;
    } else if (supportedDiscounted >= 3) {
      tax -= supported * 33_000;
    }
  }

  if (tax < 0) {
    tax = 0;
  }

  if (
    freshMarriage.checked &&
    datesWithinTwoYears(new Date(), new Date(freshMarriage.date))
  ) {
    tax -= 5000;
  }

  return brutto - tax;
}

export function formatForint(number) {
  let formattedNumber = Number(number).toFixed(0).toString();
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedNumber;
}
