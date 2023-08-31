import React, {useState, useEffect} from 'react'
import axios from "axios"

const FetchIp = () => {
    const [allMemes, setAllMemes] = useState([])
    const [currentMeme, setCurrentMeme] = useState({})
    const [topInput, setTopInput] = useState("")
    const [bottomInput, setBottomInput] = useState("")

    const fetchMeme = async() => {
        try {
            const response = await axios.get("https://api.imgflip.com/get_memes")
            // console.log(response)
            const memes = response.data.data.memes
            // console.log(memes)
            setAllMemes(memes)
            setCurrentMeme(memes[0])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMeme();
    }, [])


    const handleClick = () => {
      const randomMeme = Math.floor(Math.random() * allMemes.length)
      setCurrentMeme(allMemes[randomMeme])
      }

   const topInputHandler = (e) => {
    setTopInput(e.target.value)
   }

   const bottomInputHandler = (e) => {
    setBottomInput(e.target.value)
   }

  return (
    <div className="memeContainer">
      {currentMeme && (
        <div>
          <h1 className='header'>Meme Generator</h1>
          <input
            onChange={topInputHandler}
            type="text"
            placeholder="Top text"
            value={topInput}
            required
          />
          <input
            onChange={bottomInputHandler}
            type="text"
            placeholder="Bottom text"
            value={bottomInput}
            required
          />
          <div className="memeBtn">
            <button onClick={handleClick}>Select random meme</button>
          </div>
          <div className="memeImg">
            <img src={currentMeme.url} alt="Meme" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchIp