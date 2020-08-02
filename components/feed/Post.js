import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => {
	console.log(post);
	return <div></div>;
};

Post.propTypes = {
	post: PropTypes.object,
};

export default Post;
