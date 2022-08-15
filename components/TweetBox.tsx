import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import {
	CalendarIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
	PhotographIcon,
	SearchCircleIcon,
	XIcon,
} from '@heroicons/react/outline';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import { db, storage } from '../firebase';

function TweetBox() {
	const [input, setInput] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const filePickerRef = useRef<HTMLInputElement>(null);
	const addImageToPost: ChangeEventHandler<HTMLInputElement> = (e) => {
		const reader = new FileReader();
		if (e && e.target && e.target.files && e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			if (readerEvent.target && readerEvent.target.result) {
				setSelectedFile(readerEvent.target.result as string);
			}
		};
	};

	const sendPost = async () => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, 'posts'), {
			text: input,
			timestamp: serverTimestamp(),
		});

		const imageRef = ref(storage, `posts/${docRef.id}/image`);

		if (selectedFile) {
			await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
				const downloadURL = await getDownloadURL(imageRef);
				await updateDoc(doc(db, 'posts', docRef.id), {
					image: downloadURL,
				});
			});
		}

		setLoading(false);
		setInput('');
		setSelectedFile(null);
	};

	return (
		<div className="flex space-x-2 p-5">
			<img
				className="h-14 w-14 rounded-full object-cover"
				src="https://links.papareact.com/gll"
			/>
			<div className="flex flex-1 items-center pl-2">
				<form className="flex flex-1 flex-col">
					<textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="무슨 일이 일어나고 있나요?"
						rows={2}
						className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] outline-none placeholder:text-gray-500"
					/>
					{selectedFile && (
						<div className="relative">
							<div
								className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
								onClick={() => setSelectedFile(null)}
							>
								<XIcon className="h-5 text-white" />
							</div>
							<img
								src={selectedFile}
								alt=""
								className="max-h-80 rounded-2xl object-contain"
							/>
						</div>
					)}
					<div className="flex items-center">
						<div className="flex flex-1 space-x-2 text-twitter">
							<div onClick={() => filePickerRef?.current?.click()}>
								<PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
								<input
									type="file"
									ref={filePickerRef}
									hidden
									onChange={addImageToPost}
								/>
							</div>
							<SearchCircleIcon className="h-5 w-5" />
							<EmojiHappyIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<LocationMarkerIcon className="h-5 w-5" />
						</div>
						<button
							disabled={!input}
							onClick={sendPost}
							className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
						>
							트윗하기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TweetBox;
