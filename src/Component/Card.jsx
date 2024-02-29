import React, { useState } from 'react';

function Card() {
  const [state, setState] = useState({
    inputValue: '',
    word1: '',
    show: false,
    def: '',
    text: '',
    audio: '',
    error: false,
    result: '',
    isPlaying: false,
    name:'',
    audio2:'',
    isPlaying2:false,
  });

  const changeHandler = (event) => {
    setState({ ...state, inputValue: event.target.value, show: false, error: false, isPlaying: false,isPlaying2: false });
  };

  const playAudio = () => {
    setState({ ...state, isPlaying: true });
    const audioElement = new Audio(state.audio);
    audioElement.play();
    audioElement.addEventListener('ended', () => {
      setState({ ...state, isPlaying: false });
    });
  };

  const playAudio2 = () => {
    setState({ ...state, isPlaying2: true });
    const audioElement = new Audio(state.audio2);
    audioElement.play();
    audioElement.addEventListener('ended', () => {
      setState({ ...state, isPlaying2: false });
    });
  };

  const searchWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${state.inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        setState({
          ...state,
          word1: data[0].word,
          def: data[0].meanings[0].definitions[0].definition,
          text: data[0].phonetics[0].text,
          audio: data[0].phonetics[0].audio,
          show: true,
          audio2:data[0].phonetics[1].audio,
        });
      })
      .catch((error) => {
        setState({ ...state, error: true, show: false, result: error.toString() });
      });
  };

  return (
    <div className="bg-black rounded-md shadow-orange-50 shadow-md flex-col flex justify-evenly w-auto h-auto items-center">
      <div className="flex flex-row">
        <input
          type="text"
          onChange={changeHandler}
          value={state.inputValue}
          placeholder="enter word "
          className="p-2 m-4 rounded-md"
        />
        <button
          className="bg-white font-bold uppercase rounded-md shadow-orange-50 shadow-lg p-2 m-4"
          onClick={searchWord}
        >
          Search
        </button>
      </div>
      <div className={state.show ? 'text-white flex flex-col m-2' : 'hidden'}>
        <p>"word" :- {state.word1}</p>
        <p>"text" :- {state.text}</p>
        <p>
          "audio by-US 3.0" :-{' '}
          {state.audio && (
            <button onClick={playAudio} disabled={state.isPlaying}>
              {state.isPlaying ? 'Playing...' : 'Play Audio'}
            </button>
          )}
        </p>
        <p>
          "audio by-SA 3.0" :-{' '}
          {state.audio2 && (
            <button onClick={playAudio2} disabled={state.isPlaying2}>
              {state.isPlaying2 ? 'Playing...' : 'Play Audio'}
            </button>
          )}
        </p>
        <p>"meaning" :- {state.def}</p>
      </div>
      <div className={state.error ? 'text-white flex flex-col m-2' : 'hidden'}>
        <p>{state.result}</p>
      </div>
    </div>
  );
}

export default Card;
