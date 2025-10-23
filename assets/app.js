// HR Portal JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initRoleSwitcher();
  initNavigation();
  initSectionToggles();
  initToasts();
  initFormHandlers();
  updateBadgesFromURL();
  renderPageContent();
});

// Role Switcher
function initRoleSwitcher() {
  const roleSwitch = document.getElementById('role-switch');
  if (roleSwitch) {
    roleSwitch.addEventListener('change', function() {
      const role = this.value;
      updateURLParam('role', role);
      updateBadge('role', role);
      
      // Navigate to appropriate dashboard
      if (role === 'employee') {
        window.location.href = 'employee.html';
      } else if (role === 'manager') {
        window.location.href = 'manager.html';
      }
    });
  }
}

// Navigation
function initNavigation() {
  // Employee dashboard buttons
  const enterEmployeeBtn = document.getElementById('enter-employee');
  if (enterEmployeeBtn) {
    enterEmployeeBtn.addEventListener('click', function() {
      window.location.href = 'employee.html';
    });
  }
  
  const enterManagerBtn = document.getElementById('enter-manager');
  if (enterManagerBtn) {
    enterManagerBtn.addEventListener('click', function() {
      window.location.href = 'manager.html';
    });
  }
  
  // Back buttons
  const backEmployeeBtn = document.getElementById('btn-back-employee');
  if (backEmployeeBtn) {
    backEmployeeBtn.addEventListener('click', function() {
      window.location.href = 'employee.html';
    });
  }
  
  const backEmployeeBenefitsBtn = document.getElementById('btn-back-employee-benefits');
  if (backEmployeeBenefitsBtn) {
    backEmployeeBenefitsBtn.addEventListener('click', function() {
      window.location.href = 'employee.html';
    });
  }
  
  const backEmployeeTrainingBtn = document.getElementById('btn-back-employee-training');
  if (backEmployeeTrainingBtn) {
    backEmployeeTrainingBtn.addEventListener('click', function() {
      window.location.href = 'employee.html';
    });
  }
  
  // View reviews buttons
  const viewReviewsBtns = document.querySelectorAll('[id^="btn-view-reviews-"]');
  viewReviewsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const empId = this.id.replace('btn-view-reviews-', '');
      window.location.href = `reviews.html`;
    });
  });
  
  // Review buttons
  const reviewBtns = document.querySelectorAll('[id^="btn-review-"]');
  reviewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const empId = this.id.replace('btn-review-', '');
      window.location.href = `review-form.html?emp=${empId}`;
    });
  });
}

// Section Toggles
function initSectionToggles() {
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const section = this.parentElement;
      section.classList.toggle('collapsed');
      
      const chevron = this.querySelector('.chevron');
      if (chevron) {
        chevron.classList.toggle('rotated');
      }
    });
  });
}

// Toasts
function initToasts() {
  // Toast will automatically hide after 3 seconds
  // We just need to handle showing them
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Form Handlers
function initFormHandlers() {
  // Profile Wizard
  const nextBtn = document.getElementById('btn-wiz-next');
  const prevBtn = document.getElementById('btn-wiz-prev');
  const saveBtn = document.getElementById('btn-wiz-save');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      const activeStep = document.querySelector('.step.active');
      const nextStep = activeStep.nextElementSibling;
      
      if (nextStep && nextStep.classList.contains('step')) {
        activeStep.classList.remove('active');
        nextStep.classList.add('active');
        
        updateWizardTabs();
        updateWizardButtons();
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      const activeStep = document.querySelector('.step.active');
      const prevStep = activeStep.previousElementSibling;
      
      if (prevStep && prevStep.classList.contains('step')) {
        activeStep.classList.remove('active');
        prevStep.classList.add('active');
        
        updateWizardTabs();
        updateWizardButtons();
      }
    });
  }
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      showToast('Profile saved successfully!');
    });
  }
  
  // Update wizard buttons when tabs change
  const stepTabs = document.querySelectorAll('.step-tab');
  stepTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const stepId = this.id.replace('wiz-step-', 'step-');
      document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
      });
      document.getElementById(stepId).classList.add('active');
      
      updateWizardTabs();
      updateWizardButtons();
    });
  });
  
  // Dependent checkbox
  const addDependentCheckbox = document.getElementById('add-dependent');
  if (addDependentCheckbox) {
    addDependentCheckbox.addEventListener('change', function() {
      const dependentFields = document.getElementById('dependent-fields');
      if (dependentFields) {
        dependentFields.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // Benefits confirmation
  const confirmBenefitsBtn = document.getElementById('btn-confirm-benefits');
  if (confirmBenefitsBtn) {
    confirmBenefitsBtn.addEventListener('click', function() {
      const selectedPlan = document.querySelector('input[name="benefit"]:checked');
      if (!selectedPlan) {
        showToast('Please select a benefits plan.');
        return;
      }
      
      const addDependent = document.getElementById('add-dependent');
      if (addDependent && addDependent.checked) {
        const depName = document.getElementById('dep-name-1');
        const depRel = document.getElementById('dep-rel-1');
        if (!depName.value || !depRel.value) {
          showToast('Please fill in dependent information.');
          return;
        }
      }
      
      showToast('Benefits confirmed successfully!');
    });
  }
  
  // Training module actions
  const startButtons = document.querySelectorAll('[id^="btn-start-"]');
  startButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const moduleId = this.id.replace('btn-start-', '');
      const completeBtn = document.getElementById(`btn-complete-${moduleId}`);
      const statusElement = document.getElementById(`status-${moduleId}`);
      
      if (completeBtn && statusElement) {
        this.style.display = 'none';
        completeBtn.style.display = 'inline-block';
        statusElement.textContent = 'In Progress';
      }
      
      showToast(`Started module ${moduleId.toUpperCase()}`);
    });
  });
  
  const completeButtons = document.querySelectorAll('[id^="btn-complete-"]');
  completeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const moduleId = this.id.replace('btn-complete-', '');
      const statusElement = document.getElementById(`status-${moduleId}`);
      
      if (statusElement) {
        statusElement.textContent = 'Complete';
      }
      
      showToast(`Completed module ${moduleId.toUpperCase()}`);
      updateTrainingProgress();
    });
  });
  
  // Review form
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate required fields
      const rating = document.getElementById('f-rating').value;
      const goals = document.getElementById('f-goals').value;
      const comments = document.getElementById('f-comments').value;
      
      if (!rating || !goals || !comments) {
        showToast('Please fill in all required fields.');
        return;
      }
      
      if (rating < 1 || rating > 5) {
        showToast('Rating must be between 1 and 5.');
        return;
      }
      
      showToast('Review submitted successfully!');
      // SURVEY TRIGGER: After submit
      setTimeout(() => {
        window.location.href = 'reviews.html';
      }, 1500);
    });
  }
  
  // Save draft
  const saveDraftBtn = document.getElementById('btn-save-draft');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', function() {
      showToast('Review saved as draft.');
    });
  }
  
  // Cancel review
  const cancelReviewBtn = document.getElementById('btn-cancel-review');
  if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener('click', function() {
      window.location.href = 'reviews.html';
    });
  }
}

// Helper Functions
function updateURLParam(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.replaceState({}, '', url);
}

function updateBadge(type, value) {
  const badge = document.getElementById(`badge-${type}`);
  if (badge) {
    badge.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    if (type === 'day' || type === 'window') {
      badge.style.display = 'inline-block';
    }
  }
}

function updateBadgesFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const role = urlParams.get('role');
  if (role) {
    updateBadge('role', role);
    const roleSwitch = document.getElementById('role-switch');
    if (roleSwitch) {
      roleSwitch.value = role;
    }
  }
  
  const day = urlParams.get('day');
  if (day) {
    updateBadge('day', `Day ${day}`);
  }
  
  const windowParam = urlParams.get('window');
  if (windowParam) {
    updateBadge('window', windowParam.charAt(0).toUpperCase() + windowParam.slice(1));
  }
}

function updateWizardTabs() {
  const activeStep = document.querySelector('.step.active');
  const stepIndex = Array.from(document.querySelectorAll('.step')).indexOf(activeStep);
  
  document.querySelectorAll('.step-tab').forEach((tab, index) => {
    if (index === stepIndex) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

function updateWizardButtons() {
  const activeStep = document.querySelector('.step.active');
  const steps = document.querySelectorAll('.step');
  const stepIndex = Array.from(steps).indexOf(activeStep);
  
  const prevBtn = document.getElementById('btn-wiz-prev');
  const nextBtn = document.getElementById('btn-wiz-next');
  const saveBtn = document.getElementById('btn-wiz-save');
  
  if (prevBtn) {
    prevBtn.disabled = stepIndex === 0;
  }
  
  if (nextBtn && saveBtn) {
    if (stepIndex === steps.length - 1) {
      nextBtn.style.display = 'none';
      saveBtn.style.display = 'inline-block';
    } else {
      nextBtn.style.display = 'inline-block';
      saveBtn.style.display = 'none';
    }
  }
}

function updateTrainingProgress() {
  // This would normally calculate based on completed modules
  const progressFill = document.getElementById('training-progress-fill');
  if (progressFill) {
    progressFill.style.width = '33%';
  }
}

function renderPageContent() {
  // Render content based on current page and state
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'employee.html') {
    renderEmployeeDashboard();
  } else if (currentPage === 'manager.html') {
    renderManagerDashboard();
  } else if (currentPage === 'review-form.html') {
    renderReviewForm();
  }
}

function renderEmployeeDashboard() {
  // Update progress bar
  const progressFill = document.getElementById('onboarding-progress-fill');
  if (progressFill) {
    progressFill.style.width = '45%';
  }
  
  // Set up tile buttons
  const onboardingBtn = document.getElementById('cta-open-onboarding');
  if (onboardingBtn) {
    onboardingBtn.addEventListener('click', function() {
      window.location.href = 'onboarding.html';
    });
  }
  
  const benefitsBtn = document.getElementById('cta-open-benefits');
  if (benefitsBtn) {
    benefitsBtn.addEventListener('click', function() {
      window.location.href = 'benefits.html';
    });
  }
  
  const trainingBtn = document.getElementById('cta-open-training');
  if (trainingBtn) {
    trainingBtn.addEventListener('click', function() {
      window.location.href = 'training.html';
    });
  }
}

function renderManagerDashboard() {
  // Update review window banner based on URL param
  const urlParams = new URLSearchParams(window.location.search);
  const windowParam = urlParams.get('window');
  
  const banner = document.getElementById('review-window-banner');
  if (banner) {
    if (windowParam) {
      banner.textContent = `Performance Review Window: ${windowParam.charAt(0).toUpperCase() + windowParam.slice(1)}`;
    } else {
      banner.textContent = 'Performance Review Window: Open';
    }
  }
}

function renderReviewForm() {
  // Get employee ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const empId = urlParams.get('emp');
  
  if (empId) {
    const titleElement = document.getElementById('review-title');
    if (titleElement) {
      // In a real app, we would look up the employee name from data
      const empNames = {
        'emp101': 'Jordan Patel',
        'emp102': 'Ananya Rao',
        'emp103': 'Luis Gomez'
      };
      titleElement.textContent = `Performance Review: ${empNames[empId] || 'Employee'}`;
    }
  }
}