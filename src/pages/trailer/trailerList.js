import React from 'react'
const trailer = [
    {
        id: 934632,
        link: 'https://www.youtube.com/watch?v=VvSrHIX5a-0'
    },
    {
        id: 2,
        link: 'https://www.youtube.com/watch?v=V8i6PB0gGOA'
    },
    {
        id: 3,
        link: 'https://www.youtube.com/watch?v=lV1OOlGwExM'
    },
    {
        id: 4,
        link: 'https://www.youtube.com/watch?v=Kdr5oedn7q8'
    },
    {
        id: 5,
        link: 'https://www.youtube.com/watch?v=dtyPh5yCoWg'
    },
    {
        id: 6,
        link: 'https://www.youtube.com/watch?v=Way9Dexny3w'
    },
    {
        id: 7,
        link: 'https://www.youtube.com/watch?v=TROFbLnBFgI'
    },
    {
        id: 8,
        link: 'https://www.youtube.com/watch?v=_inKs4eeHiI'
    },
    {
        id: 9,
        link: 'https://www.youtube.com/watch?v=PSEoAaSswgo'
    },
    {
        id: 10,
        link: 'https://www.youtube.com/watch?v=fhr3MzT6exg'
    },
    {
        id: 11,
        link: 'https://www.youtube.com/watch?v=ewxS9Z-XXYo'
    },
    {
        id: 12,
        link: 'https://www.youtube.com/watch?v=IeFWNtMo1Fs'
    },
    {
        id: 13,
        link: 'https://www.youtube.com/watch?v=uYPbbksJxIg'
    },

    {
        id: 14,
        link: 'https://www.youtube.com/watch?v=5bQubBPFEoE'
    },
    {
        id: 15,
        link: 'https://www.youtube.com/watch?v=p2zC-lM5IU4'
    },
    {
        id: 16,
        link: 'https://www.youtube.com/watch?v=UOZY7TEMz5c'
    },
    {
        id: 17,
        link: 'https://www.youtube.com/watch?v=3PsP8MFH8p0'
    },
    {
        id: 18,
        link: 'https://www.youtube.com/watch?v=l9288UVTHkA'
    },
    {
        id: 19,
        link: 'https://www.youtube.com/watch?v=FEkkzLA8WzY'
    },
    {
        id: 20,
        link: 'https://www.youtube.com/watch?v=n9xhJrPXop4'
    },
]


function trailerList() {
    return (
        <div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {trailer.map(trailerItem => (
                    <a key={trailerItem.id} href={trailerItem.link} target="_blank" style={{ textDecoration: "none" }}>
                        <p>
                            <span className="movie__homeButton movie__Button">Trailer {trailerItem.id} <i className="newTab fas fa-external-link-alt"></i></span>
                        </p>
                    </a>
                ))}
            </div>

        </div>
    )
}

export default trailerList
