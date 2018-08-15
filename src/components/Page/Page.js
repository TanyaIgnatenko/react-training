import React from 'react';
import PropTypes from 'prop-types';

import './Page.css';

export default function Page(props) {
    return (
        <div className='page__container'>
            <h1 className='page__title'>{props.title}</h1>
            {props.content}
        </div>
    );
}

PropTypes.default = {
    title: '',
    content: null
};

Page.propTypes = {
    title: PropTypes.string,
    content: PropTypes.element
};