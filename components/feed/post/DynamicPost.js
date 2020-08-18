import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/feed';
import { useRouter } from 'next/router';
import style from './DynamicPost.module.scss';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';

const DynamicPost = ({ feed: { post, loading }, getPost }) => {
	const router = useRouter();

	const { id, UserPost } = router.query;

	useEffect(() => {
		if (id) getPost(id);
	}, []);
	console.log(post);
	return <LoadingSpinner />;
};

DynamicPost.propTypes = {};

const mapStateToProps = (state) => ({
	feed: state.feed,
});

export default connect(mapStateToProps, { getPost })(DynamicPost);
