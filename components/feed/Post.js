import React from 'react';
import PropTypes from 'prop-types';
import style from './Post.module.scss';

const Post = ({ post }) => {
	console.log(post);
	return (
		<div className={style.post}>
			<div className={style.container}>
				<div className={style.col}>
					<a>{post.author}</a>
					<p>{post.text}</p>
				</div>
			</div>
		</div>
	);
};

Post.propTypes = {
	post: PropTypes.object,
};

export default Post;
