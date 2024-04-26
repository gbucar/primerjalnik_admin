import { redirect } from "@sveltejs/kit";
import { FITBIT_CLIENT_ID, FITBIT_CLIENT_SECRET, FITBIT_REQURED_SCOPE } from '$env/static/private';
import { createHash } from "crypto";

export async function load({ locals, url }) {
    const code = url.searchParams.get("code");
    if (!code) {
        console.log("there is no code, wtf?");
        throw redirect(307, "/")
    }

    const encoded_token = Buffer.from(`${FITBIT_CLIENT_ID}:${FITBIT_CLIENT_SECRET}`).toString('base64');

    const res = await fetch(`https://api.fitbit.com/oauth2/token?client_id=${FITBIT_CLIENT_ID}&code=${code}&code_verifier=${locals.user.fitbit_code_verifier}&grant_type=authorization_code`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Basic ${encoded_token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    })

    const auth = await res.json()

    const database_update_res = await locals.pb.collection("fitbit").update(
        locals.user.fitbit_auth,
        {
            "fitbit_user_id": auth.user_id,
            "refresh_token": auth.refresh_token,
            "access_token": auth.access_token,
            "scope": auth.scope,
            "token_expires_at": (new Date()).getTime() + auth.expires_in * 1000
        }
    )


    await locals.pb.collection("users").update(
        locals.user.id,
        {
            "fitbit_fully_connected": FITBIT_REQURED_SCOPE.split(" ").sort().join("").toLowerCase() === auth.scope.split(" ").sort().join("").toLowerCase()
        }
    )

    throw redirect(307, "/");
}
