import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/feed';
import style from './CommentForm.module.scss';

const CommentForm = ({ postId, feed, addComment }) => {
	const [data, setData] = useState({
		text: '',
	});
	const { text } = data;

	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addComment(postId, data);
	};
	console.log(postId);
	return (
		<form className={style.comment_form} onSubmit={(e) => onSubmit(e)}>
			<div className={style.inner}>
				<div className={style.text_field}>
					<textarea
						name="text"
						value={text}
						onChange={(e) => onChange(e)}
						placeholder="What're you thinking?"
						required={true}
					></textarea>
				</div>
				<div className={style.btn_container}>
					<button onSubmit={(e) => onSubmit(e)}>Submit</button>
				</div>
			</div>
		</form>
	);
};

CommentForm.propTypes = {};

const mapStateToProps = (state) => ({
	feed: state.feed,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
