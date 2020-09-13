import React, {useState, useEffect} from "react";
import Draggable from "react-draggable";

function MemeGen() {
    const [state, setState] = useState({
        text1: "",
        text2: "",
        text3: "",
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
        const randNum = Math.floor(Math.random() * state.allMemeImgs.length);

        setState(prevState => {
            return {
                ...prevState,
                text1: "",
                text2: "",
                text3: "",
                randomImg: state.allMemeImgs[randNum].url
            };
        })
    }


    return (
        <div>
            <form className = "meme-form">
                <input
                    type="text"
                    name="text1"
                    value={state.text1}
                    placeholder="Text 1"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="text2"
                    value={state.text2}
                    placeholder="Text 2"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="text3"
                    value={state.text3}
                    placeholder="Text 3"
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Gen</button>
            </form>

            <div className="meme">
                <img src={state.randomImg} alt="Meme"/>
                <Draggable>
                    <h1 className="top">{state.text1}</h1>
                </Draggable>
                <Draggable>
                    <h1 className="bottom">{state.text2}</h1>
                </Draggable>
                <Draggable>
                    <h1 className="middle">{state.text3}</h1>
                </Draggable>
            </div>
        </div>
    );
}

export default MemeGen;