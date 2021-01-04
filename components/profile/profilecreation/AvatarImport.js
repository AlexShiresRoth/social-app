import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-feather';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { uploadAvatarToStorage } from '../../actions/profile';
import { connect } from 'react-redux';
import style from './AvatarImport.module.scss';

const AvatarImport = ({ changeIndex, key, uploadAvatarToStorage, profile: { myProfile, profileErrors, loading } }) => {
	const [file, setFile] = useState('');
	const [path, setPath] = useState('');
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
			uploadAvatarToStorage(file);
		}
	};

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
					{path ? (
						<IKImage
							path={path.toString()}
							transformation={[
								{
									height: '200',
									width: '200',
								},
							]}
						/>
					) : (
						<Image />
					)}
					<IKUpload fileName={file} onError={onError} onSuccess={onSuccess} />
				</IKContext>
			</div>

			<div className={style.buttons}>
				<button className={style.save_btn} onPointerDown={(e) => handleAvatarSave(e)}>
					Save
				</button>
				<button className={style.next_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

AvatarImport.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { uploadAvatarToStorage })(AvatarImport);
