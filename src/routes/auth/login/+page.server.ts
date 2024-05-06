import { error, redirect } from "@sveltejs/kit";

export const actions = {
    signIn: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData());
        try {
            await locals.pb.admins.authWithPassword(body.username, body.password);
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authstore?.clear();
                return {
                    notVerified: true
                }
            }
        } catch (err) {
            return { error: "" }
        }
        throw redirect(303, "/records");
    },
}
