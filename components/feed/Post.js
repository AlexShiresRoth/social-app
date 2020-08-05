import React from 'react';
import PropTypes from 'prop-types';
import style from './Post.module.scss';
import { connect } from 'react-redux';
import { removePost } from '../actions/feed';
import { BsTrash } from 'react-icons/bs';
import { FaRegComments, FaHandHoldingHeart } from 'react-icons/fa';
import Router from 'next/router';
//TODO allow user to add background img to post

const Post = ({ post, auth: { user, loading, isAuthenticated }, removePost }) => {
	console.log(post, user);

	const handlePostRemoval = (e) => {
		e.preventDefault();
		if (isAuthenticated) removePost(post._id);
	};

	const authroizedActions = (
		<div className={style.actions}>
			<button onClick={(e) => handlePostRemoval(e)}  className={style.trash}>
				<BsTrash />
			</button>
			<button className={style.comment}>
				<FaRegComments />
			</button>
			<button className={style.like}>
				<FaHandHoldingHeart />
			</button>
		</div>
	);
	const unAuthorizedActions = (
		<div className={style.actions}>
			<button className={style.comment}>
				<FaRegComments />
			</button>
			<button className={style.like}>
				<FaHandHoldingHeart />
			</button>
		</div>
	);

	if (!isAuthenticated) {
		Router.push('/');
	}

	return !loading ? (
		<div className={style.post}>
			<div className={style.container}>
				<div className={style.post_heading}>
					<p>
						posted: <span>{post.date}</span>
					</p>
				</div>
				<div className={style.post_body}>
					<p>{post.text}</p>
				</div>
				<div className={style.post_user}>
					<div className={style.user_container}>
						<div className={style.img_container}>
							<img src={post.userAvatar} alt="user profile" />
						</div>
						<a>{post.author}</a>
					</div>

					{user._id === post.user ? authroizedActions : unAuthorizedActions}
				</div>
			</div>
		</div>
	) : null;
};

Post.propTypes = {
	post: PropTypes.object,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { removePost })(Post);
