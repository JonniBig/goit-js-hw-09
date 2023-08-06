import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addeListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const resolve = Math.random() > 0.3;
  const promise = {
    position,
    delay,
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (resolve) {
        res(promise);
      } else {
        rej(promise);
      }
    }, delay);
  });
}
