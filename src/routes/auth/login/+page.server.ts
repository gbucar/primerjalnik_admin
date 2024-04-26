import { error, redirect } from "@sveltejs/kit";

export const actions = {
    signIn: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData());
        try {
            await locals.pb.collection("users").authWithPassword(body.username, body.password);
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authstore?.clear();
                return {
                    notVerified: true
                }
            }
        } catch (err) {
            console.log(err);
            return { error: "Napaka pri prijavi! Preverite uporabniško ime in geslo. Če ste pozabili geslo ali pa se težava ponavlja mi prosim sporočite na nbmyghig@duck.com" }
        }
        throw redirect(303, "/records");
    },
}
