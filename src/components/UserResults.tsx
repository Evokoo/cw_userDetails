import { useUserStore } from "../userStore";
import { useNavigate } from "react-router-dom";

//Styling
import styles from "./UserResults.module.scss";
import { useEffect } from "react";

export default function UserResults() {
	const user = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (user.isUser === false) {
			navigate("/");
		}
	}, []);

	return (
		<div className={styles.results_container}>
			<button onClick={() => navigate("/")}>New Search</button>
			<div className={styles.results_grid}>
				<div className='user'>
					<p>Username</p>
					<h2>{user.username}</h2>
				</div>
				<div className='rank'>
					<p>Overall Rank</p>
					<h2>#{user.rank}</h2>
				</div>
				<div className='completed'>
					<p>Completed Katas</p>
					<h2>{user.kataCount}</h2>
				</div>
			</div>
			<div className={styles.rescent_kata}>
				<p>Recently completed</p>
				{user.completedKata.map((kata) => (
					<div key={kata.id}>
						<a
							href={`https://www.codewars.com/kata/${kata.id}`}
							target='_blank'
						>
							{kata.name}
						</a>
						<ul>
							{kata.completedLanguages.map((lang) => (
								<li>{lang}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
