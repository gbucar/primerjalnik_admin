import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals }: any) => {
    locals.pb?.authStore?.clear();
    locals.pb.user = undefined;
    throw redirect(303, "/auth/login");
}
