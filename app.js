import * as tf from '@tensorflow/tfjs';
import {generateText } from './model/model.js';
import { TextData } from './model/data.js';

import {
  updateStatus,
  buttonState,
  results,
  button
} from './ui.js';


const url = "https://raw.githubusercontent.com/zachkrall/brooklyn-js-tensorflow/master/model/brooklynjs/model.json";

let textData,
    seed,
    sentenceIndices = [],
    sampleLen,
    model,
    text;

async function setup(){

  buttonState(false);

  updateStatus('Loading Corpus...');

  text = await fetch('https://raw.githubusercontent.com/zachkrall/brooklyn-js-tensorflow/master/text/results/corpus.txt', { method: "GET"})
  .then( data => data.text() )
  .catch( err => {
    updateStatus('Corpus failed', 'red')
    return false;
  });

  console.log(text.slice(0,140));

  updateStatus('Loading Model...');

  model = await tf.loadLayersModel(url);
  sampleLen = model.inputs[0].shape[1];

  updateStatus('Model Loaded', 'green');


  textData = new TextData('text-data', text, sampleLen, 3);
  let randomSlice = textData.getRandomSlice();
  seed = randomSlice[0];
  sentenceIndices = randomSlice[1];

  updateStatus('Seed Text Generated', 'green');
  results(seed);

  buttonState(true);

  // gen();
}

async function gen(){

  const text = await generateText(model, textData, sentenceIndices, 200, 0.35);

  updateStatus('Completed', 'green');
  results(seed + text);

}

setup();

button.addEventListener('click', ()=>{
  buttonState(false);
  updateStatus('Generating Text (may slow down your browser)', 'yellow');

  setTimeout( ()=>{
    gen()
  }, 1000 );
});
