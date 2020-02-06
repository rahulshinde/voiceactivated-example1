var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognizing;
var recognition = new SpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset;

var selected_element,
    selected;

Site = {};

Site.colors = {
  'red': '#f00',
  'blue': '#00f',
  'green': '#0f0'
}

Site.rows = {
  'alpha': 'a',
  'beta': 'b',
  'charlie': 'c',
  'delta': 'd',
  'echo': 'e',
  'foxtrot': 'f',
  'golf': 'g',
  'hotel': 'h'
}

Site.columns = {
  'one': '1',
  '1': '1',
  'two': '2',
  '2': '2',
  'three': '3',
  '3': '3',
  'four': '4',
  'for': '4',
  '4': '4',
  'five': '5',
  '5': '5',
  'six': '6',
  '6': '6',
  'seven': '7',
  '7': '7',
  'eight': '8',
  '8': '8',
}

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      document.getElementById('input_text').innerHTML = event.results[i][0].transcript;
      parseResult(event.results[i][0].transcript);
    }
  }
}

function reset() {
  recognizing = false;
  button.innerHTML = "Click to Start Painting";
}

function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    button.innerHTML = "Stop Painting (Recording)";
  }
}

function parseResult(text){
  var text_array = text.split(' ');
  if (selected){
    color = findOutput(text_array, Site.colors);
    setColor(color);
  } else if (text.includes('select')){
    var row = findOutput(text_array, Site.rows);
    var column = findOutput(text_array, Site.columns);
    setSelected(row, column);
  }
}

function findOutput(text_array, hash){
  var output;
  text_array.forEach((e)=>{
    if (hash[e.toLowerCase()]){
      output = hash[e.toLowerCase()];
    }
  });
  return output;
}

function setColor(color){
  if (color){
    selected_element.style.background = color;
    selected_element.classList.add('color_set');
  }

  selected_element.classList.remove('selected');
  selected = false;
}

function setSelected(row, column){
  selected_element = document.getElementById(row + column);
  selected = true;
  selected_element.classList.add('selected');
}