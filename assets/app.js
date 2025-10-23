// HR Portal JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initRoleSwitcher();
  initSectionToggles();
  initModals();
  initToasts();
  initFormHandlers();
  updateBadgesFromURL();
});

// Role Switcher
function initRoleSwitcher() {
  const roleSwitch = document.getElementById('role-switch');
  if (roleSwitch) {
    roleSwitch.addEventListener('change', function() {
      const role = this.value;
      updateURLParam('role', role);
      updateBadge('role', role);
    });
  }
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

// Modals
function initModals() {
  // Open modals
  const openButtons = document.querySelectorAll('[data-open]');
  openButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });
  
  // Close modals
  const closeButtons = document.querySelectorAll('[data-close]');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // Close modal when clicking outside content
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
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
  // Profile Save Button
  const saveProfileBtn = document.getElementById('btn-save-profile');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
      showToast('Profile saved successfully!');
      // Close the section
      const section = document.getElementById('section-profile');
      if (section) {
        section.classList.add('collapsed');
        const chevron = section.querySelector('.chevron');
        if (chevron) {
          chevron.classList.remove('rotated');
        }
      }
      // Update progress
      updateProgress(33);
    });
  }
  
  // Cancel Profile Button
  const cancelProfileBtn = document.getElementById('btn-cancel-profile');
  if (cancelProfileBtn) {
    cancelProfileBtn.addEventListener('click', function() {
      // Reset form fields
      const form = document.getElementById('profile-form');
      if (form) {
        form.reset();
      }
      // Close the section
      const section = document.getElementById('section-profile');
      if (section) {
        section.classList.add('collapsed');
        const chevron = section.querySelector('.chevron');
        if (chevron) {
          chevron.classList.remove('rotated');
        }
      }
    });
  }
  
  // Benefits Confirm Button
  const confirmBenefitsBtn = document.getElementById('btn-confirm-benefits');
  if (confirmBenefitsBtn) {
    confirmBenefitsBtn.addEventListener('click', function() {
      const selectedBenefit = document.querySelector('input[name="benefit"]:checked');
      if (!selectedBenefit) {
        showToast('Please select a plan.');
        return;
      }
      showToast('Benefits confirmed!');
      // Close the section
      const section = document.getElementById('section-benefits');
      if (section) {
        section.classList.add('collapsed');
        const chevron = section.querySelector('.chevron');
        if (chevron) {
          chevron.classList.remove('rotated');
        }
      }
      // Update progress
      updateProgress(66);
    });
  }
  
  // Training Complete Button
  const trainingCompleteBtn = document.getElementById('training-mark-complete');
  if (trainingCompleteBtn) {
    trainingCompleteBtn.addEventListener('click', function() {
      showToast('Training marked as complete!');
      // Update progress
      updateProgress(100);
    });
  }
  
  // Review Form Submit
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const comments = document.getElementById('f-comments').value;
      if (!comments.trim()) {
        showToast('Please provide comments.');
        return;
      }
      
      showToast('Review submitted successfully!');
      // Close modal
      const modal = document.getElementById('modal-review');
      if (modal) {
        modal.classList.remove('active');
      }
      // Reset form
      reviewForm.reset();
    });
  }
  
  // Save Draft Button
  const saveDraftBtn = document.getElementById('btn-save-draft');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', function() {
      showToast('Draft saved successfully!');
    });
  }
  
  // Cancel Review Button
  const cancelReviewBtn = document.getElementById('btn-cancel-review');
  if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener('click', function() {
      // Close modal
      const modal = document.getElementById('modal-review');
      if (modal) {
        modal.classList.remove('active');
      }
      // Reset form
      const form = document.getElementById('review-form');
      if (form) {
        form.reset();
      }
    });
  }
  
  // Set review title when opening modal
  const reviewButtons = document.querySelectorAll('[id^="btn-review-"]');
  reviewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const empId = this.id.replace('btn-review-', '');
      const empName = getEmployeeName(empId);
      const titleElement = document.getElementById('review-title');
      if (titleElement) {
        titleElement.textContent = `Performance Review: ${empName}`;
      }
    });
  });
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

function updateProgress(percent) {
  const progressBar = document.getElementById('onboarding-progress');
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
}

function getEmployeeName(empId) {
  const names = {
    'emp101': 'Alex Johnson',
    'emp102': 'Taylor Smith',
    'emp103': 'Jordan Williams'
  };
  return names[empId] || 'Employee';
}