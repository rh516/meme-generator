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
                setState({
                    ...state,
                    allMemeImgs: memes
                });
            });
    }, []);

    return (
        <h1>Meme Generator Section</h1>
    );
}

export default MemeGen;