import { validateNoisecaptureId } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, url }: any) => {
    try {
        const atmotube_id = structuredClone(await locals.pb.collection("atmotubes").getOne(locals.user.atmotube_id)).atmotube_id;
        locals.user.atmotube_id = atmotube_id;
    }
    catch (error) {
        throw redirect(303, "/noEntry");
    }
    return { userProfile: locals.user, passwordChangeSent: url.searchParams.get("passwordChangeSent") };
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
    },
    passwordChangeRequest: async ({ locals, url }: any) => {
        const success = await locals.pb.collection("users").requestPasswordReset(locals?.user?.email);
        throw redirect(303, url.href.split("?")[0] + "?passwordChangeSent=" + success);
    },

    uploadNoisecaptureFile: async ({ locals, request }: any) => {
        const formData = await request.formData();
        try {
            await locals.pb.collection("noisecapture_zip_files").create(formData);
        } catch (err) {
            console.log(err);
            const userProfile = structuredClone(await locals.pb.collection("users").getOne(locals.user.id));
            return { error: "Napaka pri pisanju", ...userProfile };
        }
    },
}
