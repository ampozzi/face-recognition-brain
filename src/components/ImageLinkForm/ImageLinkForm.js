import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({ onInputChange,onButtonSubmit })=>{
    return(
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div>
                <div className='form inline-flex flex-wrap justify-center w-60 pa4 br4 shadow-5 '>
                    <input 
                        className='f4 pa2 ba b--black-10 w-70 ' 
                        type="text" 
                        onChange={onInputChange} />
                    <button 
                        className='grow f4 link ph3 pa2 white bg-light-purple ba b--black-10' 
                        onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
//center pa4 br3 shadow-5 w-60 inline-flex flex-wrap justify-center 
// f4 pa2 ba b--black-10 
//grow f4 link ph3 pa2 white bg-light-purple ba b--black-10
export default ImageLinkForm;