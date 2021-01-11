import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-feather';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { uploadAvatarToStorage } from '../../actions/profile';
import { connect } from 'react-redux';
import style from './AvatarImport.module.scss';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';

const AvatarImport = ({ changeIndex, key, handleProfileData, processing }) => {
	const [file, setFile] = useState('');
	const [path, setPath] = useState('');
	const [savedImg, setSavedImg] = useState('');
	const [imgHasSaved, setSaved] = useState(false);
	const onError = (err) => {
		console.log('Error');
		console.log(err);
	};

	const onSuccess = (res) => {
		console.log('Success');
		console.log(res);
		setFile(res.url);
		setPath(res.filePath);
	};

	//when user clicks save button, dispatch action to upload avatar url to db
	const handleAvatarSave = (e) => {
		e.preventDefault();

		if (file) {
			handleProfileData({ file });
			setSaved(true);
		}
	};

	//load image from storage only upon component mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const fileInStorage = window.localStorage.getItem('url');
			console.log(fileInStorage);
			if (fileInStorage) {
				setSavedImg(fileInStorage);
				setSaved(true);
			}
		}
	}, []);

	//check to see if there has been a saved image in storage inorder to toggle button meanings
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const fileInStorage = window.localStorage.getItem('url');
			if (fileInStorage) setSaved(true);
		}
	}, [window.localStorage]);

	return (
		<div className={style.slide} key={key}>
			<p>There are a bunch of things you can add to your profile. None of which are required!</p>

			<div className={style.img_container}>
				<IKContext
					publicKey="public_c0Z4K/SNaaQr0tG+vETQrlRzdPc="
					urlEndpoint="https://ik.imagekit.io/8fpvywuht94"
					transformationPosition="path"
					authenticationEndpoint="http://localhost:5000/api/profiles/authenticateupload"
				>
					{path && !savedImg ? (
						<IKImage
							path={path.toString()}
							transformation={[
								{
									height: '200',
									width: '200',
								},
							]}
						/>
					) : savedImg && !path ? (
						<IKImage src={savedImg} style={{ maxWidth: '250px' }} />
					) : (
						<Image />
					)}
					<IKUpload fileName={file} onError={onError} onSuccess={onSuccess} />
				</IKContext>
			</div>

			<div className={style.buttons}>
				{!processing ? (
					<>
						<button className={style.save_btn} onPointerDown={(e) => handleAvatarSave(e)}>
							Save
						</button>
						<div className={style.buttons__right}>
							<button
								className={style.next_btn}
								onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}
							>
								{imgHasSaved ? 'Continue' : 'Skip'}
							</button>
						</div>
					</>
				) : (
					<>
						<LoadingSpinner /> <p>Saving...</p>{' '}
					</>
				)}
			</div>
		</div>
	);
};

AvatarImport.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { uploadAvatarToStorage })(AvatarImport);
