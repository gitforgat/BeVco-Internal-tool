// BeverageCo HRIS Mock Data

// Employee Data
const employees = [
  { id: "emp101", name: "Jordan Patel", department: "Engineering", lastReview: "2023-06-15" },
  { id: "emp102", name: "Ananya Rao", department: "Marketing", lastReview: "2023-06-20" },
  { id: "emp103", name: "Luis Gomez", department: "Sales", lastReview: "2023-06-25" }
];

// Training Modules
const trainingModules = [
  { id: "sec101", code: "SEC101", name: "Data Security Fundamentals", description: "Essential security practices for all employees" },
  { id: "code201", code: "CODE201", name: "Code of Conduct", description: "Company policies and ethical guidelines" },
  { id: "ethics301", code: "ETHICS301", name: "Workplace Ethics", description: "Ethical decision-making in the workplace" }
];

// Review Periods
const reviewPeriods = {
  current: {
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "open"
  },
  previous: {
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "closed"
  }
};

// Benefits Plans
const benefitsPlans = {
  silver: {
    name: "Silver Plan",
    description: "Basic coverage for you and family",
    cost: "$50/month"
  },
  gold: {
    name: "Gold Plan",
    description: "Enhanced coverage with dental and vision",
    cost: "$100/month"
  },
  platinum: {
    name: "Platinum Plan",
    description: "Premium coverage with additional wellness benefits",
    cost: "$150/month"
  }
};

// Export data
window.HRISData = {
  employees,
  trainingModules,
  reviewPeriods,
  benefitsPlans
};