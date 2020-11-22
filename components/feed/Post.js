import React from 'react';
import PropTypes from 'prop-types';
import style from './Post.module.scss';
import { connect } from 'react-redux';
import { removePost, likePost } from '../actions/feed';
import { BsTrash } from 'react-icons/bs';
import { FaRegComments, FaHandHoldingHeart } from 'react-icons/fa';
import Router from 'next/router';
import Link from 'next/link';
//TODO allow user to add background img to post

const Post = ({ post, auth: { user, loading, isAuthenticated }, removePost, likePost, feed }) => {
	if (!isAuthenticated) {
		Router.push('/');
	}
	const handlePostRemoval = (e) => {
		e.preventDefault();
		if (isAuthenticated) removePost(post._id);
	};
	console.log(post);

	const authorizedActions = (
		<div className={style.actions}>
			<button onClick={(e) => handlePostRemoval(e)} className={style.trash}>
				<BsTrash />
			</button>
			<Link href={`/post/[${post._id}]/[UserPost]`} as={`/post/${post._id}/UserPost`}>
				<a>
					<button className={style.comment}>
						<FaRegComments />
					</button>
				</a>
			</Link>
			<button
				className={
					style.like + ` ${post.likes.filter((post) => post._id === user._id).length > 0 ? style.liked : ''}`
				}
				onClick={(e) => likePost(post._id)}
			>
				<FaHandHoldingHeart /> {post.likes.length}
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
				<div className={style.post_tags}>
					{post.tags && post.tags.length > 0
						? post.tags.map((tag, i) => {
								return (
									<div className={style.tag_box}>
										<a href="/#">{tag.tagName}</a>
									</div>
								);
						  })
						: null}
				</div>
				<div className={style.post_user}>
					<div className={style.user_container}>
						<div className={style.img_container}>
							<img src={post.userAvatar} alt="user profile" />
						</div>
						<a>{post.author}</a>
					</div>

					{user._id === post.user ? authorizedActions : unAuthorizedActions}
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
	feed: state.feed,
});

export default connect(mapStateToProps, { removePost, likePost })(Post);
