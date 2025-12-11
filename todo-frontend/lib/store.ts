import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;

    // Actions
    login: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            _hasHydrated: false,

            login: (user, accessToken, refreshToken) =>
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),

            setTokens: (accessToken, refreshToken) =>
                set({
                    accessToken,
                    refreshToken,
                }),

            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state,
                });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);

// Hook to wait for hydration
export const useAuthHydrated = () => useAuthStore((state) => state._hasHydrated);
