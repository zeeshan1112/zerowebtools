import { HowToArticle } from "../articles";

export const FINANCE_ARTICLES: HowToArticle[] = [
  {
    slug: "model-startup-equity",
    title: "How to Calculate Startup Equity Vesting",
    metaDescription: "Model your startup stock options, founder dilution, and 4-year vesting schedules. Free financial calculator for founders and early employees.",
    toolId: "startup-equity",
    sections: [
      {
        heading: "Understanding Startup Equity and Stock Options",
        paragraphs: [
          "Whether you are a founder preparing to issue shares or an early employee evaluating a job offer, understanding the math behind equity is absolutely crucial.",
          "Stock options represent a percentage of ownership in a company, but their true monetary value depends on several complex factors: the company's current valuation, your strike price, the total number of outstanding shares, and inevitable dilution from future funding rounds."
        ]
      },
      {
        heading: "What is a Vesting Schedule?",
        paragraphs: [
          "It's important to know that most startup equity doesn't belong to you immediately upon signing your contract. It is subject to what is called a 'vesting schedule.'",
          "The industry standard in tech is a 4-year vest with a 1-year cliff. This means if you leave the company before 12 months, you get absolutely nothing. However, on your exact 1-year anniversary (the cliff), 25% of your total shares vest immediately. Afterward, the remaining shares vest incrementally every single month for the next three years."
        ]
      },
      {
        heading: "How to Use the Equity Calculator to Forecast Value",
        listItems: [
          "Input Your Option Grant -- Enter the total number of options granted to you in your offer letter.",
          "Set the Timeline -- Define your specific vesting schedule (e.g., a standard 48 months).",
          "Add Valuation Data -- Input the current estimated company valuation and your strike price to accurately model the potential monetary value of your equity.",
          "Visualize Your Future -- View the interactive chart to see exactly how many shares you will own, and what they might be worth, at any given month in the future."
        ]
      },
      {
        heading: "The Impact of Dilution",
        paragraphs: [
          "As your company grows and raises more venture capital (Series A, Series B, etc.), new shares are created and issued to investors. This increases the total pie, but it means your specific slice of the pie becomes a smaller percentage.",
          "Our tool helps you model this dilution so you can set realistic expectations about the final payout of your options during an acquisition or IPO."
        ]
      }
    ],
    faqs: [
      {
        question: "What is a standard equity vesting schedule?",
        answer: "The industry standard for tech startups is a 4-year vesting schedule with a 1-year cliff. You vest 25% of your grant at exactly 12 months, and 1/48th monthly thereafter."
      },
      {
        question: "What does equity dilution mean?",
        answer: "Dilution occurs when a company issues new shares to investors in future funding rounds (e.g. Series A, Series B). This decreases the percentage ownership of all existing shareholders, meaning your options represent a smaller slice of the company."
      }
    ]
  },
  {
    slug: "forecast-saas-mrr-growth",
    title: "How to Forecast SaaS MRR and Growth Projections",
    metaDescription: "Accurately forecast SaaS MRR, net growth, and revenue projections. Use our 100% private, client-side calculator for secure financial modeling.",
    toolId: "saas-mrr",
    sections: [
      {
        heading: "Understanding Monthly Recurring Revenue (MRR) Growth",
        paragraphs: [
          "Whether you are bootstrapping a new software service or raising venture capital, understanding your Monthly Recurring Revenue (MRR) is essential. MRR represents the predictable, recurring monthly income that forms the bedrock of any SaaS business model. Forecasting how this metric compounds over time helps you make key business decisions about hiring, marketing budgets, and product development timelines.",
          "SaaS growth is not just about bringing in new customers; it is a delicate balance of acquisition, customer expansion, and retention. To project growth accurately, you must track multiple variables, including new customer MRR, expansion MRR from existing customers, and churned MRR from cancellations. Together, these elements determine your net growth trajectory."
        ]
      },
      {
        heading: "The Math of SaaS Compound Growth",
        paragraphs: [
          "To forecast recurring revenue, financial models utilize growth assumptions compounding over a specific period. The net new MRR for any given month is calculated with the formula: Net New MRR = New MRR + Expansion MRR - Churned MRR. When projecting forward, a monthly growth rate is applied to the prior month's ending MRR, adjusted for expected churn.",
          "For example, starting with an MRR of $10,000 and assuming a 10% monthly growth rate alongside a 2% monthly revenue churn rate, the subsequent month's projected MRR would compound to approximately $10,800. Running these simulations over 12 to 24 months gives founders a clear roadmap of when their business will reach critical milestones, such as break-even or cash-flow positivity."
        ]
      },
      {
        heading: "How to Model MRR Projections Locally",
        listItems: [
          "Input Starting MRR -- Enter your current monthly recurring revenue as the baseline for the simulation.",
          "Define Growth Rate -- Specify the projected percentage growth rate of your recurring revenue on a monthly basis.",
          "Adjust Churn Percentage -- Set your expected monthly churn rate, reflecting lost revenue from cancellations or downgrades.",
          "Analyze the Forecast -- Run the client-side calculator to visualize your compound growth curve and cash flow projections."
        ]
      },
      {
        heading: "Absolute Privacy for Sensitive SaaS Metrics",
        paragraphs: [
          "Your revenue figures, customer growth rates, and retention rates represent highly confidential trade secrets. Exposing this information to third-party servers raises security and privacy risks. ZeroWebTools protects your data by computing all MRR projections entirely in your web browser. No data is sent to external servers, providing an absolute privacy guarantee for your startup's financials."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between MRR and ARR?",
        answer: "MRR is Monthly Recurring Revenue, representing the recurring revenue earned each month. ARR is Annual Recurring Revenue, which is MRR multiplied by 12, showing the annualized run-rate of your subscription business."
      },
      {
        question: "How do I calculate net MRR growth?",
        answer: "Net MRR growth is computed by adding new customer MRR and expansion MRR from existing customer upgrades, and then subtracting churned MRR from cancellations and downgrades."
      },
      {
        question: "Is my SaaS financial data stored on ZeroWebTools?",
        answer: "No. ZeroWebTools performs all calculations client-side inside your browser sandbox. None of your inputs, projection parameters, or revenue figures are transmitted or saved online."
      }
    ]
  },
  {
    slug: "loan-amortization-schedule-calculator",
    title: "How to Calculate Mortgage Loan Amortization Schedules",
    metaDescription: "Generate a complete mortgage amortization schedule with principal and interest breakdowns. Calculate your monthly loan payments securely in your browser.",
    toolId: "mortgage-calculator",
    sections: [
      {
        heading: "Understanding Mortgage Amortization Schedules",
        paragraphs: [
          "When taking out a home loan, understanding how your monthly payments are distributed over time is crucial for long-term financial planning. Mortgage amortization is the process of paying off a debt over time through regular, equal installments. While the monthly payment amount remains constant throughout the loan term, the internal division of that payment changes dynamically with every period.",
          "In the early years of a mortgage, a significant portion of each payment goes toward paying off the accrued interest, while only a small fraction reduces the principal balance. As the outstanding loan balance decreases, the interest charges shrink, allowing a larger percentage of your payment to go directly toward the principal, accelerating equity build-up."
        ]
      },
      {
        heading: "The Formulas Behind Loan Amortization",
        paragraphs: [
          "To determine your fixed monthly payment, the amortization formula is expressed as: P = L * [r(1+r)^n] / [(1+r)^n - 1]. In this formula, P represents the periodic payment, L is the total loan amount, r is the monthly interest rate (annual interest rate divided by 12), and n is the total number of monthly payments over the term (e.g., 360 payments for a 30-year mortgage).",
          "For each specific payment period, the interest portion is computed by multiplying the remaining loan balance by the monthly interest rate. The principal portion is then calculated by subtracting this interest charge from your fixed monthly payment. Subtracting the principal portion from the outstanding loan balance yields the new remaining principal balance for the next period."
        ]
      },
      {
        heading: "How to Generate and Analyze Your Loan Schedule",
        listItems: [
          "Enter Loan Amount -- Input the home purchase price minus your down payment to establish the initial principal.",
          "Specify the Interest Rate -- Enter the annual interest percentage offered by your lender.",
          "Select the Term -- Choose the duration of the mortgage, typically 15 or 30 years.",
          "Inspect the Breakdown -- Examine the generated table to see the exact principal and interest distribution for every payment."
        ]
      },
      {
        heading: "Why Calculate Mortgage Schedules Client-Side?",
        paragraphs: [
          "Your home purchase budget, income details, and borrowing capacity are highly personal financial matters. Many online mortgage calculators transmit your inputs to third-party databases, often leading to unwanted advertising or target profiling. ZeroWebTools executes all amortization math client-side. Your inputs stay in your browser, protecting your financial privacy completely."
        ]
      }
    ],
    faqs: [
      {
        question: "What is an amortization schedule?",
        answer: "It is a detailed table showing each periodic payment of a loan, highlighting the exact amount allocated to interest, the amount allocated to principal, and the remaining loan balance."
      },
      {
        question: "How do extra payments impact mortgage amortization?",
        answer: "Making additional principal payments reduces the outstanding balance faster. Since interest is calculated based on the remaining balance, this lowers total interest costs and shortens the loan term."
      },
      {
        question: "Are my mortgage inputs uploaded to any server?",
        answer: "No. ZeroWebTools runs entirely in your web browser. All calculations, tables, and charts are generated locally without any server-side data processing."
      }
    ]
  },
  {
    slug: "model-startup-cap-table",
    title: "How to Model a Startup Capitalization Table with Dilution",
    metaDescription: "Model your startup's capitalization table and simulate venture dilution from seed to Series A. Safe, private client-side calculator for founders.",
    toolId: "cap-table",
    sections: [
      {
        heading: "The Strategic Importance of a Capitalization Table",
        paragraphs: [
          "A capitalization table, commonly known as a cap table, is a foundational ledger that records the ownership structure of your startup. It details who owns what percentage of the company, including common stock held by founders, option pools reserved for future employees, and preferred stock held by venture capitalists. For founders, keeping a precise cap table is essential for modeling future fundraises, evaluating exit scenarios, and managing team equity.",
          "Failing to model your cap table accurately can lead to severe founder dilution, misalignment of incentives, or legal complications during transaction diligence. By tracking how ownership stakes change through successive financing rounds, you can negotiate equity distributions from a position of strength and clarity."
        ]
      },
      {
        heading: "The Mechanics of Equity Dilution",
        paragraphs: [
          "Dilution occurs when a company issues new shares to bring in new investors, resulting in existing shareholders owning a smaller percentage of the company. The ownership percentage is calculated using the formula: Ownership % = Shares Owned / Total Outstanding Shares. When modeling a new financing round, the valuation and investment amount dictate how many new shares must be minted.",
          "For instance, if a company raises a Series A round of $2 million on a pre-money valuation of $8 million, the post-money valuation becomes $10 million. The new investors will own 20% of the company, and the ownership percentages of all pre-existing shareholders will scale down by 20%. Incorporating employee option pools and SAFE conversions adds complexity to these calculations, requiring robust modeling tools."
        ]
      },
      {
        heading: "Modeling Your Startup Cap Table Safely",
        listItems: [
          "Define Founder Equity -- Input the initial share allocations for each co-founder to establish the starting ownership.",
          "Set Aside Option Pools -- Add an employee option pool percentage to understand its pre-round dilutive impact.",
          "Simulate Investment Rounds -- Enter pre-money valuations and investment sizes to see how new funding dilutes existing holders.",
          "Analyze the Post-Round Table -- Review the updated share counts and percentage ownership for all stakeholders."
        ]
      },
      {
        heading: "Absolute Privacy for Your Capital Structure",
        paragraphs: [
          "A startup's cap table contains highly sensitive data, including founder names, individual share counts, and confidential valuation terms. Uploading this information to cloud databases exposes your startup to security vulnerabilities and unauthorized exposure. ZeroWebTools processes all capitalization modeling locally in your web browser. No equity structure data ever leaves your computer, ensuring total confidentiality."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between pre-money and post-money valuation?",
        answer: "Pre-money valuation is the agreed-upon value of the startup before receiving new investment. Post-money valuation is the pre-money valuation plus the total amount of new capital invested."
      },
      {
        question: "How does an employee option pool impact founders?",
        answer: "Creating or expanding an employee option pool prior to a funding round dilutes the founders and existing shareholders, rather than the incoming investors, depending on the agreed investment terms."
      },
      {
        question: "Is my company cap table data saved online?",
        answer: "No. ZeroWebTools runs 100% in-browser using client-side JavaScript. None of your cap table metrics or stakeholder names are ever sent to external servers."
      }
    ]
  },
  {
    slug: "calculate-saas-customer-ltv",
    title: "How to Calculate SaaS Customer LTV and CAC Efficiency",
    metaDescription: "Calculate SaaS Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC), and LTV:CAC ratio. Free client-side calculator for subscription startups.",
    toolId: "saas-ltv",
    sections: [
      {
        heading: "Unlocking SaaS Unit Economics",
        paragraphs: [
          "For subscription-based software businesses, unit economics serve as the ultimate indicator of financial health and growth efficiency. Two metrics sit at the center of this analysis: Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC). LTV estimates the total gross profit you expect to generate from a single customer over their relationship with your business, while CAC represents the average expense required to acquire a new customer.",
          "Evaluating these metrics in isolation is helpful, but analyzing their relationship is where founders find strategic clarity. The ratio between LTV and CAC reveals whether your growth engine is efficient and sustainable. A healthy unit economic model allows startups to scale marketing budgets confidently, knowing each new dollar spent yields profitable long-term returns."
        ]
      },
      {
        heading: "Formulas for LTV, CAC, and Payback Period",
        paragraphs: [
          "Calculating LTV requires understanding revenue, margin, and churn. The standard formula is: LTV = (ARPU * Gross Margin %) / Monthly Churn Rate, where ARPU is the Average Revenue Per User. CAC is calculated by dividing total sales and marketing expenses by the number of new customers acquired during the same period: CAC = Total Marketing Spend / Customers Acquired.",
          "The LTV:CAC ratio is then found by dividing LTV by CAC. The industry-accepted benchmark for a healthy SaaS business is 3:1 or higher. Additionally, calculating the CAC Payback Period (CAC / [ARPU * Gross Margin %]) tells you how many months it takes for a customer to generate enough gross profit to recover their acquisition costs."
        ]
      },
      {
        heading: "How to Model Unit Economics Offline",
        listItems: [
          "Input ARPU and Margins -- Enter the average subscription price and the gross margin percentage of your service.",
          "Define Churn and CAC -- Input the monthly customer churn rate along with your average customer acquisition cost.",
          "Check the LTV:CAC Ratio -- View the calculated ratio to determine if your unit economics meet industry benchmarks.",
          "Review Payback Metrics -- Observe how many months are required to break even on your marketing and sales expenses."
        ]
      },
      {
        heading: "Protecting Your Customer and Marketing Metrics",
        paragraphs: [
          "Details about marketing budgets, customer acquisition costs, and churn rates are sensitive proprietary metrics. Sharing them with online platforms or cloud calculators exposes your business model to competitive intelligence risks. ZeroWebTools protects your data by computing LTV and CAC metrics locally in your browser. All inputs remain in memory and are never uploaded to any server."
        ]
      }
    ],
    faqs: [
      {
        question: "What is a good LTV:CAC ratio for SaaS?",
        answer: "A ratio of 3:1 is considered the healthy benchmark for SaaS startups. Ratios below 3:1 indicate high customer acquisition costs, while ratios above 5:1 suggest under-investing in growth."
      },
      {
        question: "Why is gross margin included in LTV calculations?",
        answer: "Using revenue instead of gross margin overestimates LTV. To measure true financial contribution, LTV must reflect the actual profit generated after subtracting the costs to deliver the service."
      },
      {
        question: "Are my marketing expense figures stored online?",
        answer: "No. All financial calculations occur locally within your web browser, ensuring your acquisition costs, margins, and churn rates remain entirely private."
      }
    ]
  },
  {
    slug: "calculate-break-even-point-business",
    title: "How to Calculate Business Break Even Point Offline",
    metaDescription: "Find your business break-even point in units and sales dollars. Secure, offline client-side calculator for retail, SaaS, and service businesses.",
    toolId: "break-even",
    sections: [
      {
        heading: "Understanding the Business Break-Even Point",
        paragraphs: [
          "Every business owner, whether running a local retail shop, a digital agency, or a SaaS company, must identify the threshold where their business becomes profitable. The break-even point is the precise volume of sales at which total revenue equals total operating costs. At this point, the business generates zero net profit, but also incurs zero financial loss.",
          "Conducting a break-even analysis is an essential step in business planning. It helps you set product pricing, evaluate feasibility, define monthly sales quotas, and determine how adjustments to fixed overhead or production costs will impact your bottom line."
        ]
      },
      {
        heading: "The Break-Even Calculation Formulas",
        paragraphs: [
          "To compute the break-even point, you must categorize expenses into fixed costs and variable costs. Fixed costs are overheads that remain constant regardless of sales volume, such as rent and salaries. Variable costs fluctuate directly with sales volume, such as manufacturing materials and shipping fees. The contribution margin per unit is calculated as: Unit Selling Price - Variable Cost Per Unit.",
          "The break-even point in units is calculated using the formula: Break-Even Units = Fixed Costs / Contribution Margin Per Unit. To express this in total sales revenue rather than physical units, use the formula: Break-Even Sales = Fixed Costs / Contribution Margin Ratio, where the ratio is the contribution margin divided by the unit selling price."
        ]
      },
      {
        heading: "How to Simulate Profitability Scenarios",
        listItems: [
          "Input Fixed Costs -- Enter all recurring overhead expenses, including salaries, rent, insurance, and utilities.",
          "Input Unit Pricing -- Specify the price at which you sell a single unit of your product or service.",
          "Input Variable Costs -- Enter the cost of producing or delivering a single unit of your product or service.",
          "Analyze the Break-Even Volume -- Review the minimum number of units and sales revenue required to cover expenses."
        ]
      },
      {
        heading: "Keep Your Financial Strategies Confidential",
        paragraphs: [
          "Your business cost structures, raw material expenses, and product pricing models are highly proprietary. Inputting these figures into public cloud tools exposes your operational data to security and espionage risks. ZeroWebTools performs all break-even calculations locally on your device. Your sensitive financial data is never sent online, ensuring absolute confidentiality."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between fixed and variable costs?",
        answer: "Fixed costs are consistent overhead expenses (e.g., rent, payroll) that do not change with production volume. Variable costs are directly tied to production volume (e.g., raw materials, payment fees)."
      },
      {
        question: "How can I lower my business break-even point?",
        answer: "You can lower your break-even point by reducing fixed operating overhead, minimizing variable costs per unit, or raising the unit price of your product."
      },
      {
        question: "Is my business cost data safe on ZeroWebTools?",
        answer: "Yes. The calculator uses pure client-side code to compute your break-even point. No data is stored, tracked, or transmitted to any external server."
      }
    ]
  }
];
