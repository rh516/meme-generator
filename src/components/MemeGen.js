import React, {useState, useEffect} from "react";

function MemeGen() {
    const [state, setState] = useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
    });

    useEffect(() => {
        async function fetchMemes() {
            let response = await fetch("https://api.imgflip.com/get_memes");
            let data = response.json();
            return data;
        }

        fetchMemes()
            .then(res => {
                const {memes} = res.data;
                setState(prevState => {
                    return {
                        ...prevState,
                        allMemeImgs: memes
                    };
                });
            });
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;

        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    
    function handleClick() {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        const randNum = Math.floor(Math.random() * 100);

        setState(prevState => {
            return {
                ...prevState,
                topText: "",
                bottomText: "",
                randomImg: state.allMemeImgs[randNum].url
            };
        })
    }


    return (
        <div>
            <form className = "meme-form">
                <input
                    type="text"
                    name="topText"
                    value={state.topText}
                    placeholder="Top Text"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    value={state.bottomText}
                    placeholder="Bottom Text"
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Gen</button>
            </form>

            <div className="meme">
                <img src={state.randomImg} alt="Meme"/>
                <h2 className="top">{state.topText}</h2>
                <h2 className="bottom">{state.bottomText}</h2>
            </div>
        </div>
    );
}

export default MemeGen;