import { redirect } from "@sveltejs/kit";

export const load = ({ locals, url }: any) => {
    if (!locals.user && !url.pathname.startsWith("/auth/")) {
        throw redirect(303, "/auth/login")
    } else if (locals.user && url.pathname.startsWith("/auth")) {
        throw redirect(303, "/")
    }

    return {
        path: url.pathname,
        user: locals.user
    };
}
