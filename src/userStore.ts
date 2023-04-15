import { create } from "zustand";

interface KataData {
	id: string;
	slug: string;
	name: string;
	completedAt: string;
	completedLanguages: string[];
}

interface UserData {
	isUser: boolean;
	username: string;
	rank: number;
	kataCount: number;
	completedKata: KataData[];
	setUser: (userData: Record<string, any>, kataData: KataData[]) => void;
	resetUser: () => void;
}

export const useUserStore = create<UserData>((set) => ({
	isUser: false,
	username: "",
	rank: 0,
	kataCount: 0,
	completedKata: [],
	setUser: (userData: Record<string, any>, kataData: KataData[]) => {
		console.log(kataData);

		set({
			isUser: true,
			username: userData.username,
			rank: userData.leaderboardPosition,
			kataCount: userData.codeChallenges.totalCompleted,
			completedKata: kataData.slice(0, 10),
		});
	},
	resetUser: () => {
		set({
			isUser: false,
			username: "",
			rank: 0,
			kataCount: 0,
			completedKata: [],
		});
	},
}));
