import { RefreshIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { Tweet } from '../typings';
import TweetBox from './TweetBox';
import TweetComponent from './Tweet';
import toast from 'react-hot-toast';
import { fetchTweets } from '../utils/fetchTweets';
interface Props {
	tweets: Tweet[];
}

function Feed({ tweets: tweetsProps }: Props) {
	const [tweets, setTweets] = useState<Tweet[]>(tweetsProps);

	const handleRefresh = async () => {
		const refreshToast = toast.loading('새로고침 중...');
		setTweets(await fetchTweets());
		toast.success('업데이트 완료!', {
			id: refreshToast,
		});
		console.log('aaaa');
	};
	return (
		<div className="col-span-7 lg:col-span-5">
			<div className="flex items-center justify-between">
				<h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
				<RefreshIcon
					onClick={handleRefresh}
					className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter
				 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
				/>
			</div>
			<div>
				<TweetBox />
			</div>
			<div>
				{tweets.map((tweet) => (
					<TweetComponent key={tweet._id} tweet={tweet} />
				))}
			</div>
		</div>
	);
}

export default Feed;
