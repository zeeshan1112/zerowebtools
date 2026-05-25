/**
 * Financial & SaaS projection formula engines.
 * All computations run 100% client-side.
 */

// 1. Mortgage & Loan Amortization
export interface AmortizationPeriod {
  periodIndex: number; // 1-based (month)
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  cumulativeInterest: number;
}

export interface AmortizationSchedule {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
  periods: AmortizationPeriod[];
}

export function calculateAmortization(
  principal: number,
  annualRatePercent: number,
  years: number
): AmortizationSchedule {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;

  let monthlyPayment = 0;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    monthlyPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  let remainingBalance = principal;
  let cumulativeInterest = 0;
  const periods: AmortizationPeriod[] = [];

  for (let i = 1; i <= n; i++) {
    const interest = remainingBalance * r;
    const principalPaid = monthlyPayment - interest;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);
    cumulativeInterest += interest;

    periods.push({
      periodIndex: i,
      payment: monthlyPayment,
      principal: principalPaid,
      interest,
      remainingBalance,
      cumulativeInterest,
    });
  }

  return {
    monthlyPayment,
    totalPayments: n,
    totalInterest: cumulativeInterest,
    totalCost: principal + cumulativeInterest,
    periods,
  };
}

// 2. Startup Cap Table dilution round
export interface Shareholder {
  name: string;
  shares: number;
  ownershipPercent: number;
  value: number;
}

export interface CapTableRound {
  roundName: string;
  preMoneyValuation: number;
  investmentAmount: number;
  optionPoolPercent: number; // percentage of post-money reserved for employee option pool
  shareholders: Shareholder[];
}

export function modelDilutionRound(
  initialShareholders: Shareholder[],
  investment: number,
  preMoneyVal: number,
  optionPoolPercent = 0
): Shareholder[] {
  const totalInitialShares = initialShareholders.reduce((sum, s) => sum + s.shares, 0);
  
  // Price per share = Pre-money Valuation / Total initial shares
  const pricePerShare = preMoneyVal / totalInitialShares;
  
  // New shares issued to investor
  const investorShares = investment / pricePerShare;
  
  // Post-money Valuation = Pre-money Valuation + Investment
  const postMoneyVal = preMoneyVal + investment;
  
  let newSharesTotal = totalInitialShares + investorShares;

  // Option pool dilution adjustment: Option pool shares = New total shares * Option pool percent
  // If option pool is reserved post-money: Option Pool Shares = (New total shares) * optionPoolPercent / (1 - optionPoolPercent)
  let optionPoolShares = 0;
  if (optionPoolPercent > 0 && optionPoolPercent < 100) {
    optionPoolShares = (newSharesTotal * (optionPoolPercent / 100)) / (1 - optionPoolPercent / 100);
    newSharesTotal += optionPoolShares;
  }

  const updatedShareholders: Shareholder[] = initialShareholders.map((s) => ({
    name: s.name,
    shares: s.shares,
    ownershipPercent: (s.shares / newSharesTotal) * 100,
    value: s.shares * pricePerShare,
  }));

  // Add investor
  updatedShareholders.push({
    name: "New Investor",
    shares: investorShares,
    ownershipPercent: (investorShares / newSharesTotal) * 100,
    value: investorShares * pricePerShare,
  });

  // Add option pool
  if (optionPoolPercent > 0) {
    updatedShareholders.push({
      name: "Option Pool",
      shares: optionPoolShares,
      ownershipPercent: (optionPoolShares / newSharesTotal) * 100,
      value: optionPoolShares * pricePerShare,
    });
  }

  return updatedShareholders;
}

// 3. SaaS CAC & LTV
export interface SaasLtvMetrics {
  ltv: number;
  cacRatio: number; // LTV : CAC ratio
  paybackMonths: number;
  cohortRetention: number[]; // customer count over 12 months
}

export function calculateSaasLtv(
  cac: number,
  arpa: number, // average revenue per account
  grossMarginPercent: number,
  monthlyChurnPercent: number,
  startingCustomers = 100
): SaasLtvMetrics {
  const margin = grossMarginPercent / 100;
  const churn = monthlyChurnPercent / 100;

  // LTV = (ARPA * Margin) / Churn
  const ltv = churn > 0 ? (arpa * margin) / churn : 0;
  const cacRatio = cac > 0 ? ltv / cac : 0;
  
  // Payback Period = CAC / (ARPA * Margin)
  const paybackMonths = arpa * margin > 0 ? cac / (arpa * margin) : 0;

  const cohortRetention: number[] = [];
  let currentCustomers = startingCustomers;
  for (let t = 0; t <= 11; t++) {
    cohortRetention.push(currentCustomers);
    currentCustomers = currentCustomers * (1 - churn);
  }

  return {
    ltv,
    cacRatio,
    paybackMonths,
    cohortRetention,
  };
}

// 4. Break-Even Point
export interface BreakEvenMetrics {
  breakEvenUnits: number;
  breakEvenSalesValue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  gridData: {
    units: number;
    fixedCosts: number;
    variableCosts: number;
    totalCosts: number;
    revenue: number;
    profit: number;
  }[];
}

export function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number,
  maxUnitsScale?: number
): BreakEvenMetrics {
  const cm = pricePerUnit - variableCostPerUnit;
  const cmRatio = pricePerUnit > 0 ? cm / pricePerUnit : 0;
  
  const breakEvenUnits = cm > 0 ? fixedCosts / cm : 0;
  const breakEvenSalesValue = breakEvenUnits * pricePerUnit;

  const limit = maxUnitsScale ?? (Math.round(breakEvenUnits * 2) || 1000);
  const step = limit / 10;
  const gridData = [];

  for (let i = 0; i <= 10; i++) {
    const q = Math.round(i * step);
    const vc = q * variableCostPerUnit;
    const rev = q * pricePerUnit;
    const tc = fixedCosts + vc;
    gridData.push({
      units: q,
      fixedCosts,
      variableCosts: vc,
      totalCosts: tc,
      revenue: rev,
      profit: rev - tc,
    });
  }

  return {
    breakEvenUnits,
    breakEvenSalesValue,
    contributionMargin: cm,
    contributionMarginRatio: cmRatio,
    gridData,
  };
}
