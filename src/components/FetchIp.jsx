import React, {useState, useEffect} from 'react'
import axios from "axios"

const FetchIp = () => {
    const [memeList, setMemeList] = useState([])
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        img: "https://i.imgflip.com/30b1gx.jpg"
    })

    const fetchMeme = async() => {
        try {
            const response = await axios.get("https://api.imgflip.com/get_memes")
            // console.log(response)

            const memes = response.data.data.memes
            console.log(memes)

            setMemeList(memes)
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMeme();
    }, [])

    const getRandomImg = () =>{
        const memeImg = memeList[Math.floor(Math.random() * memeList.length)]
        let url = memeImg.url;

        setMeme((prevMeme) => ({
            ...prevMeme, img: url,
        }))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMeme((prevMeme) => ({
            ...prevMeme, [name]: value,
        }))
    }


  return (
    <div>
      <div className='input'>
        <input
          onChange={handleChange}
          value={meme.topText}
          placeholder="type something"
          type="text"
          name="topText"
        />
        <input
          onChange={handleChange}
          value={meme.bottomText}
          placeholder="type something"
          type="text"
          name="bottomText"
        />
      </div>

      <button onClick={getRandomImg}>Get new meme! </button>

      <div className='singleMeme'>
        <img src="{meme.img}" alt="meme" />
        <p> {meme.topText} </p>
        <p> {meme.bottomText} </p>

      </div>
    </div>
  );
}

export default FetchIp