document.addEventListener('DOMContentLoaded', function () {

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const isEdit    = projectId !== null;

  const form       = document.getElementById('projectForm');
  const nameInput  = document.getElementById('projectName');
  const descInput  = document.getElementById('projectDesc');
  const submitBtn  = document.getElementById('submitBtn');
  const dangerZone = document.getElementById('dangerZone');
  const deleteBtn  = document.getElementById('deleteBtn');

  if (isEdit) {

    document.getElementById('navCurrent').textContent   = 'Edit Project';
    document.getElementById('pageTitle').textContent    = 'Edit Project';
    document.getElementById('pageSubtitle').textContent = 'Update the project information';
    
    submitBtn.textContent = 'Save Changes';

    if (dangerZone) {
      dangerZone.style.display = 'block';
    }

    form.setAttribute('action', '/projects/' + projectId);

    const hidden = document.createElement('input');

    hidden.type  = 'hidden';
    hidden.name  = '_method';
    hidden.value = 'PATCH';

    form.appendChild(hidden);

    loadData(projectId);
  }

  function loadData(id) {

    const demo = {

      '1': {
        name: 'Website Redesign',
        description: 'Complete redesign of the corporate website.'
      },

      '2': {
        name: 'Mobile Application',
        description: 'Native application for iOS and Android.'
      },

      '3': {
        name: 'API Integration',
        description: 'REST integration with external services.'
      }

    };

    const p = demo[id];

    if (p) {

      nameInput.value = p.name;
      descInput.value = p.description;

      updateCounter(descInput);

    }

  }

  descInput.addEventListener('input', function () {
    updateCounter(this);
  });

  function updateCounter(el) {

    const len = el.value.length;

    const max = parseInt(
      el.getAttribute('maxlength') || 500
    );

    const counter = document.getElementById('charCounter');

    counter.textContent = len + ' / ' + max;
    counter.className   = 'char-counter';

    if (len > max * 0.9) {

      counter.classList.add('over');

    } else if (len > max * 0.7) {

      counter.classList.add('warn');

    }

  }

  window.updateCounter = updateCounter;

  nameInput.addEventListener('input', function () {

    if (this.value.trim()) {

      clearError(this, 'nameError');

    }

  });

  nameInput.addEventListener('blur', function () {

    if (!this.value.trim()) {

      showError(
        this,
        'nameError',
        'Project name is required'
      );

    }

  });

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    if (!validateName()) return;

    submitBtn.disabled = true;

    submitBtn.textContent = isEdit
      ? 'Saving...'
      : 'Creating...';

    setTimeout(function () {

      window.location.href =
        'dashboard.html?success=' +
        (isEdit ? 'updated' : 'created');

    }, 1000);

  });

  if (deleteBtn) {

    deleteBtn.addEventListener('click', function () {

      if (
        !confirm(
          '"' +
          (nameInput.value || 'this project') +
          '" will be deleted.\nThis action cannot be undone!'
        )
      ) return;

      deleteBtn.disabled    = true;
      deleteBtn.textContent = 'Deleting...';

      setTimeout(function () {

        window.location.href =
          'dashboard.html?success=deleted';

      }, 800);

    });

  }

  let changed = false;

  nameInput.addEventListener('input', function () {
    changed = true;
  });

  descInput.addEventListener('input', function () {
    changed = true;
  });

  window.addEventListener('beforeunload', function (e) {

    if (changed && !submitBtn.disabled) {

      e.preventDefault();
      e.returnValue = '';

    }

  });

  form.addEventListener('submit', function () {
    changed = false;
  });

  function validateName() {

    const v = nameInput.value.trim();

    if (!v) {

      showError(
        nameInput,
        'nameError',
        'Project name is required'
      );

      return false;
    }

    if (v.length < 2) {

      showError(
        nameInput,
        'nameError',
        'Project name must contain at least 2 characters'
      );

      return false;
    }

    clearError(nameInput, 'nameError');

    return true;

  }

  function showError(input, id, msg) {

    input.classList.add('error');

    const el = document.getElementById(id);

    if (el) {

      el.textContent = msg;
      el.classList.add('show');

    }

  }

  function clearError(input, id) {

    input.classList.remove('error');

    const el = document.getElementById(id);

    if (el) {

      el.classList.remove('show');

    }

  }

});