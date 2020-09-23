import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, removePost } from '../../actions/feed';
import { BsTrash } from 'react-icons/bs';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import style from './DynamicPost.module.scss';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';
import Link from 'next/link';
import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';

const DynamicPost = ({ feed: { post, loading }, auth: { user, isAuthenticated }, getPost, removePost }) => {
	const router = useRouter();

	const { id, UserPost } = router.query;

	useEffect(() => {
		if (id) getPost(id);
	}, [id]);
	console.log(post);

	const handlePostRemoval = (e) => {
		e.preventDefault();
		if (isAuthenticated) removePost(post._id);
	};

	return loading && post === null ? (
		<div className={style.container}>
			<div className={style.inner}>
				<LoadingSpinner />
			</div>
		</div>
	) : (
		<div className={style.comments_container}>
			<div className={style.inner}>
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

							{user._id === post.user ? (
								<div className={style.actions}>
									<button onClick={(e) => handlePostRemoval(e)} className={style.trash}>
										<BsTrash />
									</button>

									<button
										className={
											style.like +
											` ${
												post.likes.filter((post) => post._id === user._id).length > 0
													? style.liked
													: ''
											}`
										}
										onClick={(e) => likePost(post._id)}
									>
										<FaHandHoldingHeart /> {post.likes.length}
									</button>
								</div>
							) : (
								<div className={style.actions}>
									<button className={style.like}>
										<FaHandHoldingHeart />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<CommentForm postId={id} />
				<Comments comments={post.comments} />
			</div>
		</div>
	);
};

DynamicPost.propTypes = {};

const mapStateToProps = (state) => ({
	feed: state.feed,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPost, removePost })(DynamicPost);
