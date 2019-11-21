const status = document.getElementById('status');
export const button = document.getElementById('button');
const resultsBox = document.getElementById('results');

export function updateStatus( _text, _color ){

  let color = _color || '';

  status.classList.remove('green');
  status.classList.remove('red');
  status.classList.remove('yellow');

  if( color.toLowerCase() === 'green' ){
    status.classList.add('green');
  }
  if( color.toLowerCase() === 'red' ){
    status.classList.add('red');
  }
  if( color.toLowerCase() === 'yellow' ){
    status.classList.add('yellow');
  }

  status.innerHTML = _text;

}

export function buttonState( _state ){

  if( _state === true ){
    button.disabled = false;
  } else {
    button.disabled = true;
  }

}

export function results( _text ){
  resultsBox.innerHTML = _text;
}
