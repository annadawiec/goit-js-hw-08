import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const dataLocalStorage = localStorage.getItem('feedback_form_state');

if (!dataLocalStorage) {
  formAddEventListener();
} else {
  const dataLocalStorageParse = JSON.parse(dataLocalStorage);
  refs.email.value = dataLocalStorageParse.email;
  refs.textarea.value = dataLocalStorageParse.message;
}

function formAddEventListener() {
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
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  populateData();
});

function populateData() {
  const dataLocalStorage = localStorage.getItem('feedback_form_state');

  if (dataLocalStorage) {
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    console.log('email:', dataLocalStorageParse.email);
    console.log('message:', dataLocalStorageParse.message);
    localStorage.removeItem('feedback_form_state');
    refs.form.reset();
  }
}
