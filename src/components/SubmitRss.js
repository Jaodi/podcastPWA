import React from 'react';
import './SubmitRss.css';
import PropTypes from 'prop-types';
import { fetchApi } from '../utils/fetchApi';
import { subscribe } from '../registerServiceWorker'; 
import { withRouter } from 'react-router-dom'
import { openPodcast } from '../actions/index';
import { connect } from 'react-redux';

@withRouter
@connect(
    ()=>({}),
    dispatch => ({
        openPodcast: podcast => dispatch(openPodcast(podcast))
    })
)
class SubmitRss extends React.Component {
    submitClick  = async (e, value) => {
        e.preventDefault();
        try {
            const res = await fetchApi('checkRssLink', {link: value});
            const text = await res.json();
            console.log(text);
            this.props.openPodcast(text);
            this.props.history.push('/podcast')
            // browserHistory.push('/podcast')
        } catch (e) {
            console.error(e);
        }
    }

    subscriptionClick = async () => {
        await subscribe();
    } 

    render () {
        return ( 
            <SubmitRssLayout 
                submitClick={this.submitClick}
                subscriptionClick= {this.subscriptionClick}
            />
        );
    }
}

SubmitRss.contextTypes = {
    router: PropTypes.object
}

const SubmitRssLayout = ({ submitClick, subscriptionClick }) => 
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


SubmitRssLayout.propTypes = {
    submitClick: PropTypes.func,
    subscriptionClick: PropTypes.func
}

export { SubmitRss }