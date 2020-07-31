import React from 'react';
import PropTypes from 'prop-types';
import style from './Alert.module.scss';
import { connect } from 'react-redux';

const Alert = ({ alert }) => {
	console.log(alert);
	return alert.length > 0
		? alert.map((alertEl, i) => {
				return (
					<div
						className={`${style.alert_container} ${
							alertEl.type === 'danger' ? style.warning : style.success
						}`}
						key={i}
					>
						<div className={style.inner}>
							<p>{alertEl.msg}</p>
						</div>
					</div>
				);
		  })
		: null;
};

Alert.propTypes = {
	alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
	alert: state.alert,
});

export default connect(mapStateToProps, null)(Alert);
