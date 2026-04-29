(function () {
  const STORAGE_KEYS = {
    accounts: "lifequest_accounts_v3",
    session: "lifequest_session_v3",
    scores: "lifequest_scores_v3",
  };

  const missionFacts = [
    "Smart Futures Financial Literacy is a student-founded nonprofit in Armonk, New York.",
    "Its mission is to make financial literacy free, practical, and available to every student, especially in underserved communities.",
    "The program is peer-designed and peer-delivered, with a 60-minute curriculum on money basics, budgeting, saving, banking, credit, and investing.",
    "Life Quest is the simulation capstone where students manage real tradeoffs for 12 months and learn by doing.",
  ];

  const profiles = [
    {
      name: "Maya Thompson",
      age: 22,
      city: "Atlanta, GA",
      career: "Medical Assistant",
      monthlyIncome: 3200,
      startingSavings: 900,
      fixedExpenses: 1820,
      goal: { type: "savings", target: 3500, text: "Build a $3,500 emergency fund." },
    },
    {
      name: "Diego Ramirez",
      age: 24,
      city: "Phoenix, AZ",
      career: "IT Support Specialist",
      monthlyIncome: 4100,
      startingSavings: 1200,
      fixedExpenses: 2160,
      goal: { type: "investments", target: 6000, text: "Grow investments to $6,000." },
    },
    {
      name: "Ava Brooks",
      age: 23,
      city: "Charlotte, NC",
      career: "Graphic Designer",
      monthlyIncome: 3650,
      startingSavings: 700,
      fixedExpenses: 2010,
      goal: { type: "netWorth", target: 8500, text: "Reach an $8,500 net worth." },
    },
    {
      name: "Jalen Carter",
      age: 25,
      city: "Detroit, MI",
      career: "Automotive Technician",
      monthlyIncome: 4450,
      startingSavings: 1500,
      fixedExpenses: 2420,
      goal: { type: "credit", target: 740, text: "Raise credit score to 740." },
    },
    {
      name: "Nia Patel",
      age: 21,
      city: "Jersey City, NJ",
      career: "Retail Supervisor",
      monthlyIncome: 3380,
      startingSavings: 500,
      fixedExpenses: 1900,
      goal: { type: "savings", target: 4200, text: "Save enough to cover 3 months of needs." },
    },
    {
      name: "Marcus Lee",
      age: 26,
      city: "Houston, TX",
      career: "Junior Accountant",
      monthlyIncome: 4720,
      startingSavings: 1800,
      fixedExpenses: 2490,
      goal: { type: "netWorth", target: 11000, text: "Finish with an $11,000 net worth." },
    },
  ];

  const events = [
    {
      title: "Car Repair Shock",
      narrative: "Your car started making the exact sound every budget fears.",
      lesson: "Unexpected repairs are why emergency funds matter.",
      choices: [
        { label: "Pay the mechanic now", note: "Reliable fix, immediate cost.", impact: { cash: -650 } },
        { label: "Use public transit this month", note: "Less cash hit, slower commute.", impact: { cash: -180, balance: -3 } },
        { label: "Put it on a credit card", note: "Protects cash now, hurts credit later.", impact: { credit: -20, recurringExpense: 65, cash: -60 } },
      ],
    },
    {
      title: "Performance Bonus",
      narrative: "You stepped up at work and management noticed.",
      lesson: "Extra income changes your future fastest when you save or invest it instead of instantly spending it.",
      choices: [
        { label: "Save the bonus", note: "Best for resilience.", impact: { cash: 500, score: 24 } },
        { label: "Split it with investing", note: "Balanced growth move.", impact: { cash: 250, bonusInvest: 250, score: 16 } },
        { label: "Celebrate big", note: "Fun now, less protection later.", impact: { cash: 80, score: -6 } },
      ],
    },
    {
      title: "Medical Deductible",
      narrative: "A surprise urgent care visit leaves you with a bill after insurance.",
      lesson: "Even insured people still need cash reserves for health costs.",
      choices: [
        { label: "Pay from savings", note: "Avoids new debt.", impact: { cash: -420, score: 12 } },
        { label: "Payment plan", note: "Spreads the pain, creates drag.", impact: { cash: -120, recurringExpense: 55, credit: -8 } },
      ],
    },
    {
      title: "Rent Increase Notice",
      narrative: "Your landlord just emailed next month's lease update.",
      lesson: "Housing inflation changes the entire budget, not just one line item.",
      choices: [
        { label: "Absorb the increase", note: "Simple, but tighter months ahead.", impact: { recurringExpense: 145, score: -8 } },
        { label: "Find a roommate", note: "Some friction, better long-term cash flow.", impact: { cash: -220, recurringExpense: -90, balance: -4, score: 10 } },
      ],
    },
    {
      title: "Family Request",
      narrative: "A close relative needs help covering a shortfall this month.",
      lesson: "Helping others is real life. Financial boundaries are real strategy.",
      choices: [
        { label: "Give $300", note: "Generous, but tight for you.", impact: { cash: -300, score: 4 } },
        { label: "Contribute $150", note: "Support within your limits.", impact: { cash: -150, score: 12 } },
        { label: "Say no this time", note: "Awkward, but preserves stability.", impact: { balance: -2, score: 6 } },
      ],
    },
    {
      title: "Hours Cut",
      narrative: "Business slows down and your next paycheck shrinks.",
      lesson: "Income risk is exactly why liquidity matters.",
      choices: [
        { label: "Take overtime elsewhere", note: "Hard month, but you cover it.", impact: { balance: -5, cash: 120 } },
        { label: "Absorb the hit", note: "Less stress, less income.", impact: { income: -320, score: -8 } },
      ],
    },
    {
      title: "Scholarship Grant",
      narrative: "A local community grant you forgot about just hit your inbox.",
      lesson: "Opportunity often goes to the people who actually apply.",
      choices: [
        { label: "Take the grant", note: "No strings attached.", impact: { cash: 650, score: 22 } },
      ],
    },
    {
      title: "Phone Dies",
      narrative: "Your phone gives up permanently on a random Tuesday.",
      lesson: "Small emergencies still matter when cash is already thin.",
      choices: [
        { label: "Buy refurbished", note: "Cheaper, practical move.", impact: { cash: -240, score: 10 } },
        { label: "Finance a new one", note: "Shiny now, recurring drag later.", impact: { cash: -60, recurringExpense: 48, credit: -10 } },
      ],
    },
  ];

  const opportunities = [
    {
      title: "Employer Match Window",
      copy: "Your employer is matching retirement contributions this month only.",
      minCost: 200,
      maxCost: 800,
      resolution: { type: "match", ratio: 1 },
      risk: "low",
    },
    {
      title: "Career Certificate",
      copy: "A short credential could increase future income if you invest in it now.",
      minCost: 300,
      maxCost: 900,
      resolution: { type: "incomeBoost", gain: 140 },
      risk: "medium",
    },
    {
      title: "Fractional Real Estate Pool",
      copy: "A community investment pool offers steady dividends over the final months.",
      minCost: 250,
      maxCost: 1000,
      resolution: { type: "return", multiplier: 1.22, maturityOffset: 3 },
      risk: "medium",
    },
    {
      title: "Friend's Startup Pre-Seed",
      copy: "High upside. High chaos. Entirely believable.",
      minCost: 150,
      maxCost: 700,
      resolution: { type: "binary", win: 2.4, lose: 0.25, maturityOffset: 4 },
      risk: "high",
    },
  ];

  const investmentOptions = [
    { id: "cash", title: "Money Market", risk: "low", expected: 0.004, blurb: "Stable, liquid, low upside." },
    { id: "bonds", title: "Savings Bonds", risk: "low", expected: 0.008, blurb: "Reliable returns for steady players." },
    { id: "index", title: "Global Index Fund", risk: "medium", expected: 0.02, blurb: "Diversified long-term growth engine." },
    { id: "stocks", title: "Growth Stocks", risk: "medium", expected: 0.03, blurb: "Higher upside with sharper swings." },
    { id: "realestate", title: "REIT Basket", risk: "medium", expected: 0.017, blurb: "Income-oriented real asset exposure." },
    { id: "crypto", title: "Digital Assets", risk: "high", expected: 0.045, blurb: "Fast moves, hard lessons." },
  ];

  const marketCycles = [
    { name: "Calm Expansion", modifier: 0.008 },
    { name: "Bull Run", modifier: 0.02 },
    { name: "Volatile Tape", modifier: -0.006 },
    { name: "Inflation Grind", modifier: -0.012 },
    { name: "Recovery", modifier: 0.014 },
  ];

  const monthlyChallenges = [
    {
      prompt: "Which budget category protects you first when life gets weird?",
      options: ["Luxury spending", "Emergency fund", "Crypto", "Travel"],
      answer: 1,
      explanation: "Emergency funds matter because surprise costs almost never wait for the perfect month. Cash reserves buy you time and keep bad luck from turning into debt.",
    },
    {
      prompt: "What usually has the best long-term growth potential?",
      options: ["Money market fund", "High-yield savings", "Broad stock index fund", "Cash under mattress"],
      answer: 2,
      explanation: "Broad index funds historically compound more than cash over long periods, but they come with volatility. Time and diversification matter.",
    },
    {
      prompt: "If inflation rises, your cash buys...",
      options: ["More", "The same", "Less", "Nothing"],
      answer: 2,
      explanation: "Inflation reduces purchasing power. The dollar amount can stay the same while the real value quietly falls.",
    },
    {
      prompt: "Which behavior usually helps credit the most?",
      options: ["Missing payments", "Maxing cards", "On-time payments", "Opening many accounts at once"],
      answer: 2,
      explanation: "On-time payments are one of the strongest long-term signals in a credit score. Reliability matters more than flashy moves.",
    },
  ];

  const learnModules = [
    {
      id: "budgeting",
      title: "Budgeting Basics",
      text: "LifeQuest uses a monthly salary and real fixed costs so players feel the tradeoffs between needs, wants, savings, and investing.",
      rewardCash: 140,
      rewardPoints: 60,
      questions: [
        {
          prompt: "If you earn $3,000 and fixed needs cost $1,800, how much discretionary money is left before saving or investing?",
          options: ["$1,200", "$900", "$1,800", "$600"],
          answer: 0,
          explanation: "Discretionary money is what remains after fixed needs. $3,000 income minus $1,800 of fixed needs leaves $1,200 to divide across wants, savings, and investing.",
        },
        {
          prompt: "Why is a budget useful even when your income is small?",
          options: ["It creates money", "It helps every dollar get a job", "It removes all risk", "It guarantees good credit"],
          answer: 1,
          explanation: "A budget does not magically increase income, but it does force intentional choices. That reduces waste and makes tradeoffs visible before money disappears.",
        },
      ],
    },
    {
      id: "saving",
      title: "Saving",
      text: "The game rewards keeping cash reserves because resilience matters more than looking rich for one month.",
      rewardCash: 150,
      rewardPoints: 70,
      questions: [
        {
          prompt: "What is the main job of an emergency fund?",
          options: ["Beat the stock market", "Pay for predictable bills", "Absorb unexpected costs", "Increase your credit limit"],
          answer: 2,
          explanation: "An emergency fund exists to absorb shocks like repairs, deductibles, and income interruptions. It protects your plan when life does not cooperate.",
        },
        {
          prompt: "If you save first every month, what usually improves?",
          options: ["Impulse control and flexibility", "Inflation disappears", "Rent gets cheaper", "Taxes become optional"],
          answer: 0,
          explanation: "Paying yourself first builds a buffer before spending expands to fill the month. That creates flexibility and reduces stress when something changes.",
        },
      ],
    },
    {
      id: "banking",
      title: "Banking",
      text: "Cash flow is survival. Staying liquid keeps small problems from becoming loan problems.",
      rewardCash: 130,
      rewardPoints: 65,
      questions: [
        {
          prompt: "Why does liquidity matter in personal finance?",
          options: ["Because investments are always bad", "Because available cash handles surprises faster", "Because checking accounts pay the most", "Because it raises your salary"],
          answer: 1,
          explanation: "Liquidity means money you can use right now. When a bill or emergency shows up, liquid cash solves the problem without forcing you to borrow or sell assets badly.",
        },
        {
          prompt: "Which account is usually best for day-to-day bills?",
          options: ["Checking account", "Retirement account", "529 plan", "Brokerage margin account"],
          answer: 0,
          explanation: "A checking account is built for regular transactions, bill payments, and cash access. Long-term investment accounts are for different goals.",
        },
      ],
    },
    {
      id: "credit",
      title: "Credit",
      text: "Bad short-term decisions often echo forward through recurring costs and credit damage.",
      rewardCash: 150,
      rewardPoints: 75,
      questions: [
        {
          prompt: "Which action usually hurts your credit score?",
          options: ["Paying on time", "Keeping balances low", "Missing a payment", "Using one card carefully"],
          answer: 2,
          explanation: "Missed payments are one of the clearest negative credit signals because they suggest unreliability. Damage can linger far longer than the late month itself.",
        },
        {
          prompt: "Why is credit important even if you hate debt?",
          options: ["It is required for all jobs", "It affects borrowing cost and access", "It removes inflation", "It replaces savings"],
          answer: 1,
          explanation: "Credit affects whether lenders trust you and what rate they charge. Strong credit can lower the cost of necessary borrowing, while weak credit makes everything pricier.",
        },
      ],
    },
    {
      id: "investing",
      title: "Investing",
      text: "Players experience different risk bands, volatility, and why diversification beats guessing.",
      rewardCash: 170,
      rewardPoints: 80,
      questions: [
        {
          prompt: "Why do people invest instead of leaving everything in cash?",
          options: ["To avoid all risk", "To outgrow inflation over time", "To guarantee quick riches", "To stop expenses"],
          answer: 1,
          explanation: "Investing is one of the main ways to outgrow inflation and build wealth over time. It does not remove risk, but it gives your money a chance to compound.",
        },
        {
          prompt: "What is diversification?",
          options: ["Buying one thing you believe in", "Spreading risk across assets", "Only using savings accounts", "Avoiding markets forever"],
          answer: 1,
          explanation: "Diversification spreads your money across different assets so one bad result does less damage. It is a defense against overconfidence and concentrated risk.",
        },
      ],
    },
    {
      id: "inflation",
      title: "Inflation",
      text: "Rising prices quietly pressure groceries, rent, and transportation, which changes smart allocation choices.",
      rewardCash: 130,
      rewardPoints: 65,
      questions: [
        {
          prompt: "If inflation is high, what happens to purchasing power?",
          options: ["It rises automatically", "It stays flat", "It falls", "It disappears only for food"],
          answer: 2,
          explanation: "Purchasing power falls when prices rise faster than your money grows. The same paycheck starts covering less life.",
        },
        {
          prompt: "Which habit helps defend against inflation long term?",
          options: ["Ignoring it", "Investing thoughtfully", "Keeping all cash forever", "Spending faster"],
          answer: 1,
          explanation: "Thoughtful investing gives your money a chance to grow faster than inflation over time. Doing nothing leaves cash vulnerable to quiet erosion.",
        },
      ],
    },
    {
      id: "emergency",
      title: "Emergency Funds",
      text: "One of the clearest game lessons is that cash reserves turn disasters into inconveniences.",
      rewardCash: 160,
      rewardPoints: 70,
      questions: [
        {
          prompt: "Why do emergency funds reduce financial stress?",
          options: ["They guarantee no emergencies", "They let you solve problems without immediate debt", "They raise your credit score instantly", "They lower taxes"],
          answer: 1,
          explanation: "Cash reserves do not stop emergencies, but they change your options. Instead of panic-borrowing, you can pay and recover with control.",
        },
        {
          prompt: "Which is a realistic first emergency-fund milestone for many people?",
          options: ["$10,000 in a week", "$500 to $1,000", "$0 forever", "One luxury vacation"],
          answer: 1,
          explanation: "A smaller first milestone is practical and still meaningful. Even a few hundred dollars can stop a small emergency from turning into a crisis.",
        },
      ],
    },
    {
      id: "goal",
      title: "Goal Setting",
      text: "Each life profile has a concrete target. Great finance decisions become easier when the target is specific.",
      rewardCash: 140,
      rewardPoints: 60,
      questions: [
        {
          prompt: "Why are specific financial goals useful?",
          options: ["They remove tradeoffs", "They help you judge whether choices move you forward", "They guarantee investment gains", "They replace budgeting"],
          answer: 1,
          explanation: "Specific goals create a measuring stick. Once you know the target, it becomes easier to tell whether spending, saving, and investing choices actually help.",
        },
        {
          prompt: "Which goal is strongest?",
          options: ["Be richer someday", "Save more maybe", "Reach $4,000 emergency savings by December", "Worry less"],
          answer: 2,
          explanation: "Strong goals are concrete and time-bound. They make progress visible and keep decisions from staying vague.",
        },
      ],
    },
  ];

  const miniChallenges = [
    {
      id: "need-vs-want",
      title: "Need vs Want Blitz",
      text: "Classify real spending choices and defend your instincts.",
      rewardCash: 220,
      rewardPoints: 90,
      questions: [
        {
          prompt: "Which item is usually a need?",
          options: ["Groceries", "Concert ticket", "Limited-edition sneakers", "Gaming DLC"],
          answer: 0,
          explanation: "Needs are things tied to basic living and function. Groceries support health and daily life, while the others are discretionary wants for most people.",
        },
        {
          prompt: "If money is tight, which category should shrink first?",
          options: ["Rent", "Medication", "Entertainment extras", "Transportation to work"],
          answer: 2,
          explanation: "Wants should usually flex before needs. Entertainment is optional compared with housing, health, and work-related transportation.",
        },
        {
          prompt: "Why does confusing wants with needs create problems?",
          options: ["Because fun is illegal", "Because it hides tradeoffs and crowds out savings", "Because banks ban it", "Because inflation only affects needs"],
          answer: 1,
          explanation: "When wants get treated like fixed needs, the budget loses flexibility. That usually means less saving, more stress, and weaker responses to emergencies.",
        },
      ],
    },
    {
      id: "risk-radar",
      title: "Risk Radar",
      text: "Read an asset and label its risk level correctly.",
      rewardCash: 240,
      rewardPoints: 95,
      questions: [
        {
          prompt: "What risk level best fits a government savings bond?",
          options: ["Low", "Medium", "High", "Extreme"],
          answer: 0,
          explanation: "Government savings bonds tend to have lower risk because repayment is backed by the issuer and price swings are usually limited compared with stocks or crypto.",
        },
        {
          prompt: "What risk level best fits a single meme stock?",
          options: ["Low", "Medium", "High", "No risk"],
          answer: 2,
          explanation: "A single speculative stock is high risk because outcomes depend on one business and investor emotion can swing price dramatically.",
        },
        {
          prompt: "What usually lowers overall portfolio risk?",
          options: ["Concentrating in one hot asset", "Diversifying across asset types", "Ignoring volatility", "Only chasing headlines"],
          answer: 1,
          explanation: "Diversification lowers concentration risk. Different assets do not always move the same way, which can smooth the ride.",
        },
      ],
    },
    {
      id: "compound-quest",
      title: "Compound Quest",
      text: "Practice the logic behind compounding and time.",
      rewardCash: 250,
      rewardPoints: 100,
      questions: [
        {
          prompt: "$100 invested at 10% for one year becomes about...",
          options: ["$90", "$100", "$110", "$120"],
          answer: 2,
          explanation: "Ten percent of $100 is $10, so after one year the balance is about $110. The power of compounding becomes larger over longer periods.",
        },
        {
          prompt: "What makes compounding stronger?",
          options: ["Starting later", "Reinvesting gains", "Pulling money out quickly", "Avoiding all growth assets"],
          answer: 1,
          explanation: "Reinvesting gains means returns begin earning returns. That feedback loop is the engine behind compounding.",
        },
        {
          prompt: "What is the most powerful partner of compound growth?",
          options: ["Time", "Impulse spending", "Inflation alone", "Guessing tops and bottoms"],
          answer: 0,
          explanation: "Time is critical because compounding needs many cycles to snowball. Starting earlier usually matters more than being perfect later.",
        },
      ],
    },
    {
      id: "stock-trader",
      title: "Stock Market Trader",
      text: "Interpret headlines without panicking.",
      rewardCash: 320,
      rewardPoints: 120,
      questions: [
        {
          prompt: "A company misses earnings and lowers guidance. What signal is that?",
          options: ["Bullish", "Bearish", "Risk-free", "Neutral forever"],
          answer: 1,
          explanation: "Missing earnings and reducing forward expectations usually weakens confidence. It is a bearish signal because the outlook got worse, not better.",
        },
        {
          prompt: "A broad index fund is usually safer than one stock because...",
          options: ["It never falls", "It spreads business-specific risk", "It guarantees profits", "It ignores the economy"],
          answer: 1,
          explanation: "An index fund owns many companies, so one bad earnings report matters less. That is one reason diversified funds are often better starting points.",
        },
        {
          prompt: "Which behavior is usually smarter than reacting to every headline?",
          options: ["Chasing spikes", "Building a consistent plan", "Buying only rumors", "Selling everything on red days"],
          answer: 1,
          explanation: "A consistent plan beats emotional trading for most people. Headlines matter, but random reactions usually create more noise than skill.",
        },
      ],
    },
    {
      id: "debt-snowball",
      title: "Debt Snowball Challenge",
      text: "Learn payoff sequencing and tradeoffs.",
      rewardCash: 260,
      rewardPoints: 105,
      questions: [
        {
          prompt: "Which debt would the snowball method usually attack first?",
          options: ["The biggest balance", "The smallest balance", "The newest debt", "The longest loan"],
          answer: 1,
          explanation: "The snowball method attacks the smallest balance first to create momentum and quick wins. It is behaviorally powerful even if not always cheapest mathematically.",
        },
        {
          prompt: "Which strategy usually saves the most interest mathematically?",
          options: ["Snowball", "Avalanche", "Ignore it", "Open new debt"],
          answer: 1,
          explanation: "The avalanche method targets the highest interest rate first, which usually minimizes total interest paid over time.",
        },
        {
          prompt: "What makes debt dangerous in a weak budget?",
          options: ["It creates recurring obligations", "It raises income", "It increases savings automatically", "It improves liquidity"],
          answer: 0,
          explanation: "Debt adds recurring obligations that reduce future flexibility. A tight budget becomes even tighter once payments start consuming monthly income.",
        },
      ],
    },
  ];

  const app = document.getElementById("app");

  const appState = {
    tab: "home",
    authMode: "signin",
    account: null,
    game: null,
    budgetDraft: { wants: 0, savings: 0, investing: 0 },
    activeBudgetSlider: null,
    investDraft: {},
    activeInvestSlider: null,
    selectedEventChoice: 0,
    selectedChallengeAnswer: null,
    challengeAnswered: false,
    challengeCorrect: false,
    pendingOpportunityAmount: 0,
    quizState: null,
    toast: "",
  };

  const guestAccount = {
    id: "guest-local",
    firstName: "Player",
    lastName: "",
    email: "",
    password: "",
    wallet: 0,
    academyPoints: 0,
    bestScore: 0,
    completedQuizzes: {},
    save: null,
    createdAt: 0,
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function currency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function randomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.accounts) || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveAccounts(accounts) {
    localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
  }

  function updateAccount(mutator) {
    if (!appState.account) return;
    if (appState.account.id === guestAccount.id) {
      appState.account = mutator(deepClone(appState.account));
      return;
    }
    const accounts = getAccounts();
    const index = accounts.findIndex((item) => item.id === appState.account.id);
    if (index === -1) return;
    const next = mutator(deepClone(accounts[index]));
    accounts[index] = next;
    saveAccounts(accounts);
    appState.account = deepClone(next);
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEYS.session);
    appState.account = deepClone(guestAccount);
    appState.game = null;
    appState.quizState = null;
    appState.tab = "home";
    render();
  }

  function saveProgress() {
    if (!appState.account) return;
    updateAccount((account) => {
      account.save = deepClone(appState.game);
      return account;
    });
  }

  function clearProgress() {
    if (!appState.account) return;
    updateAccount((account) => {
      account.save = null;
      return account;
    });
  }

  function getScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.scores) || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveScores(scores) {
    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores.slice(0, 20)));
  }

  function toast(message) {
    appState.toast = message;
    render();
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => {
      appState.toast = "";
      render();
    }, 2600);
  }

  function currentIncome(game) {
    const loanBurden = game.loans.reduce((sum, loan) => sum + loan.payment, 0);
    return game.profile.monthlyIncome + game.recurringIncomeDelta - loanBurden;
  }

  function currentNeeds(game) {
    return Math.max(0, game.profile.fixedExpenses + game.recurringExpenseDelta);
  }

  function getDiscretionary(game) {
    return Math.max(0, currentIncome(game) - currentNeeds(game));
  }

  function getNeedsBreakdown(game) {
    const base = Math.max(0, game.profile.fixedExpenses);
    const rent = Math.round(base * 0.52);
    const groceries = Math.round(base * 0.18);
    const transport = Math.round(base * 0.12);
    const utilities = Math.round(base * 0.1);
    const insurance = Math.max(0, base - rent - groceries - transport - utilities);
    const recurringDelta = game.recurringExpenseDelta || 0;
    return {
      rent,
      groceries,
      transport,
      utilities,
      insurance,
      recurringDelta,
      total: currentNeeds(game),
    };
  }

  function maybeOpportunity(month) {
    if (month % 3 === 0 || Math.random() > 0.62) {
      return deepClone(randomFrom(opportunities));
    }
    return null;
  }

  function maybeChallenge(month) {
    if (month % 2 === 0 || Math.random() > 0.5) {
      return deepClone(randomFrom(monthlyChallenges));
    }
    return null;
  }

  function createGame() {
    const profile = deepClone(randomFrom(profiles));
    let academyBonus = 0;

    if (appState.account && appState.account.wallet > 0) {
      academyBonus = appState.account.wallet;
      updateAccount((account) => {
        account.wallet = 0;
        return account;
      });
    }

    const game = {
      startedAt: Date.now(),
      month: 1,
      stage: "event",
      profile,
      market: deepClone(randomFrom(marketCycles)),
      cash: profile.startingSavings + academyBonus,
      academyBonus,
      investmentsTotal: 0,
      portfolio: investmentOptions.reduce((acc, option) => {
        acc[option.id] = 0;
        return acc;
      }, {}),
      creditScore: 670,
      workLifeBalance: 68,
      totalSaved: 0,
      totalInvested: 0,
      totalNeeds: 0,
      wantsSpend: 0,
      recurringIncomeDelta: 0,
      recurringExpenseDelta: 0,
      event: deepClone(randomFrom(events)),
      eventResolved: false,
      history: [],
      opportunity: maybeOpportunity(1),
      challenge: maybeChallenge(1),
      challengeDone: false,
      activeOpportunities: [],
      loans: [],
      bonusInvestPool: 0,
      score: 0,
      gameOver: false,
      monthlySummary: null,
      finalReport: null,
    };

    initializeDrafts(game);
    return game;
  }

  function initializeDrafts(game) {
    refreshBudgetDraft(game);
    seedInvestmentDraft(game.pendingInvestAmount || 0);
    appState.selectedEventChoice = 0;
    appState.selectedChallengeAnswer = null;
    appState.challengeAnswered = false;
    appState.challengeCorrect = false;
    appState.pendingOpportunityAmount = game.opportunity ? game.opportunity.minCost : 0;
  }

  function seedInvestmentDraft(amount) {
    const total = Math.max(0, Math.round(Number(amount || 0)));
    const weights = {
      cash: 0.18,
      bonds: 0.14,
      index: 0.3,
      stocks: 0.18,
      realestate: 0.12,
      crypto: 0.08,
    };
    let remaining = total;
    const draft = {};
    investmentOptions.forEach((option, index) => {
      const isLast = index === investmentOptions.length - 1;
      const target = isLast ? remaining : Math.round(total * weights[option.id]);
      const allocation = clamp(target, 0, remaining);
      draft[option.id] = allocation;
      remaining -= allocation;
    });
    appState.investDraft = draft;
  }

  function refreshBudgetDraft(game) {
    const available = getDiscretionary(game);
    const wants = Math.round(available * 0.35);
    const futurePool = Math.max(0, available - wants);
    const savings = Math.round(futurePool * 0.6);
    const investing = Math.max(0, futurePool - savings);
    appState.budgetDraft = { wants, savings, investing };
  }

  function normalizeBudgetDraft(game, changedKey) {
    const available = getDiscretionary(game);
    let wants = clamp(Math.round(Number(appState.budgetDraft.wants || 0)), 0, available);
    const futurePool = Math.max(0, available - wants);
    let savings = clamp(Math.round(Number(appState.budgetDraft.savings || 0)), 0, futurePool);
    let investing = clamp(Math.round(Number(appState.budgetDraft.investing || 0)), 0, futurePool);

    if (changedKey === "savings") {
      savings = clamp(savings, 0, futurePool);
      investing = Math.max(0, futurePool - savings);
    } else if (changedKey === "investing") {
      investing = clamp(investing, 0, futurePool);
      savings = Math.max(0, futurePool - investing);
    } else {
      savings = clamp(savings, 0, futurePool);
      investing = Math.max(0, futurePool - savings);
    }

    appState.budgetDraft = { wants, savings, investing };
    return { available, wants, futurePool, savings, investing };
  }

  function computeBudgetValues(game) {
    const available = getDiscretionary(game);
    const wants = clamp(Math.round(Number(appState.budgetDraft.wants || 0)), 0, available);
    const futurePool = Math.max(0, available - wants);
    const savings = clamp(Math.round(Number(appState.budgetDraft.savings || 0)), 0, futurePool);
    const investing = Math.max(0, futurePool - savings);
    return { available, wants, futurePool, savings, investing };
  }

  function normalizeInvestmentDraft(amount, changedKey) {
    const cap = Math.max(0, Math.round(Number(amount || 0)));
    const nextDraft = {};
    investmentOptions.forEach((option) => {
      nextDraft[option.id] = Math.max(0, Math.round(Number(appState.investDraft[option.id] || 0)));
    });

    if (changedKey) {
      const otherTotal = investmentOptions.reduce((sum, option) => {
        if (option.id === changedKey) return sum;
        return sum + nextDraft[option.id];
      }, 0);
      nextDraft[changedKey] = clamp(nextDraft[changedKey], 0, Math.max(0, cap - otherTotal));
    }

    const total = investmentOptions.reduce((sum, option) => sum + nextDraft[option.id], 0);
    if (total > cap) {
      let overflow = total - cap;
      investmentOptions.forEach((option) => {
        if (overflow <= 0 || option.id === changedKey) return;
        const reduction = Math.min(nextDraft[option.id], overflow);
        nextDraft[option.id] -= reduction;
        overflow -= reduction;
      });
      if (overflow > 0 && changedKey) {
        nextDraft[changedKey] = Math.max(0, nextDraft[changedKey] - overflow);
      }
    }

    appState.investDraft = nextDraft;
    return computeInvestmentValuesFromDraft(cap, nextDraft);
  }

  function computeInvestmentValuesFromDraft(amount, draft) {
    const cap = Math.max(0, Math.round(Number(amount || 0)));
    const allocations = {};
    let total = 0;
    investmentOptions.forEach((option) => {
      const value = Math.max(0, Math.round(Number(draft[option.id] || 0)));
      allocations[option.id] = value;
      total += value;
    });
    if (total > cap) {
      total = cap;
    }
    return {
      amount: cap,
      allocations,
      allocated: Math.min(total, cap),
      remaining: Math.max(0, cap - total),
    };
  }

  function computeInvestmentValues(game) {
    return computeInvestmentValuesFromDraft(game.pendingInvestAmount || 0, appState.investDraft);
  }

  function setNodeText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function setNodeWidth(id, width) {
    const node = document.getElementById(id);
    if (node) node.style.width = `${width}%`;
  }

  function setSliderValue(id, value, max) {
    const node = document.getElementById(id);
    if (!node) return;
    node.max = Math.max(0, max);
    node.value = clamp(value, 0, Math.max(0, max));
  }

  function updateBudgetUI() {
    const game = appState.game;
    if (!game || game.stage !== "budget") return;
    const values = computeBudgetValues(game);
    const wantsRatio = values.available ? Math.round((values.wants / values.available) * 100) : 0;
    const savingsRatio = values.futurePool ? Math.round((values.savings / values.futurePool) * 100) : 0;
    const investingRatio = values.futurePool ? Math.round((values.investing / values.futurePool) * 100) : 0;

    setNodeText("budget-wants-value", currency(values.wants));
    setNodeText("budget-savings-value", currency(values.savings));
    setNodeText("budget-investing-value", currency(values.investing));
    setNodeText("budget-savings-card-value", currency(values.savings));
    setNodeText("budget-investing-card-value", currency(values.investing));
    setNodeText("budget-wants-chip", `Cap ${currency(values.available)}`);
    setNodeText("budget-savings-chip", `Cap ${currency(values.futurePool)}`);
    setNodeText("budget-investing-chip", `Cap ${currency(values.futurePool)}`);
    setNodeText("budget-income-value", currency(currentIncome(game)));
    setNodeText("budget-needs-value", currency(currentNeeds(game)));
    setNodeText("budget-available-value", currency(values.available));
    setNodeText("budget-future-pool-value", currency(values.futurePool));
    setNodeText("budget-allocated-value", currency(values.wants + values.savings + values.investing));
    setNodeText("budget-remaining-value", currency(Math.max(0, values.available - (values.wants + values.savings + values.investing))));
    setNodeText("budget-tactical-copy",
      values.savings >= currentIncome(game) * 0.15
        ? "Healthy month. You are protecting liquidity while still keeping room for growth."
        : "Your savings side is light. That means this plan is faster but more fragile."
    );

    if (appState.activeBudgetSlider !== "wants") {
      setSliderValue("budget-wants-slider", values.wants, values.available);
    } else {
      const node = document.getElementById("budget-wants-slider");
      if (node) node.max = Math.max(0, values.available);
    }

    if (appState.activeBudgetSlider !== "savings") {
      setSliderValue("budget-savings-slider", values.savings, values.futurePool);
    } else {
      const node = document.getElementById("budget-savings-slider");
      if (node) node.max = Math.max(0, values.futurePool);
    }

    if (appState.activeBudgetSlider !== "investing") {
      setSliderValue("budget-investing-slider", values.investing, values.futurePool);
    } else {
      const node = document.getElementById("budget-investing-slider");
      if (node) node.max = Math.max(0, values.futurePool);
    }
    setNodeWidth("budget-wants-fill", wantsRatio);
    setNodeWidth("budget-savings-fill", savingsRatio);
    setNodeWidth("budget-investing-fill", investingRatio);
  }

  function handleBudgetSliderInput(key, value) {
    const game = appState.game;
    if (!game || game.stage !== "budget") return;
    appState.budgetDraft[key] = Number(value);
    normalizeBudgetDraft(game, key);
    updateBudgetUI();
  }

  function updateInvestmentUI() {
    const game = appState.game;
    if (!game || game.stage !== "invest") return;
    const values = computeInvestmentValues(game);
    setNodeText("invest-amount-value", currency(values.amount));
    setNodeText("invest-allocated-value", currency(values.allocated));
    setNodeText("invest-remaining-value", currency(values.remaining));
    setNodeText("invest-coach-copy",
      values.remaining === 0
        ? "Capital is fully assigned. Now choose the mix that matches your risk tolerance."
        : "Unassigned dollars are waiting. Finish the plan before you execute the month."
    );

    investmentOptions.forEach((option) => {
      const value = values.allocations[option.id];
      const otherTotal = values.allocated - value;
      const sliderMax = Math.max(0, values.amount - otherTotal);
      setNodeText(`invest-${option.id}-value`, currency(value));
      setNodeText(`invest-${option.id}-chip`, `${Math.round(values.amount ? (value / values.amount) * 100 : 0)}%`);
      if (appState.activeInvestSlider !== option.id) {
        setSliderValue(`invest-${option.id}-slider`, value, sliderMax);
      } else {
        const node = document.getElementById(`invest-${option.id}-slider`);
        if (node) node.max = sliderMax;
      }
      setNodeWidth(`invest-${option.id}-fill`, Math.round(values.amount ? (value / values.amount) * 100 : 0));
    });
  }

  function handleInvestmentSliderInput(key, value) {
    const game = appState.game;
    if (!game || game.stage !== "invest") return;
    appState.investDraft[key] = Number(value);
    normalizeInvestmentDraft(game.pendingInvestAmount || 0, key);
    updateInvestmentUI();
  }

  function startNewGame() {
    if (!appState.account) {
      appState.tab = "home";
      toast("Create an account or sign in before starting.");
      render();
      return;
    }
    appState.game = createGame();
    appState.tab = "play";
    saveProgress();
    render();
  }

  function continueGame() {
    if (!appState.account) {
      toast("Sign in first.");
      return;
    }
    if (!appState.account.save) {
      startNewGame();
      return;
    }

    appState.game = deepClone(appState.account.save);
    initializeDrafts(appState.game);
    appState.tab = "play";
    render();
  }

  function resetGame() {
    clearProgress();
    appState.game = null;
    appState.tab = "home";
    render();
  }

  function applyImpact(game, impact) {
    if (!impact) return;
    game.cash += impact.cash || 0;
    game.score += impact.score || 0;
    game.creditScore = clamp(game.creditScore + (impact.credit || 0), 300, 850);
    game.workLifeBalance = clamp(game.workLifeBalance + (impact.balance || 0), 20, 100);
    game.recurringIncomeDelta += impact.income || 0;
    game.recurringExpenseDelta += impact.recurringExpense || 0;
    if (impact.bonusInvest) {
      game.bonusInvestPool += impact.bonusInvest;
    }
  }

  function handleEventChoice() {
    const game = appState.game;
    if (!game || game.eventResolved) return;
    const choice = game.event.choices[appState.selectedEventChoice];
    applyImpact(game, choice.impact);
    game.eventResolved = true;
    game.stage = "budget";
    refreshBudgetDraft(game);
    toast(choice.label);
    saveProgress();
    render();
  }

  function attemptLoan() {
    const game = appState.game;
    if (!game) return;
    const selected = { title: "Credit Union Bridge Loan", amount: 600, payment: 70, credit: -4 };
    game.cash += selected.amount;
    game.creditScore = clamp(game.creditScore + selected.credit, 300, 850);
    game.loans.push(selected);
    refreshBudgetDraft(game);
    toast(`${selected.title} secured: ${currency(selected.amount)}`);
    saveProgress();
    render();
  }

  function confirmBudget() {
    const game = appState.game;
    if (!game) return;

    const values = computeBudgetValues(game);
    game.cash += currentIncome(game) - currentNeeds(game) - values.wants - values.investing;
    game.totalSaved += values.savings;
    game.totalInvested += values.investing;
    game.totalNeeds += currentNeeds(game);
    game.wantsSpend += values.wants;
    game.pendingInvestAmount = values.investing + game.bonusInvestPool;
    seedInvestmentDraft(game.pendingInvestAmount);
    game.bonusInvestPool = 0;

    if (game.cash < 0) {
      toast("Cash went negative. Use the bridge loan or lower wants.");
      game.stage = "budget";
      saveProgress();
      render();
      return;
    }

    game.stage = "invest";
    saveProgress();
    render();
  }

  function confirmInvestments() {
    const game = appState.game;
    if (!game) return;
    const values = computeInvestmentValues(game);

    if (values.amount > 0 && values.allocated <= 0) {
      toast("Allocate your investment budget first.");
      return;
    }

    if (values.remaining > 0) {
      toast("Finish assigning all investment dollars before continuing.");
      return;
    }

    investmentOptions.forEach((option) => {
      game.portfolio[option.id] += values.allocations[option.id];
    });

    game.pendingInvestAmount = 0;
    resolveOpportunity(game);
    applyMonthlyReturns(game);
    game.stage = game.challenge && !game.challengeDone ? "challenge" : "review";
    buildMonthlySummary(game);
    saveProgress();
    render();
  }

  function resolveOpportunity(game) {
    if (!game.opportunity || !appState.pendingOpportunityAmount) return;
    const amount = clamp(
      Number(appState.pendingOpportunityAmount),
      game.opportunity.minCost,
      Math.min(game.opportunity.maxCost, Math.max(game.opportunity.minCost, Math.floor(game.cash)))
    );

    if (!amount || amount > game.cash) return;

    game.cash -= amount;
    game.activeOpportunities.push({
      title: game.opportunity.title,
      amount,
      resolution: game.opportunity.resolution,
      resolveMonth: game.month + (game.opportunity.resolution.maturityOffset || 1),
    });
  }

  function applyMonthlyReturns(game) {
    const cycle = game.market;
    investmentOptions.forEach((option) => {
      const held = game.portfolio[option.id];
      if (!held) return;
      const riskAdjustment =
        option.risk === "high" ? (Math.random() * 0.16 - 0.06) :
        option.risk === "medium" ? (Math.random() * 0.08 - 0.02) :
        (Math.random() * 0.03 - 0.005);
      const monthlyReturn = option.expected + cycle.modifier + riskAdjustment;
      game.portfolio[option.id] = Math.max(0, held * (1 + monthlyReturn));
    });

    game.investmentsTotal = Object.values(game.portfolio).reduce((sum, value) => sum + value, 0);
    resolveActiveOpportunities(game);
  }

  function resolveActiveOpportunities(game) {
    const remaining = [];
    game.activeOpportunities.forEach((item) => {
      if (item.resolveMonth > game.month) {
        remaining.push(item);
        return;
      }

      if (item.resolution.type === "match") {
        game.portfolio.index += item.amount * item.resolution.ratio;
        toast(`Employer match landed: ${currency(item.amount)}`);
      } else if (item.resolution.type === "incomeBoost") {
        game.recurringIncomeDelta += item.resolution.gain;
        toast(`Career certificate unlocked +${currency(item.resolution.gain)}/month`);
      } else if (item.resolution.type === "return") {
        const payout = item.amount * item.resolution.multiplier;
        game.cash += payout;
        toast(`${item.title} matured at ${currency(payout)}`);
      } else if (item.resolution.type === "binary") {
        const won = Math.random() > 0.58;
        const payout = item.amount * (won ? item.resolution.win : item.resolution.lose);
        game.cash += payout;
        toast(`${item.title}: ${won ? "big upside" : "hard lesson"} for ${currency(payout)}`);
      }
    });
    game.activeOpportunities = remaining;
    game.investmentsTotal = Object.values(game.portfolio).reduce((sum, value) => sum + value, 0);
  }

  function answerChallenge() {
    const game = appState.game;
    if (!game || !game.challenge) return;
    if (appState.selectedChallengeAnswer == null) {
      toast("Pick an answer first.");
      return;
    }
    appState.challengeAnswered = true;
    appState.challengeCorrect = Number(appState.selectedChallengeAnswer) === game.challenge.answer;
    game.score += appState.challengeCorrect ? 36 : 10;
    render();
  }

  function continueFromChallenge() {
    const game = appState.game;
    if (!game || !game.challenge) return;
    game.challengeDone = true;
    game.stage = "review";
    toast(appState.challengeCorrect ? "Correct. Good financial reasoning." : "Lesson logged.");
    saveProgress();
    render();
  }

  function buildMonthlySummary(game) {
    const netWorth = game.cash + game.investmentsTotal;
    game.monthlySummary = {
      month: game.month,
      netWorth,
      cash: game.cash,
      investments: game.investmentsTotal,
      creditScore: game.creditScore,
      market: game.market.name,
    };
  }

  function continueMonth() {
    const game = appState.game;
    if (!game) return;

    game.history.push(deepClone(game.monthlySummary));
    game.score += calculateMonthlyScore(game);

    if (game.month >= 12) {
      finishGame(game);
      clearProgress();
      render();
      return;
    }

    game.month += 1;
    game.stage = "event";
    game.event = deepClone(randomFrom(events));
    game.eventResolved = false;
    game.market = deepClone(randomFrom(marketCycles));
    game.opportunity = maybeOpportunity(game.month);
    game.challenge = maybeChallenge(game.month);
    game.challengeDone = false;
    game.monthlySummary = null;
    initializeDrafts(game);
    saveProgress();
    render();
  }

  function calculateMonthlyScore(game) {
    const savingsRate = game.totalSaved / Math.max(1, game.month * game.profile.monthlyIncome);
    let score = 40;
    score += savingsRate >= 0.15 ? 18 : 0;
    score += game.cash > currentNeeds(game) ? 14 : 0;
    score += game.creditScore >= 700 ? 12 : 0;
    score += game.workLifeBalance >= 60 ? 8 : 0;
    return score;
  }

  function finishGame(game) {
    const netWorth = game.cash + game.investmentsTotal;
    const savingsRate = game.totalSaved / Math.max(1, game.profile.monthlyIncome * 12);
    let score = Math.round(
      game.score +
      clamp((netWorth - game.profile.startingSavings) / 10, 0, 260) +
      clamp(savingsRate * 220, 0, 220) +
      clamp((game.creditScore - 620) * 0.9, 0, 190)
    );

    if (goalHit(game)) score += 120;
    score = clamp(score, 100, 1000);

    const grade =
      score >= 900 ? "A" :
      score >= 800 ? "B" :
      score >= 650 ? "C" :
      score >= 500 ? "D" : "F";

    game.finalReport = {
      score,
      grade,
      netWorth,
      savingsRate,
      goalHit: goalHit(game),
      summary: buildFinalSummary(game, score),
    };
    game.gameOver = true;
  }

  function goalHit(game) {
    const goal = game.profile.goal;
    if (goal.type === "savings") return game.cash >= goal.target;
    if (goal.type === "investments") return game.investmentsTotal >= goal.target;
    if (goal.type === "netWorth") return game.cash + game.investmentsTotal >= goal.target;
    if (goal.type === "credit") return game.creditScore >= goal.target;
    return false;
  }

  function buildFinalSummary(game, score) {
    const name = game.profile.name;
    const netWorth = currency(game.cash + game.investmentsTotal);
    if (score >= 850) {
      return `${name} built real momentum. You finished with ${netWorth}, preserved flexibility, and made strong long-term choices when life got noisy.`;
    }
    if (score >= 650) {
      return `${name} made meaningful progress. The biggest next step is protecting a larger emergency fund and investing consistently when cash flow allows it.`;
    }
    return `${name} survived the year and learned the important part: weak cash buffers and impulse choices create fragility fast. The reset is the lesson.`;
  }

  function submitScore(nickname) {
    const game = appState.game;
    if (!game || !game.finalReport || !nickname.trim()) return;
    const scores = getScores();
    scores.unshift({
      nickname: nickname.trim().slice(0, 20),
      score: game.finalReport.score,
      grade: game.finalReport.grade,
      netWorth: Math.round(game.finalReport.netWorth),
      profile: game.profile.name,
      date: new Date().toLocaleDateString("en-US"),
      owner: appState.account ? appState.account.email : "",
    });
    scores.sort((a, b) => b.score - a.score);
    saveScores(scores);

    if (appState.account) {
      updateAccount((account) => {
        account.bestScore = Math.max(account.bestScore || 0, game.finalReport.score);
        return account;
      });
    }

    toast("Score added to leaderboard.");
    render();
  }

  function makeQuizState(deck, kind) {
    return {
      kind,
      deckId: deck.id,
      title: deck.title,
      description: deck.text,
      rewardCash: deck.rewardCash,
      rewardPoints: deck.rewardPoints,
      questions: deepClone(deck.questions),
      step: 0,
      selectedAnswer: null,
      answered: false,
      correct: false,
      earnedCash: 0,
      earnedPoints: 0,
      finished: false,
      claimed: false,
    };
  }

  function openQuiz(deckId, kind) {
    const source = kind === "learn" ? learnModules : miniChallenges;
    const deck = source.find((item) => item.id === deckId);
    if (!deck) return;
    appState.quizState = makeQuizState(deck, kind);
    render();
  }

  function answerQuiz(index) {
    const quiz = appState.quizState;
    if (!quiz || quiz.answered || quiz.finished) return;
    quiz.selectedAnswer = Number(index);
    quiz.answered = true;
    quiz.correct = quiz.selectedAnswer === quiz.questions[quiz.step].answer;
    if (quiz.correct) {
      const cashPerQuestion = Math.round(quiz.rewardCash / quiz.questions.length);
      const pointsPerQuestion = Math.round(quiz.rewardPoints / quiz.questions.length);
      quiz.earnedCash += cashPerQuestion;
      quiz.earnedPoints += pointsPerQuestion;
    }
    render();
  }

  function nextQuizQuestion() {
    const quiz = appState.quizState;
    if (!quiz || !quiz.answered) return;
    if (quiz.step >= quiz.questions.length - 1) {
      quiz.finished = true;
      render();
      return;
    }
    quiz.step += 1;
    quiz.selectedAnswer = null;
    quiz.answered = false;
    quiz.correct = false;
    render();
  }

  function claimQuizRewards() {
    const quiz = appState.quizState;
    if (!quiz || !quiz.finished || quiz.claimed || !appState.account) return;

    const cash = quiz.earnedCash;
    const points = quiz.earnedPoints;

    updateAccount((account) => {
      account.academyPoints = (account.academyPoints || 0) + points;
      if (appState.game && !appState.game.gameOver) {
        appState.game.cash += cash;
        appState.game.score += points;
        account.save = deepClone(appState.game);
      } else {
        account.wallet = (account.wallet || 0) + cash;
      }
      account.completedQuizzes = account.completedQuizzes || {};
      account.completedQuizzes[quiz.deckId] = {
        bestCash: Math.max(cash, account.completedQuizzes[quiz.deckId]?.bestCash || 0),
        bestPoints: Math.max(points, account.completedQuizzes[quiz.deckId]?.bestPoints || 0),
        completedAt: Date.now(),
      };
      return account;
    });

    quiz.claimed = true;
    toast(appState.game && !appState.game.gameOver
      ? `Quiz rewards added to your run: ${currency(cash)} and ${points} points.`
      : `Quiz rewards banked: ${currency(cash)} for your next run and ${points} points.`);
    render();
  }

  function closeQuiz() {
    appState.quizState = null;
    render();
  }

  function goalProgressRatio(game) {
    const goal = game.profile.goal;
    if (goal.type === "savings") return clamp(game.cash / goal.target, 0, 1);
    if (goal.type === "investments") return clamp(game.investmentsTotal / goal.target, 0, 1);
    if (goal.type === "netWorth") return clamp((game.cash + game.investmentsTotal) / goal.target, 0, 1);
    if (goal.type === "credit") return clamp(game.creditScore / goal.target, 0, 1);
    return 0;
  }

  function buildChart(points) {
    const width = 640;
    const height = 220;
    const values = points.map((point) => point.netWorth);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = Math.max(max - min, 1);
    const coords = points
      .map((point, index) => {
        const x = (index / Math.max(points.length - 1, 1)) * (width - 40) + 20;
        const y = height - ((point.netWorth - min) / range) * (height - 40) - 20;
        return `${x},${y}`;
      })
      .join(" ");

    const dots = points
      .map((point, index) => {
        const x = (index / Math.max(points.length - 1, 1)) * (width - 40) + 20;
        const y = height - ((point.netWorth - min) / range) * (height - 40) - 20;
        return `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" fill="#ff3b30"></rect>`;
      })
      .join("");

    return `
      <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <polyline fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" points="20,20 20,200 620,200"></polyline>
        <polyline fill="none" stroke="#ffffff" stroke-width="2" points="${coords}"></polyline>
        ${dots}
      </svg>
    `;
  }

  function renderHome() {
    const hasSave = Boolean(appState.account && appState.account.save);
    const welcome = appState.account ? `Welcome, ${appState.account.firstName}.` : "Welcome to LifeQuest.";
    const wallet = appState.account ? appState.account.wallet || 0 : 0;
    const points = appState.account ? appState.account.academyPoints || 0 : 0;

    return `
      <section class="screen">
        <section class="hero">
          <div class="hero-grid">
            <div>
              <div class="eyebrow">System Status: Mission Live</div>
              <h1 class="headline">Level 01: <span>LifeQuest</span></h1>
              <p class="subhead">
                ${welcome} A financial literacy simulation for Smart Futures Financial Literacy where every month teaches real money skills through pressure, tradeoffs, and recovery.
              </p>
              <div class="hero-actions">
                <button class="button-primary" data-action="start-new">Enter The Simulation</button>
                ${hasSave ? '<button class="button-secondary" data-action="continue-game">Resume Saved Run</button>' : ""}
                <button class="button-secondary" data-action="tab" data-tab="learn">See The Lessons</button>
              </div>
              ${appState.account ? `
                <div class="hero-badges">
                  <div class="chip">Academy Wallet ${currency(wallet)}</div>
                  <div class="chip chip--accent">Academy Points ${points}</div>
                </div>
              ` : ""}
            </div>
            <div class="hero-stat-stack">
              <article class="panel">
                <span class="panel-kicker">SFFL Mission</span>
                <h2 class="panel-title panel-title--accent">Financial Literacy For Every Student</h2>
                <p class="hero-side-copy">
                  Smart Futures Financial Literacy exists because financial education should not depend on your zip code. The program is built by students, taught by peers, and designed to give middle and high school students real money frameworks instead of abstract textbook talk.
                </p>
              </article>
              <article class="panel">
                <span class="panel-kicker">Life Quest Loop</span>
                <div class="table">
                  <div class="table-row"><span>01. Get a Life Profile</span><strong>Career, salary, goal</strong></div>
                  <div class="table-row"><span>02. Budget The Month</span><strong>Needs, wants, savings, investing</strong></div>
                  <div class="table-row"><span>03. Handle Life Events</span><strong>Bad luck, windfalls, pressure</strong></div>
                  <div class="table-row"><span>04. Learn And Earn</span><strong>Quizzes pay points and cash</strong></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="footer-grid">
          ${missionFacts
            .map(
              (fact, index) => `
                <article class="lesson-card">
                  <span class="panel-kicker">Mission 0${index + 1}</span>
                  <strong>${fact}</strong>
                </article>
              `
            )
            .join("")}
        </section>
      </section>
    `;
  }

  function renderPlay() {
    if (!appState.game) {
      return `
        <section class="panel">
          <h2 class="panel-title">No Active Simulation</h2>
          <p class="soft-copy">Start a new LifeQuest run to generate a life profile and begin the 12-month simulation. Any quiz money you banked will be added to your starting cash.</p>
          <div class="hero-actions" style="margin-top: 18px;">
            <button class="button-primary" data-action="start-new">Start New Run</button>
            ${appState.account.save ? '<button class="button-secondary" data-action="continue-game">Load Saved Run</button>' : ""}
          </div>
        </section>
      `;
    }

    const game = appState.game;
    const income = currentIncome(game);
    const needs = currentNeeds(game);
    const available = getDiscretionary(game);
    const progress = (game.month / 12) * 100;
    const netWorth = game.cash + game.investmentsTotal;
    const summary = game.monthlySummary;

    return `
      <section class="screen">
        <section class="metric-strip">
          <article class="metric-card">
            <span class="metric-label">Month</span>
            <div class="metric-value">${game.month} / 12</div>
            <div class="metric-note">${game.stage.toUpperCase()} PHASE</div>
          </article>
          <article class="metric-card">
            <span class="metric-label">Cash Balance</span>
            <div class="metric-value ${game.cash < 600 ? "is-accent" : ""}">${currency(game.cash)}</div>
            <div class="metric-note">Emergency runway matters.</div>
          </article>
          <article class="metric-card">
            <span class="metric-label">Net Worth</span>
            <div class="metric-value">${currency(netWorth)}</div>
            <div class="metric-note">${game.profile.goal.text}</div>
          </article>
          <article class="metric-card">
            <span class="metric-label">Credit Score</span>
            <div class="metric-value">${game.creditScore}</div>
            <div class="metric-note">${game.market.name}</div>
          </article>
        </section>

        ${game.cash < 0 ? `
          <section class="panel alert">
            <span class="panel-kicker">Urgent Event Detected</span>
            <h2 class="panel-title">Negative Cash Balance</h2>
            <p class="soft-copy">You went below zero. That is the exact moment when expensive debt shows up in real life too.</p>
            <div class="hero-actions" style="margin-top: 16px;">
              <button class="button-primary" data-action="take-loan">Secure Bridge Loan</button>
            </div>
          </section>
        ` : ""}

        <section class="play-grid">
          <aside class="rail">
            <article class="panel">
              <div class="profile-head">
                <div>
                  <span class="panel-kicker">Assigned Life</span>
                  <h2 class="profile-name">${game.profile.name}</h2>
                  <div class="profile-meta">${game.profile.age} • ${game.profile.city}<br />${game.profile.career}</div>
                </div>
                <div class="chip chip--accent">Goal Locked</div>
              </div>
              <div class="goal-box">
                <strong>Win Condition</strong>
                <div>${game.profile.goal.text}</div>
              </div>
              <div class="divider"></div>
              <div class="table">
                <div class="table-row"><span>Monthly Income</span><strong>${currency(income)}</strong></div>
                <div class="table-row"><span>Base Needs</span><strong>${currency(needs)}</strong></div>
                <div class="table-row"><span>Work / Life</span><strong>${game.workLifeBalance}/100</strong></div>
                <div class="table-row"><span>Active Loans</span><strong>${game.loans.length}</strong></div>
              </div>
            </article>

            <article class="panel">
              <span class="panel-kicker">Mission Progress</span>
              <div class="progress-bar"><span style="width: ${progress}%"></span></div>
              <p class="metric-note">12 months. One financial story. No autopilot.</p>
              <div class="divider"></div>
              <div class="table">
                <div class="table-row"><span>Total Saved</span><strong>${currency(game.totalSaved)}</strong></div>
                <div class="table-row"><span>Total Invested</span><strong>${currency(game.totalInvested)}</strong></div>
                <div class="table-row"><span>Portfolio Value</span><strong>${currency(game.investmentsTotal)}</strong></div>
                <div class="table-row"><span>Academy Bonus Used</span><strong>${currency(game.academyBonus || 0)}</strong></div>
              </div>
            </article>

            <article class="panel">
              <span class="panel-kicker">Month Log</span>
              <div class="history-list">
                ${(game.history.length
                  ? game.history.slice(-4).reverse().map((entry) => `
                    <article class="log-card">
                      <div class="log-head">
                        <strong>Month ${entry.month}</strong>
                        <span class="muted">${entry.market}</span>
                      </div>
                      <div class="soft-copy">Net worth ${currency(entry.netWorth)} • Cash ${currency(entry.cash)}</div>
                    </article>
                  `).join("")
                  : '<div class="empty-state">The first month log appears after your first review.</div>')}
              </div>
            </article>
          </aside>

          <div class="stack">
            ${renderStagePanel(game, income, needs, available, summary)}
          </div>
        </section>
      </section>
    `;
  }

  function renderStagePanel(game, income, needs, available, summary) {
    if (game.gameOver && game.finalReport) {
      return renderFinalReport(game);
    }

    if (game.stage === "event") {
      return `
        <article class="panel event-card">
          <span class="panel-kicker">Phase 1 • Life Event</span>
          <h2 class="event-title">${game.event.title}</h2>
          <p class="soft-copy"><strong>What happened:</strong> ${game.event.narrative}</p>
          <p class="soft-copy"><strong>Why it matters:</strong> ${game.event.lesson}</p>
          <div class="choice-list">
            ${game.event.choices.map((choice, index) => `
              <button class="choice ${appState.selectedEventChoice === index ? "is-selected" : ""}" data-action="select-event-choice" data-index="${index}">
                <span class="choice-title">${choice.label}</span>
                <span class="choice-note">${choice.note}</span>
              </button>
            `).join("")}
          </div>
          <div class="hero-actions">
            <button class="button-primary" data-action="resolve-event">Lock Decision</button>
          </div>
        </article>
      `;
    }

    if (game.stage === "budget") {
      const values = normalizeBudgetDraft(game);
      const needsBreakdown = getNeedsBreakdown(game);
      const remainingToAssign = Math.max(0, values.available - (values.wants + values.savings + values.investing));
      return `
        <article class="panel">
          <span class="panel-kicker">Phase 2 • Monthly Budgeting</span>
          <h2 class="panel-title">Pay The Fixed Bills, Then Direct The Rest</h2>
          <p class="soft-copy">Rent and core needs are locked first. After that, use the sliders to decide how much goes to lifestyle, liquid savings, and investing. The adjustable total cannot exceed your monthly cash balance.</p>
          <div class="grid-2" style="margin-top: 18px;">
            <div class="panel" style="padding: 18px;">
              <span class="panel-kicker">Locked Monthly Costs</span>
              <div class="fixed-cost-grid">
                <article class="fixed-cost-card">
                  <span class="label">Rent</span>
                  <strong>${currency(needsBreakdown.rent)}</strong>
                </article>
                <article class="fixed-cost-card">
                  <span class="label">Groceries</span>
                  <strong>${currency(needsBreakdown.groceries)}</strong>
                </article>
                <article class="fixed-cost-card">
                  <span class="label">Transport</span>
                  <strong>${currency(needsBreakdown.transport)}</strong>
                </article>
                <article class="fixed-cost-card">
                  <span class="label">Utilities</span>
                  <strong>${currency(needsBreakdown.utilities)}</strong>
                </article>
                <article class="fixed-cost-card">
                  <span class="label">Insurance + Basics</span>
                  <strong>${currency(needsBreakdown.insurance)}</strong>
                </article>
                <article class="fixed-cost-card ${needsBreakdown.recurringDelta >= 0 ? "fixed-cost-card--alert" : "fixed-cost-card--good"}">
                  <span class="label">${needsBreakdown.recurringDelta >= 0 ? "Extra Pressure" : "Monthly Relief"}</span>
                  <strong>${currency(Math.abs(needsBreakdown.recurringDelta))}</strong>
                </article>
              </div>
              <div class="divider"></div>
              <span class="panel-kicker">Adjustable Cash Plan</span>
              <div class="budget-grid">
                ${renderBudgetSlider("Wants", "wants", values.wants, values.available, "This is lifestyle spending for the month.")}
                ${renderBudgetSlider("Savings", "savings", values.savings, values.futurePool, "As savings goes up, investing drops by the same amount.")}
                ${renderBudgetSlider("Investing", "investing", values.investing, values.futurePool, "As investing goes up, savings drops by the same amount.")}
              </div>
              <div class="allocation-dual">
                <div class="allocation-card">
                  <span class="label">Savings</span>
                  <strong id="budget-savings-card-value">${currency(values.savings)}</strong>
                  <p class="choice-note">Cash you keep liquid for security.</p>
                </div>
                <div class="allocation-card">
                  <span class="label">Investing</span>
                  <strong id="budget-investing-card-value">${currency(values.investing)}</strong>
                  <p class="choice-note">Capital that goes to the investment hub next.</p>
                </div>
              </div>
            </div>
            <div class="panel" style="padding: 18px;">
              <span class="panel-kicker">Budget Breakdown</span>
              <div class="budget-summary">
                <div class="summary-row"><span>Income After Loan Payments</span><strong id="budget-income-value">${currency(income)}</strong></div>
                <div class="summary-row"><span>Locked Needs</span><strong id="budget-needs-value">${currency(needs)}</strong></div>
                <div class="summary-row"><span>Cash Balance To Plan</span><strong id="budget-available-value">${currency(values.available)}</strong></div>
                <div class="summary-row"><span>Wants</span><strong id="budget-wants-value">${currency(values.wants)}</strong></div>
                <div class="summary-row"><span>Savings + Investing Pool</span><strong id="budget-future-pool-value">${currency(values.futurePool)}</strong></div>
                <div class="summary-row"><span>Total Allocated</span><strong id="budget-allocated-value">${currency(values.wants + values.savings + values.investing)}</strong></div>
                <div class="summary-row"><span>Remaining To Assign</span><strong id="budget-remaining-value">${currency(remainingToAssign)}</strong></div>
              </div>
              <div class="divider"></div>
              <div class="forecast">
                <span class="panel-kicker">Tactical Forecast</span>
                <p class="soft-copy" id="budget-tactical-copy">${values.savings >= income * 0.15
                  ? "Healthy month. You are protecting liquidity while still keeping room for growth."
                  : "Your savings side is light. That means this plan is faster but more fragile."}</p>
              </div>
            </div>
          </div>
          <div class="hero-actions" style="margin-top: 18px;">
            <button class="button-primary" data-action="confirm-budget">Commit Budget</button>
            <button class="button-secondary" data-action="take-loan">Bridge Loan</button>
          </div>
        </article>
      `;
    }

    if (game.stage === "invest") {
      const values = normalizeInvestmentDraft(game.pendingInvestAmount || 0);
      return `
        <article class="panel">
          <span class="panel-kicker">Phase 3 • Investment Hub</span>
          <h2 class="panel-title">Choose Where This Month's Investment Dollars Go</h2>
          <p class="soft-copy">Your budget already carved out the investing amount. Now assign every dollar across safer options and higher-upside assets before the month closes.</p>
          <div class="investment-topline" style="margin-top: 18px;">
            <article class="metric-card">
              <span class="metric-label">Ready To Invest</span>
              <div class="metric-value is-accent" id="invest-amount-value">${currency(values.amount)}</div>
            </article>
            <article class="metric-card">
              <span class="metric-label">Allocated</span>
              <div class="metric-value" id="invest-allocated-value">${currency(values.allocated)}</div>
            </article>
            <article class="metric-card">
              <span class="metric-label">Remaining</span>
              <div class="metric-value" id="invest-remaining-value">${currency(values.remaining)}</div>
            </article>
          </div>
          <div class="investment-grid" style="margin-top: 18px;">
            ${investmentOptions.map((option) => `
              <article class="investment-card ${option.risk === "high" ? "is-hot" : ""}">
                <div class="risk-tag ${option.risk}">${option.risk} risk</div>
                <strong>${option.title}</strong>
                <p>${option.blurb}</p>
                <div class="budget-head">
                  <span class="label">Allocation</span>
                  <span class="chip" id="invest-${option.id}-chip">${Math.round(values.amount ? (values.allocations[option.id] / values.amount) * 100 : 0)}%</span>
                </div>
                <strong id="invest-${option.id}-value">${currency(values.allocations[option.id])}</strong>
                <input id="invest-${option.id}-slider" type="range" min="0" max="${Math.max(0, values.amount - (values.allocated - values.allocations[option.id]))}" step="1" value="${values.allocations[option.id]}" data-action="invest-slider" data-key="${option.id}" />
                <div class="budget-meter"><div class="budget-fill" id="invest-${option.id}-fill" style="width: ${Math.round(values.amount ? (values.allocations[option.id] / values.amount) * 100 : 0)}%"></div></div>
              </article>
            `).join("")}
          </div>
          ${game.opportunity ? `
            <div class="divider"></div>
            <article class="forecast">
              <span class="panel-kicker">Optional Opportunity</span>
              <strong>${game.opportunity.title}</strong>
              <p class="soft-copy">${game.opportunity.copy}</p>
              <label class="label">Opportunity Capital ${currency(appState.pendingOpportunityAmount)}</label>
              <input type="range" min="${game.opportunity.minCost}" max="${Math.min(game.opportunity.maxCost, Math.max(game.opportunity.minCost, Math.floor(game.cash)))}" step="50" value="${appState.pendingOpportunityAmount}" data-action="opportunity-slider" />
            </article>
          ` : ""}
          <div class="forecast" style="margin-top: 18px;">
            <span class="panel-kicker">Coach Read</span>
            <p class="soft-copy" id="invest-coach-copy">${values.remaining === 0
              ? "Capital is fully assigned. Now choose the mix that matches your risk tolerance."
              : "Unassigned dollars are waiting. Finish the plan before you execute the month."}</p>
          </div>
          <div class="hero-actions" style="margin-top: 18px;">
            <button class="button-primary" data-action="confirm-invest">Execute Strategy</button>
          </div>
        </article>
      `;
    }

    if (game.stage === "challenge" && game.challenge) {
      return `
        <article class="panel">
          <span class="panel-kicker">Phase 4 • Knowledge Check</span>
          <h2 class="panel-title">${game.challenge.prompt}</h2>
          <div class="choice-list" style="margin-top: 18px;">
            ${game.challenge.options.map((option, index) => `
              <button class="choice ${Number(appState.selectedChallengeAnswer) === index ? "is-selected" : ""} ${appState.challengeAnswered && index === game.challenge.answer ? "is-right" : ""} ${appState.challengeAnswered && Number(appState.selectedChallengeAnswer) === index && !appState.challengeCorrect ? "is-wrong" : ""}" data-action="select-challenge" data-index="${index}">
                <span class="choice-title">${option}</span>
              </button>
            `).join("")}
          </div>
          ${appState.challengeAnswered ? `
            <div class="answer-panel ${appState.challengeCorrect ? "answer-panel--right" : "answer-panel--wrong"}">
              <strong>${appState.challengeCorrect ? "Correct" : "Not quite"}</strong>
              <p>${game.challenge.explanation}</p>
            </div>
          ` : ""}
          <div class="hero-actions" style="margin-top: 18px;">
            ${appState.challengeAnswered
              ? '<button class="button-primary" data-action="continue-from-challenge">Continue</button>'
              : '<button class="button-primary" data-action="answer-challenge">Submit Answer</button>'}
          </div>
        </article>
      `;
    }

    return `
      <article class="panel">
        <span class="panel-kicker">Phase 5 • Monthly Review</span>
        <h2 class="panel-title">Month ${summary ? summary.month : game.month} Locked</h2>
        <div class="grid-2" style="margin-top: 18px;">
          <article class="panel" style="padding: 18px;">
            <span class="panel-kicker">Financial Outcome</span>
            <div class="table">
              <div class="table-row"><span>Cash</span><strong>${currency(summary.cash)}</strong></div>
              <div class="table-row"><span>Investments</span><strong>${currency(summary.investments)}</strong></div>
              <div class="table-row"><span>Net Worth</span><strong>${currency(summary.netWorth)}</strong></div>
              <div class="table-row"><span>Credit Score</span><strong>${summary.creditScore}</strong></div>
            </div>
          </article>
          <article class="panel" style="padding: 18px;">
            <span class="panel-kicker">Coach Feedback</span>
            <p class="soft-copy">${summary.cash > needs
              ? "You preserved real breathing room this month. Cash flexibility is one of the most underrated wealth tools."
              : "Cash is tight. The lesson now is not sophistication. It is resilience."}</p>
            <p class="soft-copy"><strong>Market tape:</strong> ${summary.market}</p>
          </article>
        </div>
        <div class="hero-actions" style="margin-top: 18px;">
          <button class="button-primary" data-action="continue-month">${game.month === 12 ? "See Final Report" : "Advance To Next Month"}</button>
        </div>
      </article>
    `;
  }

  function renderBudgetSlider(label, key, value, max, helper) {
    const ratio = max ? Math.round((value / max) * 100) : 0;
    return `
      <div class="budget-row">
        <div class="budget-head">
          <div>
            <span class="label">${label}</span>
            <strong id="budget-${key}-value">${currency(value)}</strong>
          </div>
          <span class="chip" id="budget-${key}-chip">Cap ${currency(max)}</span>
        </div>
        <input id="budget-${key}-slider" type="range" min="0" max="${Math.max(0, max)}" step="1" value="${value}" data-action="budget-slider" data-key="${key}" />
        <div class="budget-meter"><div class="budget-fill" id="budget-${key}-fill" style="width: ${ratio}%"></div></div>
        <div class="choice-note">${helper}</div>
      </div>
    `;
  }

  function renderFinalReport(game) {
    const report = game.finalReport;
    const leaderboard = getScores();
    return `
      <article class="panel">
        <span class="panel-kicker">Simulation Complete</span>
        <h2 class="panel-title">Final Grade: <span class="is-accent">${report.grade}</span></h2>
        <div class="grid-3" style="margin-top: 18px;">
          <article class="metric-card">
            <span class="metric-label">Final Score</span>
            <div class="metric-value">${report.score}</div>
          </article>
          <article class="metric-card">
            <span class="metric-label">Net Worth</span>
            <div class="metric-value">${currency(report.netWorth)}</div>
          </article>
          <article class="metric-card">
            <span class="metric-label">Savings Rate</span>
            <div class="metric-value">${Math.round(report.savingsRate * 100)}%</div>
          </article>
        </div>
        <div class="divider"></div>
        <div class="goal-box">
          <strong>Goal Status</strong>
          <div>${report.goalHit ? "Goal achieved." : "Goal missed."} ${game.profile.goal.text}</div>
        </div>
        <p class="soft-copy" style="margin-top: 18px;">${report.summary}</p>
        <div class="divider"></div>
        <div class="grid-2">
          <div>
            <label class="label">Add To Leaderboard</label>
            <input type="text" id="nickname" maxlength="20" placeholder="Enter nickname" />
          </div>
          <div class="hero-actions" style="align-self: end;">
            <button class="button-primary" data-action="submit-score">Submit Score</button>
            <button class="button-secondary" data-action="start-new">Play Again</button>
          </div>
        </div>
        ${leaderboard.length ? `
          <div class="divider"></div>
          <div class="leaderboard">
            ${leaderboard.slice(0, 5).map((row, index) => `
              <article class="leaderboard-row">
                <div class="leaderboard-rank">#${index + 1}</div>
                <div>
                  <strong>${row.nickname}</strong>
                  <p>${row.profile} • ${row.grade} • ${row.date}</p>
                </div>
                <strong>${row.score}</strong>
              </article>
            `).join("")}
          </div>
        ` : ""}
      </article>
    `;
  }

  function renderStats() {
    const game = appState.game;
    const points = game
      ? game.history.length
        ? game.history
        : game.monthlySummary
          ? [...game.history, game.monthlySummary]
          : game.history
      : [];

    const chart = points.length ? buildChart(points) : "";
    const goalProgress = game ? Math.round(goalProgressRatio(game) * 100) : 0;
    const completed = Object.keys(appState.account.completedQuizzes || {}).length;

    return `
      <section class="screen">
        <section class="stats-grid">
          <article class="panel">
            <span class="panel-kicker">Net Worth Trajectory</span>
            ${points.length ? chart : '<div class="empty-state">Start or resume a run to generate your month-by-month chart.</div>'}
            <div class="chart-caption">Every month captures your cash, invested assets, and market environment.</div>
          </article>
          <article class="panel">
            <span class="panel-kicker">Account Snapshot</span>
            <div class="table">
              <div class="table-row"><span>Welcome</span><strong>${appState.account.firstName}</strong></div>
              <div class="table-row"><span>Academy Wallet</span><strong>${currency(appState.account.wallet || 0)}</strong></div>
              <div class="table-row"><span>Academy Points</span><strong>${appState.account.academyPoints || 0}</strong></div>
              <div class="table-row"><span>Completed Quizzes</span><strong>${completed}</strong></div>
              <div class="table-row"><span>Best Score</span><strong>${appState.account.bestScore || 0}</strong></div>
              <div class="table-row"><span>Current Goal Progress</span><strong>${goalProgress}%</strong></div>
            </div>
          </article>
        </section>
      </section>
    `;
  }

  function renderLearn() {
    return `
      <section class="screen">
        <section class="learn-grid">
          ${learnModules.map((module, index) => {
            const completion = appState.account && appState.account.completedQuizzes && appState.account.completedQuizzes[module.id];
            return `
              <article class="lesson-card">
                <span class="panel-kicker">Learn 0${(index % 9) + 1}</span>
                <strong>${module.title}</strong>
                <p>${module.text}</p>
                <div class="lesson-meta">
                  <span class="chip">Reward ${currency(module.rewardCash)}</span>
                  <span class="chip chip--accent">${module.rewardPoints} pts</span>
                </div>
                ${completion ? `<div class="choice-note">Best result: ${currency(completion.bestCash)} and ${completion.bestPoints} points.</div>` : ""}
                <button class="button-secondary" data-action="open-quiz" data-kind="learn" data-id="${module.id}">Launch Quiz</button>
              </article>
            `;
          }).join("")}
        </section>
      </section>
    `;
  }

  function renderMinigames() {
    return `
      <section class="screen">
        <section class="mini-grid">
          ${miniChallenges.map((deck) => `
            <article class="mini-card">
              <span class="panel-kicker">Skill Lab</span>
              <strong>${deck.title}</strong>
              <p>${deck.text}</p>
              <div class="lesson-meta">
                <span class="chip">Reward ${currency(deck.rewardCash)}</span>
                <span class="chip chip--accent">${deck.rewardPoints} pts</span>
              </div>
              <button class="button-secondary" data-action="open-quiz" data-kind="mini" data-id="${deck.id}">Launch Challenge</button>
            </article>
          `).join("")}
        </section>
      </section>
    `;
  }

  function renderScores() {
    const scores = getScores();
    return `
      <section class="screen">
        <section class="panel">
          <span class="panel-kicker">Leaderboard</span>
          <h2 class="panel-title">Top LifeQuest Runs</h2>
          <div class="leaderboard" style="margin-top: 18px;">
            ${
              scores.length
                ? scores.map((row, index) => `
                  <article class="leaderboard-row">
                    <div class="leaderboard-rank">#${index + 1}</div>
                    <div>
                      <strong>${row.nickname}</strong>
                      <p>${row.profile} • Grade ${row.grade} • Net worth ${currency(row.netWorth)}</p>
                    </div>
                    <strong>${row.score}</strong>
                  </article>
                `).join("")
                : '<div class="empty-state">No scores yet. Finish a full 12-month run to populate the board.</div>'
            }
          </div>
        </section>
      </section>
    `;
  }

  function renderQuizOverlay() {
    const quiz = appState.quizState;
    if (!quiz) return "";

    const question = quiz.questions[quiz.step];
    const completedPct = Math.round(((quiz.step + (quiz.finished ? 1 : 0)) / quiz.questions.length) * 100);

    return `
      <div class="quiz-shell">
        <div class="quiz-page">
          <div class="quiz-page__top">
            <div>
              <div class="eyebrow">Ghost Page • ${quiz.kind === "learn" ? "Lesson Quiz" : "Skill Lab"}</div>
              <h2 class="quiz-title">${quiz.title}</h2>
              <p class="soft-copy">${quiz.description}</p>
            </div>
            <button class="button-secondary" data-action="close-quiz">Close</button>
          </div>

          <div class="quiz-progress">
            <span>Question ${Math.min(quiz.step + 1, quiz.questions.length)} / ${quiz.questions.length}</span>
            <span>${completedPct}% complete</span>
          </div>
          <div class="progress-bar"><span style="width:${completedPct}%"></span></div>

          ${
            quiz.finished
              ? `
                <section class="quiz-result">
                  <span class="panel-kicker">Quiz Complete</span>
                  <h3 class="panel-title">Rewards Earned</h3>
                  <div class="grid-2">
                    <article class="metric-card">
                      <span class="metric-label">Cash</span>
                      <div class="metric-value">${currency(quiz.earnedCash)}</div>
                    </article>
                    <article class="metric-card">
                      <span class="metric-label">Points</span>
                      <div class="metric-value">${quiz.earnedPoints}</div>
                    </article>
                  </div>
                  <p class="soft-copy" style="margin-top:18px;">
                    ${appState.game && !appState.game.gameOver
                      ? "Claiming now will send the rewards directly into your current run so you can use them immediately."
                      : "Claiming now will bank the cash into your account wallet for your next run."}
                  </p>
                  <div class="hero-actions" style="margin-top:18px;">
                    <button class="button-primary" data-action="claim-quiz" ${quiz.claimed ? "disabled" : ""}>${quiz.claimed ? "Rewards Claimed" : "Claim Rewards"}</button>
                    <button class="button-secondary" data-action="close-quiz">Back</button>
                  </div>
                </section>
              `
              : `
                <section class="quiz-question">
                  <span class="panel-kicker">Prompt</span>
                  <h3 class="quiz-question__title">${question.prompt}</h3>
                  <div class="choice-list" style="margin-top:18px;">
                    ${question.options.map((option, index) => {
                      const selected = quiz.selectedAnswer === index;
                      const isCorrect = quiz.answered && index === question.answer;
                      const isWrong = quiz.answered && selected && !quiz.correct;
                      return `
                        <button class="choice ${selected ? "is-selected" : ""} ${isCorrect ? "is-right" : ""} ${isWrong ? "is-wrong" : ""}" data-action="answer-quiz" data-index="${index}" ${quiz.answered ? "disabled" : ""}>
                          <span class="choice-title">${option}</span>
                        </button>
                      `;
                    }).join("")}
                  </div>

                  ${
                    quiz.answered
                      ? `
                        <div class="answer-panel ${quiz.correct ? "answer-panel--right" : "answer-panel--wrong"}">
                          <strong>${quiz.correct ? "Correct" : "Wrong"}</strong>
                          <p>${question.explanation}</p>
                        </div>
                        <div class="hero-actions" style="margin-top:18px;">
                          <button class="button-primary" data-action="next-quiz">${quiz.step === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}</button>
                        </div>
                      `
                      : ""
                  }
                </section>
              `
          }
        </div>
      </div>
    `;
  }

  function renderApp() {
    const game = appState.game;
    const balance = game ? game.cash + game.investmentsTotal : 0;
    const welcome = appState.account ? `Welcome, ${appState.account.firstName}` : "Account Not Signed In";

    return `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand">
            <div class="brand-mark">LQ</div>
            <div>
              <div class="brand-name">LifeQuest</div>
              <div class="brand-sub">Smart Futures Financial Literacy</div>
            </div>
          </div>
          <div class="topbar-meta">
            <div class="chip">${welcome}</div>
            ${game ? `<div class="chip">Month ${game.month}/12</div>` : '<div class="chip">Ready</div>'}
            <div class="chip chip--accent">Net Worth ${currency(balance)}</div>
            ${game ? '<button class="button-secondary" data-action="reset-game">Reset Run</button>' : ""}
          </div>
        </header>

        <main class="layout">
          <nav class="tabs">
            ${[
              ["home", "Home"],
              ["play", "Play"],
              ["stats", "Stats"],
              ["learn", "Learn"],
              ["minigames", "Mini"],
              ["scores", "Scores"],
            ].map(([key, label]) => `
              <button class="tab ${appState.tab === key ? "is-active" : ""}" data-action="tab" data-tab="${key}">${label}</button>
            `).join("")}
          </nav>

          ${
            appState.tab === "home" ? renderHome() :
            appState.tab === "play" ? renderPlay() :
            appState.tab === "stats" ? renderStats() :
            appState.tab === "learn" ? renderLearn() :
            appState.tab === "minigames" ? renderMinigames() :
            renderScores()
          }
        </main>

        ${renderQuizOverlay()}
        ${appState.toast ? `<div class="toast">${appState.toast}</div>` : ""}
      </div>
    `;
  }

  function readInput(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
  }

  function handleSignUp() {
    const firstName = readInput("signup-first").trim();
    const lastName = readInput("signup-last").trim();
    const email = normalizeEmail(readInput("signup-email"));
    const password = readInput("signup-password");

    if (!firstName || !lastName || !email || !password) {
      toast("Fill in first name, last name, email, and password.");
      return;
    }

    const accounts = getAccounts();
    if (accounts.some((item) => item.email === email)) {
      toast("An account with that email already exists.");
      return;
    }

    const account = {
      id: `acct_${Date.now()}`,
      firstName,
      lastName,
      email,
      password,
      wallet: 0,
      academyPoints: 0,
      bestScore: 0,
      completedQuizzes: {},
      save: null,
      createdAt: Date.now(),
    };

    accounts.push(account);
    saveAccounts(accounts);
    localStorage.setItem(STORAGE_KEYS.session, account.id);
    appState.account = deepClone(account);
    appState.authMode = "signin";
    toast(`Account created. Welcome, ${firstName}.`);
    render();
  }

  function handleSignIn() {
    const email = normalizeEmail(readInput("signin-email"));
    const password = readInput("signin-password");
    const account = getAccounts().find((item) => item.email === email && item.password === password);

    if (!account) {
      toast("Email or password did not match.");
      return;
    }

    localStorage.setItem(STORAGE_KEYS.session, account.id);
    appState.account = deepClone(account);
    appState.game = account.save ? deepClone(account.save) : null;
    if (appState.game) initializeDrafts(appState.game);
    toast(`Welcome back, ${account.firstName}.`);
    render();
  }

  function boot() {
    const params =
      typeof window !== "undefined" && window.location
        ? new URLSearchParams(window.location.search)
        : null;
    const requestedTab = params ? params.get("tab") : "";
    const skipSave = params ? params.get("fresh") === "1" : false;

    const sessionId = localStorage.getItem(STORAGE_KEYS.session);
    if (sessionId) {
      const account = getAccounts().find((item) => item.id === sessionId);
      if (account) {
        appState.account = deepClone(account);
        if (!skipSave && account.save) {
          appState.game = deepClone(account.save);
          initializeDrafts(appState.game);
          appState.tab = "play";
        }
      }
    }

    if (!appState.account) {
      appState.account = deepClone(guestAccount);
    }

    if (requestedTab) {
      appState.tab = requestedTab;
    }

    render();
  }

  function render() {
    app.innerHTML = renderApp();
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const { action, tab, index, key, id, kind } = target.dataset;

    if (action === "tab") {
      appState.tab = tab;
      render();
    } else if (action === "start-new") {
      startNewGame();
    } else if (action === "continue-game") {
      continueGame();
    } else if (action === "reset-game") {
      resetGame();
    } else if (action === "signout") {
      signOut();
    } else if (action === "signin") {
      handleSignIn();
    } else if (action === "signup") {
      handleSignUp();
    } else if (action === "select-event-choice") {
      appState.selectedEventChoice = Number(index);
      render();
    } else if (action === "resolve-event") {
      handleEventChoice();
    } else if (action === "confirm-budget") {
      confirmBudget();
    } else if (action === "take-loan") {
      attemptLoan();
    } else if (action === "confirm-invest") {
      confirmInvestments();
    } else if (action === "select-challenge") {
      if (!appState.challengeAnswered) {
        appState.selectedChallengeAnswer = Number(index);
        render();
      }
    } else if (action === "answer-challenge") {
      answerChallenge();
    } else if (action === "continue-from-challenge") {
      continueFromChallenge();
    } else if (action === "continue-month") {
      continueMonth();
    } else if (action === "submit-score") {
      submitScore(readInput("nickname"));
    } else if (action === "open-quiz") {
      if (!appState.account) {
        toast("Sign in first so rewards are saved to your account.");
      } else {
        openQuiz(id, kind);
      }
    } else if (action === "close-quiz") {
      closeQuiz();
    } else if (action === "answer-quiz") {
      answerQuiz(index);
    } else if (action === "next-quiz") {
      nextQuizQuestion();
    } else if (action === "claim-quiz") {
      claimQuizRewards();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    const action = target.dataset.action;
    if (action === "budget-slider") {
      handleBudgetSliderInput(target.dataset.key, target.value);
    } else if (action === "invest-slider") {
      handleInvestmentSliderInput(target.dataset.key, target.value);
    } else if (action === "opportunity-slider") {
      appState.pendingOpportunityAmount = Number(target.value);
      render();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (target.dataset.action === "budget-slider") {
      appState.activeBudgetSlider = target.dataset.key || null;
    } else if (target.dataset.action === "invest-slider") {
      appState.activeInvestSlider = target.dataset.key || null;
    }
  });

  document.addEventListener("pointerup", () => {
    const hadBudgetSlider = appState.activeBudgetSlider;
    const hadInvestSlider = appState.activeInvestSlider;
    appState.activeBudgetSlider = null;
    appState.activeInvestSlider = null;
    if (hadBudgetSlider) updateBudgetUI();
    if (hadInvestSlider) updateInvestmentUI();
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.action === "budget-slider") {
      appState.activeBudgetSlider = null;
      updateBudgetUI();
    } else if (target.dataset.action === "invest-slider") {
      appState.activeInvestSlider = null;
      updateInvestmentUI();
    }
  });

  if (typeof window !== "undefined") {
    window.__lifequestTest = {
      appState,
      handleSignUp,
      handleSignIn,
      startNewGame,
      continueGame,
      resetGame,
      handleBudgetSliderInput,
      handleInvestmentSliderInput,
      handleEventChoice,
      confirmBudget,
      confirmInvestments,
      answerChallenge,
      continueFromChallenge,
      continueMonth,
      openQuiz,
      answerQuiz,
      nextQuizQuestion,
      claimQuizRewards,
      render,
    };
  }

  boot();
})();
