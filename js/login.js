document.addEventListener('DOMContentLoaded', function () {

  const form          = document.getElementById('loginForm');
  const emailInput    = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const alertError    = document.getElementById('alertError');
  const submitBtn     = document.getElementById('submitBtn');
  const toggleBtn     = document.getElementById('togglePassword');
  const rememberBox   = document.getElementById('remember');

  const savedEmail = localStorage.getItem('rememberedEmail');

  if (savedEmail) {

    emailInput.value    = savedEmail;
    rememberBox.checked = true;

  }

  toggleBtn.addEventListener('click', function () {

    const hidden = passwordInput.type === 'password';

    passwordInput.type = hidden
      ? 'text'
      : 'password';

    this.textContent = hidden
      ? '🙈 Hide'
      : '👁 Show';

  });

  emailInput.addEventListener('input', function () {

    if (this.value.trim()) {

      this.classList.remove('error');
      hideAlert();

    }

  });

  passwordInput.addEventListener('input', function () {

    if (this.value) {

      this.classList.remove('error');
      hideAlert();

    }

  });

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    let valid = true;

    if (!email) {

      emailInput.classList.add('error');
      valid = false;

    }

    if (!password) {

      passwordInput.classList.add('error');
      valid = false;

    }

    if (!valid) {

      showAlert('Email or password field is empty!');

      return;

    }

    if (rememberBox.checked) {

      localStorage.setItem(
        'rememberedEmail',
        email
      );

    } else {

      localStorage.removeItem(
        'rememberedEmail'
      );

    }

    setLoading(true);

    setTimeout(() => {

      window.location.href = 'dashboard.html';

    }, 1000);

  });

  function showAlert(msg) {

    alertError.textContent = msg;

    alertError.classList.add('show');

    setTimeout(hideAlert, 5000);

  }

  function hideAlert() {

    alertError.classList.remove('show');

  }

  function setLoading(on) {

    submitBtn.disabled = on;

    submitBtn.textContent = on
      ? 'Loading...'
      : 'Login';

  }

});