import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
	const [token, setToken] = useState<string | null>('');
	const login = useCallback((token: string) => {
		setToken(token);
		localStorage.setItem("userData", JSON.stringify({
			token: token
		}))
	}, [])

	const logout = useCallback(() => {
		setToken("");
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const value = localStorage.getItem("userData")
		if (typeof value === 'string') {
			const storedData = JSON.parse(value);
			if (storedData && storedData.token) {
				login(storedData.token);
			}
		}
	}, [login])

	return { token, login, logout }
}