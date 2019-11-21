import * as tf from '@tensorflow/tfjs';
import { generateText } from './model/model.js';
import { TextData } from './model/data.js';

import {
  updateStatus, buttonState, results, button
} from './ui.js';

const repo = "https://raw.githubusercontent.com/zachkrall/brooklyn-js-tensorflow/master";

const model_url = repo + "/model/brooklynjs/model.json";
const corpus_url = repo + "/text/results/corpus.txt";

let textData, seed,
    sentenceIndices = [],
    sampleLen, model, text;

updateStatus('Starting...');

async function setup(){

  buttonState(false);
  updateStatus('Loading Corpus...');

  text = await fetch(corpus_url, { method: "GET"})
               .then( data => data.text() )
               .catch( err => {
                  updateStatus('Corpus failed', 'red')
                  return false;
               });

  console.log(text.slice(0,140));

  updateStatus('Loading Model...');

  model = await tf.loadLayersModel(model_url);
  sampleLen = model.inputs[0].shape[1];

  updateStatus('Model Loaded', 'green');


  textData = new TextData('text-data', text, sampleLen, 3);
  let randomSlice = textData.getRandomSlice();
  seed = randomSlice[0];
  sentenceIndices = randomSlice[1];

  updateStatus('Seed Text Generated', 'green');
  results(seed);

  buttonState(true);

}

async function gen(){

  text = await generateText(model, textData, sentenceIndices, 200, 0.35);

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
