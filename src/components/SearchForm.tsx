import { useEffect, useState } from "react";
import { useUserStore } from "../userStore";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.scss";

export default function SearchForm() {
	const userStore = useUserStore();
	const navigate = useNavigate();

	const [userName, setUserName] = useState("");
	const [errorVisibility, setErrorVisibility] = useState(false);

	const handleSubmit = async (e: any): Promise<void> => {
		e.preventDefault();

		const userData = await fetch(
			`https://www.codewars.com/api/v1/users/${userName}`
		);
		const kataData = await fetch(
			`https://www.codewars.com/api/v1/users/${userName}/code-challenges/completed?page=0`
		);

		if (userData.status === 200) {
			const uData = await userData.json();
			const kData = await kataData.json();

			userStore.setUser(uData, kData.data);

			navigate("/result");
		} else {
			setErrorVisibility(true);
		}
	};

	useEffect(() => {
		userStore.resetUser();
	}, []);

	return (
		<div className={styles.search_container}>
			<img
				src='https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/1410/open-uri20130901-5708-1gh38y4'
				alt='cw_logo'
			/>
			<h3>Search for a user</h3>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='username'
					autoComplete='off'
					placeholder='username'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					onFocus={() => setErrorVisibility(false)}
					required
				/>
				<input type='submit' value='Search' />
			</form>
			<div
				className={`${styles.error_message} ${
					errorVisibility ? styles.show : styles.hide
				}`}
			>
				<p>User not found</p>
			</div>
		</div>
	);
}
