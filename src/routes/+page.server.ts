import { validateNoisecaptureId } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, url }: any) => {
    return { userProfile: locals.user };
}

export const actions = {
    updateProfile: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData());
        try {
            const noisecapture_id = body.noisecapture_id;
            const noisecapture_id_valid = await validateNoisecaptureId(noisecapture_id)
            if (!noisecapture_id_valid) {
                const userProfile = structuredClone(await locals.pb.collection("users").getOne(locals.user.id));
                return {
                    error: "Noise Capture id je neveljaven!",
                    ...userProfile
                }

            }
            body.no_alternative = !!body.no_alternative || false
            await locals.pb.collection("users").update(locals.user.id, body);
            return { ...body };
        } catch (err) {
            console.log(err);
            const userProfile = structuredClone(await locals.pb.collection("users").getOne(locals.user.id));
            return { error: "Napaka pri pisanju", ...userProfile };
        }
    }
}
