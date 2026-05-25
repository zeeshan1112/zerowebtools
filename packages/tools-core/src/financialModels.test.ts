import { describe, test, expect } from "vitest";
import {
  calculateAmortization,
  modelDilutionRound,
  calculateSaasLtv,
  calculateBreakEven,
} from "./financialModels";

describe("financialModels tests", () => {
  test("calculates amortization monthly payments correctly", () => {
    const loan = calculateAmortization(300000, 4, 30);
    // principal = $300k, 4% interest rate, 30 years
    // payment should be around $1432.25
    expect(loan.monthlyPayment).toBeCloseTo(1432.25, 1);
    expect(loan.totalPayments).toBe(360);
    expect(loan.periods.length).toBe(360);
    expect(loan.periods[359].remainingBalance).toBeCloseTo(0, 0);
  });

  test("calculates equity dilution rounds correctly", () => {
    const initialShares = [
      { name: "Founder 1", shares: 4000000, ownershipPercent: 50, value: 0 },
      { name: "Founder 2", shares: 4000000, ownershipPercent: 50, value: 0 },
    ];
    // Seed investment: $2,000,000 at $8,000,000 pre-money valuation
    const updated = modelDilutionRound(initialShares, 2000000, 8000000);
    
    // Total original shares = 8,000,000. Price/share = 8M/8M = $1.00. Investor shares = 2,000,000.
    // Total new shares = 10,000,000. Ownership percentages: founders = 40% each, investor = 20%.
    expect(updated[0].ownershipPercent).toBe(40);
    expect(updated[1].ownershipPercent).toBe(40);
    expect(updated[2].name).toBe("New Investor");
    expect(updated[2].ownershipPercent).toBe(20);
    expect(updated[2].shares).toBe(2000000);
  });

  test("calculates SaaS CAC & LTV cohorts correctly", () => {
    const metrics = calculateSaasLtv(150, 50, 80, 2);
    // CAC = $150, ARPA = $50, GM = 80%, Churn = 2%
    // ARPA * Margin = $40. LTV = $40 / 0.02 = $2000.
    // Payback Period = 150 / 40 = 3.75 months.
    expect(metrics.ltv).toBe(2000);
    expect(metrics.cacRatio).toBeCloseTo(13.33, 1);
    expect(metrics.paybackMonths).toBe(3.75);
    expect(metrics.cohortRetention[0]).toBe(100);
    expect(metrics.cohortRetention[1]).toBe(98);
  });

  test("calculates Break-Even points correctly", () => {
    const be = calculateBreakEven(5000, 10, 50);
    // Fixed = $5000, VC = $10, Price = $50
    // CM = $40. BE Units = 5000 / 40 = 125 units.
    // Sales value = 125 * 50 = $6250.
    expect(be.breakEvenUnits).toBe(125);
    expect(be.breakEvenSalesValue).toBe(6250);
    expect(be.contributionMargin).toBe(40);
    expect(be.contributionMarginRatio).toBe(0.8);
    expect(be.gridData.length).toBe(11);
  });
});
