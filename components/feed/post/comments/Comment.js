import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
	return (
		<div>
			<p>{comment.text}</p>
		</div>
	);
};

Comment.propTypes = {};

export default Comment;
