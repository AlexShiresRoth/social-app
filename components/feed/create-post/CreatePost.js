import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './CreatePost.module.scss';
import { createPost } from '../../actions/feed';
import { connect } from 'react-redux';

const CreatePost = ({ createPost, feed }) => {
	const [postData, setData] = useState({
		text: '',
	});
	const { text } = postData;

	const onChange = (e) => setData({ ...postData, [e.target.name]: e.target.value });

	const submitPost = (e) => {
		e.preventDefault();
		createPost(postData);
	};

	return (
		<form className={style.form} onSubmit={(e) => submitPost(e)}>
			<div className={style.inner}>
				<div className={style.input_container}>
					<input
						type="text"
						name="text"
						value={text}
						onChange={(e) => onChange(e)}
						placeholder="Create your post"
					/>
				</div>
				<button>Submit Post</button>
			</div>
		</form>
	);
};

CreatePost.propTypes = {};

const mapStateToProps = (state) => ({
	feed: state.feed,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
