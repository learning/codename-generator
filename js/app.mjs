import { getCodename, MAX_POSITION, MIN_POSITION } from './codename.mjs';

const slider = document.querySelector('#cycle-slider');
const position = document.querySelector('#position');
const adjective = document.querySelector('#adjective');
const noun = document.querySelector('#noun');
const codename = document.querySelector('#codename');
const rangeValue = document.querySelector('#range-value');

function display(positionValue) {
  const entry = getCodename(positionValue);
  const progress = ((entry.position - MIN_POSITION) / (MAX_POSITION - MIN_POSITION)) * 100;

  slider.value = entry.position;
  slider.style.setProperty('--slider-progress', `${progress}%`);
  slider.setAttribute('aria-valuetext', `${entry.position} of ${MAX_POSITION}: ${entry.codename}`);
  position.textContent = String(entry.position).padStart(3, '0');
  adjective.textContent = entry.adjective;
  noun.textContent = entry.noun;
  codename.textContent = entry.codename;
  rangeValue.textContent = entry.position;
}

slider.min = MIN_POSITION;
slider.max = MAX_POSITION;
slider.addEventListener('input', (event) => display(event.currentTarget.value));

display(slider.value);
