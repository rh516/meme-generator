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


    return (
        <div>
            <h1>Meme Generator Section</h1>
            <form className = "meme-form">
                <input/>
                <input/>
                <button>Gen</button>
            </form>
        </div>
    );
}

export default MemeGen;