import { error, redirect } from "@sveltejs/kit";


export const actions = {
    default: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData());
        let success = false;

        try {
            success = await locals.pb.collection('users').confirmPasswordReset(body.TOKEN,
                body.password, body.passwordConfirm);
        } catch (err) {
            console.error(err);
        }
        throw redirect(303, "/auth/login?passwordChangeSuccess=" + success);
    }
}
