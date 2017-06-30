import React from 'react';
import './SubmitRss.css';
import PropTypes from 'prop-types';

class SubmitRss extends React.Component {
    submitClick (input) { return async e => {
        e.preventDefault();
        const res = await fetch('');
        console.log(res);
    }}

    render () {
        return ( 
            <SubmitRssDumb 
                submitClick={this.submitClick}
            />
        );
    }
}

const SubmitRssDumb = ({ submitClick }) => 
    <form 
        id="submitRSS" 
        className="submitrss-form"
    >
        <input 
            type="text" 
            className="submitrss-input"
            ref={(input) => { this.input = input }}
        />
        <button 
            type="button"
            className="submitrss-button"
            onClick={submitClick(this.input)}
        >
            submit a podcast rss link
        </button>
    </form>


SubmitRssDumb.propTypes = {
    submitClick: PropTypes.func
}

export { SubmitRss }