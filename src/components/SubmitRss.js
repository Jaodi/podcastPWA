import React from 'react';
import './SubmitRss.css';
import PropTypes from 'prop-types';
import { fetchApi } from '../utils/fetchApi';
import { withRouter } from 'react-router-dom'

@withRouter
class SubmitRss extends React.Component {
    submitClick  = async (e, value) => {
        e.preventDefault();
        try {
            const res = await fetchApi('checkRssLink', {link: value});
            const text = await res.json();
            console.log(text);
            this.props.history.push(`/podcast/${text.id}`)
            // browserHistory.push('/podcast')
        } catch (e) {
            console.error(e);
        }
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

const SubmitRssLayout = ({ submitClick, subscriptionClick }) => <div className='submitrss'>
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
    </form>
</div>


SubmitRssLayout.propTypes = {
    submitClick: PropTypes.func,
    subscriptionClick: PropTypes.func
}

export { SubmitRss }