import { redirect } from "@sveltejs/kit";


export const GET = async ({ locals, params, url }: any) => {
    const TOKEN = url.searchParams.get("TOKEN");
    let verified = false;
    if (TOKEN) {
        try {
            verified = await locals.pb.collection("users").confirmVerification(TOKEN);
            console.log(verified);
        } catch (error) {
            console.log("something went wrong...");
        }
    }
    throw redirect(303, "/auth/login/?verified=" + verified);
}
