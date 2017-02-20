import React from 'react';

// generate image dom for spite images
const Sprites = ({spritesList}) => {
	return (
		<div>
		{
			Object.keys(spritesList).map(function (key) {
				if(spritesList[key] !== null) {
						let img = <img src={spritesList[key]} className='img-circle img-responsive' alt={key}/>;
						return <span className='img-sprite' key={key}>{key}<br/>{img}</span>;
				}
			})
		}
		</div>
	)
};

export default Sprites;