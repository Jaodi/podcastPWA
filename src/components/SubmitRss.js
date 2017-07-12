import React from 'react';
import './SubmitRss.css';
import PropTypes from 'prop-types';
import { fetchApi } from '../utils/fetchApi';
import { subscribe } from '../registerServiceWorker'; 

class SubmitRss extends React.Component {
    submitClick  = async (e, value) => {
        e.preventDefault();
        try {
            const res = await fetchApi('checkRssLink', {link: value});
            const text = await res.json();
            console.log(text);
        } catch (e) {
            console.error(e);
        }
    }

    subscriptionClick = async () => {
        await subscribe();
    } 

    render () {
        return ( 
            <SubmitRssDumb 
                submitClick={this.submitClick}
                subscriptionClick= {this.subscriptionClick}
            />
        );
    }
}

const SubmitRssDumb = ({ submitClick, subscriptionClick }) => 
    <form 
        id="submitRSS" 
        className="submitrss-form"
    >
        <input 
            type="text" 
            className="submitrss-input"
            ref={(input) => { this.input = input }}
            defaultValue="https://feeds.feedwrench.com/JavaScriptJabber.rss"
        />
        <button 
            type="button"
            className="submitrss-button"
            onClick={(e) => submitClick(e, this.input.value)}
        >
            submit a podcast rss link
        </button>
        <button
            type="button"
            onClick={subscriptionClick}
        >
        Enable notifications
        </button>
        <audio controls>
            <source src="https://media.devchat.tv/js-jabber/JSJ_261_HTTP_2_with_Surma.mp3" type="audio/mpeg" />
        </audio>    
    </form>


SubmitRssDumb.propTypes = {
    submitClick: PropTypes.func,
    subscriptionClick: PropTypes.func
}

export { SubmitRss }