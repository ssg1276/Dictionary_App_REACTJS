import React, { useState } from 'react'

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
    name: '',
    audio2: '',
    isPlaying2: false,
  })

  const changeHandler = (event) => {
    setState({
      ...state,
      inputValue: event.target.value,
      show: false,
      error: false,
      isPlaying: false,
      isPlaying2: false,
    })
  }

  const playAudio = () => {
    setState({ ...state, isPlaying: true })
    const audioElement = new Audio(state.audio)
    audioElement.play()
    audioElement.addEventListener('ended', () => {
      setState({ ...state, isPlaying: false })
    })
  }

  const playAudio2 = () => {
    setState({ ...state, isPlaying2: true })
    const audioElement = new Audio(state.audio2)
    audioElement.play()
    audioElement.addEventListener('ended', () => {
      setState({ ...state, isPlaying2: false })
    })
  }

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
          audio2: data[0].phonetics[1]?.audio,
        })
      })
      .catch((error) => {
        setState({
          ...state,
          error: true,
          show: false,
          result: error.toString(),
        })
      })
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-[500px] rounded-md shadow-lg p-6">
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          onChange={changeHandler}
          value={state.inputValue}
          placeholder="Enter word"
          className="p-2 m-4 rounded-md border border-white focus:outline-none focus:border-purple-700"
        />
        <button
          className="bg-white text-purple-700 font-bold uppercase rounded-md shadow-md p-2 m-4 hover:bg-purple-700 hover:text-white focus:outline-none focus:shadow-outline"
          onClick={searchWord}
        >
          Search
        </button>
      </div>
      <div className={state.show ? 'flex flex-col m-2' : 'hidden'}>
        <p className="text-black uppercase font-black">
          word:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.word1}
          </span>
        </p>
        <p className="text-black uppercase font-black">
          text:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.text}
          </span>
        </p>
        <p className="text-black uppercase font-black">
          Audio by-US 3.0:{' '}
          {state.audio && (
            <button
              onClick={playAudio}
              disabled={state.isPlaying}
              className="bg-blue-500 text-white p-2  font-normal rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              {state.isPlaying ? 'Playing...' : 'Play Audio'}
            </button>
          )}
        </p>
        <p className="text-black uppercase font-black">
          Audio by-SA 3.0:{' '}
          {state.audio2 && (
            <button
              onClick={playAudio2}
              disabled={state.isPlaying2}
              className="bg-blue-500 text-white p-2 font-normal rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              {state.isPlaying2 ? 'Playing...' : 'Play Audio'}
            </button>
          )}
        </p>
        <p className="text-black uppercase font-black">
          meaning:
          <span className=" text-white lowercase font-normal p-1">
            {state.def}
          </span>
        </p>{' '}
      </div>
      <div className={state.error ? 'flex flex-col m-2' : 'hidden'}>
        <p className="text-white">{state.result}</p>
      </div>
    </div>
  )
}

export default Card
