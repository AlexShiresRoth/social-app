import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './CreatePost.module.scss';
import { createPost } from '../../actions/feed';
import { connect } from 'react-redux';
import { BsImage } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const CreatePost = ({ createPost }) => {
	const [postData, setData] = useState({
		text: '',
	});
	const [charLength, setLength] = useState(0);
	const { text } = postData;

	const onChange = (e) => setData({ ...postData, [e.target.name]: e.target.value });

	const handleCharLength = (e) => {
		if (text === ' ' || text === '') setLength(0);
		setLength(text.length);
	};

	const [formShowing, toggleForm] = useState(false);

	const submitPost = (e) => {
		e.preventDefault();
		if (charLength <= 300 && charLength > 0) {
			createPost(postData);
			setTimeout(() => {
				setData(() => ({ text: '' }));
				setLength(0);
			}, 100);
		}
	};

	return !formShowing ? (
		<div className={style.form}>
			<div className={style.inner}>
				<p>Feel like writing something?</p>
				<button onClick={(e) => toggleForm(!formShowing)} className={style.toggle_open}>
					New Post <AiOutlinePlus />
				</button>
			</div>
		</div>
	) : (
		<form className={style.form} onSubmit={(e) => submitPost(e)}>
			<div className={style.inner}>
				<div className={style.heading}>
					<p>What's on your mind?</p>
					<button onClick={() => toggleForm(!formShowing)} className={style.toggle_close}>
						<AiOutlineClose />
					</button>
				</div>
				<div className={style.input_container}>
					<textarea
						type="text"
						name="text"
						value={text}
						onChange={(e) => {
							onChange(e);
							handleCharLength(e);
						}}
						placeholder="Create your post"
						required={true}
					></textarea>
				</div>
				<div className={style.actions}>
					<span className={charLength <= 0 || charLength >= 300 ? style.danger_length : style.good_length}>
						{charLength >= 300 ? (
							<>
								<AiOutlineMinus /> {charLength}
							</>
						) : (
							<>
								<MdAdd /> {charLength}
							</>
						)}
					</span>
					<button className={style.add_img_btn}>
						<BsImage />
					</button>
					<button className={style.submit_btn} onSubmit={(e) => submitPost(e)}>
						Submit Post
					</button>
				</div>
			</div>
		</form>
	);
};

CreatePost.propTypes = {};

const mapStateToProps = (state) => ({
	feed: state.feed,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
