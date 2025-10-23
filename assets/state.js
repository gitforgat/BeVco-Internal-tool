// BeverageCo HRIS State Management
const STATE_KEY = 'beverageco_hris_state';

// Default state structure
const defaultState = {
  user: { role: "employee" },
  onboarding: {
    profile: { step1: false, step2: false, step3: false, completed: false },
    docs: { idproof: false, bankproof: false },
    welcome: { w1: false, w2: false, w3: false },
    progress: 0
  },
  benefits: { plan: null, dependents: [] },
  training: { 
    sec101: "not-started", 
    code201: "not-started", 
    ethics301: "not-started", 
    progress: 0 
  },
  reviews: {
    window: "open",
    employees: [
      { id: "emp101", name: "Jordan Patel", status: "pending" },
      { id: "emp102", name: "Ananya Rao", status: "draft" },
      { id: "emp103", name: "Luis Gomez", status: "pending" }
    ]
  }
};

// Initialize state
function initState() {
  const savedState = localStorage.getItem(STATE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  } else {
    localStorage.setItem(STATE_KEY, JSON.stringify(defaultState));
    return defaultState;
  }
}

// Get state
function getState() {
  const savedState = localStorage.getItem(STATE_KEY);
  return savedState ? JSON.parse(savedState) : defaultState;
}

// Set state
function setState(newState) {
  localStorage.setItem(STATE_KEY, JSON.stringify(newState));
}

// Update specific part of state
function updateState(updates) {
  const currentState = getState();
  const newState = { ...currentState, ...updates };
  setState(newState);
  return newState;
}

// Onboarding functions
function updateOnboardingProfile(step, completed) {
  const state = getState();
  state.onboarding.profile[step] = completed;
  
  // Check if all steps are completed
  const allStepsCompleted = state.onboarding.profile.step1 && 
                            state.onboarding.profile.step2 && 
                            state.onboarding.profile.step3;
  
  state.onboarding.profile.completed = allStepsCompleted;
  
  // Recalculate progress
  state.onboarding.progress = calculateOnboardingProgress(state.onboarding);
  
  setState(state);
  return state;
}

function updateOnboardingDocs(doc, completed) {
  const state = getState();
  state.onboarding.docs[doc] = completed;
  
  // Recalculate progress
  state.onboarding.progress = calculateOnboardingProgress(state.onboarding);
  
  setState(state);
  return state;
}

function updateOnboardingWelcome(task, completed) {
  const state = getState();
  state.onboarding.welcome[task] = completed;
  
  // Recalculate progress
  state.onboarding.progress = calculateOnboardingProgress(state.onboarding);
  
  setState(state);
  return state;
}

function calculateOnboardingProgress(onboarding) {
  let completedItems = 0;
  let totalItems = 0;
  
  // Profile steps
  totalItems += 3;
  if (onboarding.profile.step1) completedItems++;
  if (onboarding.profile.step2) completedItems++;
  if (onboarding.profile.step3) completedItems++;
  
  // Documents
  totalItems += 2;
  if (onboarding.docs.idproof) completedItems++;
  if (onboarding.docs.bankproof) completedItems++;
  
  // Welcome tasks
  totalItems += 3;
  if (onboarding.welcome.w1) completedItems++;
  if (onboarding.welcome.w2) completedItems++;
  if (onboarding.welcome.w3) completedItems++;
  
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

// Benefits functions
function updateBenefitsPlan(plan) {
  const state = getState();
  state.benefits.plan = plan;
  setState(state);
  return state;
}

function updateBenefitsDependents(dependents) {
  const state = getState();
  state.benefits.dependents = dependents;
  setState(state);
  return state;
}

// Training functions
function updateTrainingModule(moduleId, status) {
  const state = getState();
  state.training[moduleId] = status;
  
  // Recalculate progress
  state.training.progress = calculateTrainingProgress(state.training);
  
  setState(state);
  return state;
}

function calculateTrainingProgress(training) {
  const modules = ['sec101', 'code201', 'ethics301'];
  let completed = 0;
  
  modules.forEach(module => {
    if (training[module] === 'complete') {
      completed++;
    }
  });
  
  return modules.length > 0 ? Math.round((completed / modules.length) * 100) : 0;
}

// Reviews functions
function updateReviewStatus(employeeId, status) {
  const state = getState();
  const employee = state.reviews.employees.find(emp => emp.id === employeeId);
  if (employee) {
    employee.status = status;
  }
  setState(state);
  return state;
}

function updateReviewWindow(windowStatus) {
  const state = getState();
  state.reviews.window = windowStatus;
  setState(state);
  return state;
}

// Initialize state on load
initState();

// Export functions
window.HRISState = {
  getState,
  setState,
  updateState,
  updateOnboardingProfile,
  updateOnboardingDocs,
  updateOnboardingWelcome,
  updateBenefitsPlan,
  updateBenefitsDependents,
  updateTrainingModule,
  updateReviewStatus,
  updateReviewWindow
};