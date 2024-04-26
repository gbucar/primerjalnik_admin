import { error, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData());
        try {
            await locals.pb.collection('users').create(body);
            await locals.pb.collection('users').requestVerification(body.email);
        } catch (err) {
            return { error: "Napaka pri prijavi" }
        }
        throw redirect(303, "/auth/login");
    }
}
