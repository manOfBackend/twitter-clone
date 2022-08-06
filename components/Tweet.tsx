import React, { useEffect, useState } from 'react';
import { Comment, Tweet } from '../typings';
import TimeAgo from 'timeago-react';
import {
	ChatAlt2Icon,
	HeartIcon,
	SwitchHorizontalIcon,
	UploadIcon,
} from '@heroicons/react/outline';
import { fetchComments } from '../utils/fetchComments';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

interface Props {
	tweet: Tweet;
}
const Tweet = ({
	tweet: { _id, profileImg, username, _createdAt, text, image },
}: Props) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(_id);
		setComments(comments);
	};

	useEffect(() => {
		refreshComments();
	}, []);

	return (
		<div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
			<div className="flex space-x-3">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={profileImg}
					alt=""
				/>
				<div>
					<div className="flex items-center space-x-1">
						<p className="mr-1 font-bold">{username}</p>
						<p className="hidden text-sm text-gray-500 sm:inline">
							@{username.replace(/\s+/g, '').toLowerCase()}
						</p>

						<TimeAgo
							className="text-sm text-gray-500"
							datetime={_createdAt}
							locale="ko"
						/>
					</div>
					<p className="pt-1">{text}</p>

					{image && (
						<img
							src={image}
							alt=""
							className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
						/>
					)}
				</div>
			</div>
			<div className="mt-5 flex justify-between">
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ChatAlt2Icon className="h-5 w-5" />
					<p>{comments.length}</p>
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<SwitchHorizontalIcon className="h-5 w-5" />
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<HeartIcon className="h-5 w-5" />
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<UploadIcon className="h-5 w-5" />
				</div>
			</div>
			{comments?.length > 0 && (
				<div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 pt-5">
					{comments.map(
						({ _id, _createdAt, profileImg, username, comment }) => (
							<div key={_id} className="relative flex space-x-2">
								<hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
								<img
									src={profileImg}
									className="h-7 w-7 rounded-full object-cover"
									alt=""
								/>
								<div>
									<div className="flex items-center space-x-1">
										<p className="mr-1 font-bold">{username}</p>
										<p className="hidden text-sm text-gray-500 lg:inline">
											{username.replace(/\s+/g, '').toLowerCase()}
										</p>

										<TimeAgo
											className="text-sm text-gray-500"
											datetime={_createdAt}
											locale="ko"
										/>
									</div>
									<p>{comment}</p>
								</div>
							</div>
						),
					)}
				</div>
			)}
		</div>
	);
};

export default Tweet;
