import { json } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit';
import { FITBIT_CLIENT_ID, FITBIT_CLIENT_SECRET, FITBIT_REQURED_SCOPE} from '$env/static/private';
import { randomBytes, createHash } from "crypto";

export async function GET({url, locals}) {

    if (url.searchParams.get("error")) throw redirect(307, "/");

    const codeVerifier = randomBytes(127/2).toString('hex');
    const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${FITBIT_CLIENT_ID}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=${encodeURIComponent(FITBIT_REQURED_SCOPE)}`;

    const res = await locals.pb.collection("users").update(locals.user.id, {fitbit_code_verifier: codeVerifier})

    if (res.fitbit_code_verifier !== codeVerifier) {
        redirect(307, "/");
    }

    throw redirect(307, authUrl)
}
