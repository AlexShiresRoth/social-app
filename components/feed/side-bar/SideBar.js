import React from 'react';
import PropTypes from 'prop-types';
import style from './SideBar.module.scss';
import Link from 'next/link';
import { FaNewspaper, FaStream } from 'react-icons/fa';
import { MdEventSeat, MdGroupAdd } from 'react-icons/md';

//Todo handle these dynamically
const SideBar = (props) => {
	return (
		<div className={style.side_bar}>
			<div className={style.inner}>
				<div className={style.tab}>
					<Link href={`/FeedPage`}>
						<a>
							<FaNewspaper /> News Feed
						</a>
					</Link>
				</div>
				<div className={style.tab}>
					<Link href={`/FeedPage`}>
						<a>
							<FaStream /> Stream
						</a>
					</Link>
				</div>
				<div className={style.tab}>
					<Link href={`/FeedPage`}>
						<a>
							<MdGroupAdd /> Groups
						</a>
					</Link>
				</div>
				<div className={style.tab}>
					<Link href={`/FeedPage`}>
						<a>
							<MdEventSeat /> Events
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

SideBar.propTypes = {};

export default SideBar;
