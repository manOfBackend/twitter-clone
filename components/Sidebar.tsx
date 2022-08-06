import React from 'react';
import {
	BellIcon,
	BookmarkIcon,
	CollectionIcon,
	DotsCircleHorizontalIcon,
	HashtagIcon,
	HomeIcon,
	MailIcon,
	UserIcon,
} from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';

function Sidebar() {
	return (
		<div className="col-span-2 flex flex-col items-center px-4 md:items-start">
			<img
				className="m-3 h-10 w-10"
				src="https://links.papareact.com/drq"
				alt=""
			/>
			<SidebarRow Icon={HomeIcon} title="홈" />
			<SidebarRow Icon={HashtagIcon} title="탐색하기" />
			<SidebarRow Icon={BellIcon} title="알림" />
			<SidebarRow Icon={MailIcon} title="쪽지" />
			<SidebarRow Icon={BookmarkIcon} title="북마크" />
			<SidebarRow Icon={CollectionIcon} title="리스트" />
			<SidebarRow Icon={UserIcon} title="로그인" />
			<SidebarRow Icon={DotsCircleHorizontalIcon} title="더 보기" />
		</div>
	);
}

export default Sidebar;
