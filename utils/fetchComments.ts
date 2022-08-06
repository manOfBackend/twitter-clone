import { Comment } from '../typings';

const host =
	process.env.NODE_ENV === 'production'
		? `${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_BASE_URL;
export const fetchComments = async (tweetId: string) => {
	const res = await fetch(`${host}/api/getComments?tweetId=${tweetId}`);

	const comments: Comment[] = await res.json();

	return comments;
};
