
export const actions = {
    updateRecord: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        if (!body.private) { body.private = false }
        const record = await locals.pb.collection("records").update(body.id, body);
        return structuredClone(record);
    },
    updateUser: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        if (body.atmotube_id && body.num_records > 0) {
            return { error: "cannot change atmotube_id because records already exist" }
        }
        const record = await locals.pb.collection("users").update(body.id, body);
        return structuredClone(record);
    },
}

export const load = async ({ locals }) => {
    return {
        atmotubes: structuredClone(await locals.pb.collection("atmotubes").getFullList())
    }
}
