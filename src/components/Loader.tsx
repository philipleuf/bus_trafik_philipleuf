import React from 'react';
import loadingBus from '../images/busloader.gif';
import './Loader.css';

const Loader = () => (
    <div className='loaderDiv'>
        <div className='loaderInnerDiv'>
            <img src={loadingBus} className='loaderImage' alt="Loading..." />
            <span className='loaderText'>Hämtar bussdata från SLs API</span>
        </div>
    </div>
);

export default Loader;