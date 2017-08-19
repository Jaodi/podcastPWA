import React from 'react';
import { connect } from 'react-redux';
import { loadPodcastPreviews } from '../../actions/index';
import { Preview } from './Preview';
import { SubmitRss } from '../SubmitRss';
import { HowItWorksLink } from '../HowItWorksLink';
import { GenericList } from '../layout/GenericList';
import { ItemBanner } from '../layout/ItemBanner';

const PreviewsPageView = ({
  previews,
  loadPodcastPreviews
}) => {
  if (!previews) {
    loadPodcastPreviews();
    return <span>catalogue is loading</span>
  }

  return <div>
    <ItemBanner
      title='Podcast catalogue'
    >
      <div>
        <SubmitRss/>
        <HowItWorksLink section='addingPodcasts' />
      </div>
    </ItemBanner>
    <GenericList
      items={previews.map((el, index) => 
        <Preview 
          key={index}
          description={el.description}
          entries={el.entries}
          icon={el.icon}
          link={el.link}
          selectedEpisode={el.selectedEpisode}
          title={el.title}
          id={el.id}
        />
      )}
    />
  </div> 
}

const PreviewsPage = connect(state => ({
  previews: state.previews
}), dispatch => ({
  loadPodcastPreviews: id => dispatch(loadPodcastPreviews(id))
})
)(PreviewsPageView)

export {
  PreviewsPage
}