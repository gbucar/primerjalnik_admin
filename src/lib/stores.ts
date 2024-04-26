import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import { supabase } from "./db";

export const userStore = (user: User | undefined) => {
    let unsubscribe: () => void;

    const { subscribe } = writable<User | undefined>(user, (set) => {
        let a = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
            set(session?.user)
        });
        unsubscribe = a.data.subscription.unsubscribe;

        return () => unsubscribe();
    })

    return {
        subscribe
    }
}


export const thing = 0;
