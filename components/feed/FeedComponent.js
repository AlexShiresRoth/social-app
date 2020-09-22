import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './FeedComponent.module.scss';
import { connect } from 'react-redux';
import { getNewsFeed } from '../actions/feed';
import Post from './Post';
import CreatePost from './create-post/CreatePost';
import SideBar from './side-bar/SideBar';

//TODO lazy load infinite posting
const FeedComponent = ({ getNewsFeed, feed: { loading, newsFeed } }) => {
	useEffect(() => {
		getNewsFeed();
	}, []);

	return !loading ? (
		<section className={style.section}>
			<div className={style.container}>
				<SideBar />
				<div className={style.feed}>
					<div className={style.post_create}>
						<CreatePost />
					</div>
					{newsFeed.map((post, i) => {
						return <Post post={post} key={i} />;
					})}
				</div>
				<div className={style.activity}></div>
			</div>
		</section>
	) : (
		<p>Loading...</p>
	);
};

FeedComponent.propTypes = {
	getNewsFeed: PropTypes.func,
};

const mapStateToProps = (state) => ({
	feed: state.feed,
});

export default connect(mapStateToProps, { getNewsFeed })(FeedComponent);
