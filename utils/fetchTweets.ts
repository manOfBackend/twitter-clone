import { Tweet } from '../typings';

const host = process.env.NEXT_PUBLIC_BASE_URL;
export const fetchTweets = async () => {
	const res = await fetch(`${host}/api/getTweets`);

	const data = await res.json();
	const tweets: Tweet[] = data.tweets;

	return tweets;
};
