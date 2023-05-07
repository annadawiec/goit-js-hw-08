import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const dataLocalStorage = JSON.parse(
  localStorage.getItem('feedback_form_state')
);

if (dataLocalStorage) {
  refs.email.value = dataLocalStorage.email;
  refs.textarea.value = dataLocalStorage.message;
}

refs.form.addEventListener(
  'input',
  throttle(() => {
    const feedback_form_state = {
      email: refs.email.value,
      message: refs.textarea.value,
    };

    localStorage.setItem(
      'feedback_form_state',
      JSON.stringify(feedback_form_state)
    );
  }, 500)
);

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  populateData();
});

function populateData() {
  const dataLocalStorage = JSON.parse(
    localStorage.getItem('feedback_form_state')
  );

  if (dataLocalStorage) {
    console.log('email:', dataLocalStorage.email);
    console.log('message:', dataLocalStorage.message);
    localStorage.removeItem('feedback_form_state');
    refs.form.reset();
  }
}
