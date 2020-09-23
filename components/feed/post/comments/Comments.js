import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const Comments = ({ comments }) => {
	console.log(comments);
	const commentMap = comments.map((comment, i) => {
		return <Comment comment={comment} key={i} />;
	});
	return <div>{commentMap}</div>;
};

Comments.propTypes = {};

export default Comments;
