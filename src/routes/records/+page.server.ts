
export const actions = {
    updateRecord: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        if (!body.private) { body.private = false }
        const record = await locals.pb.collection("records").update(body.id, body);
        return structuredClone(record);
    },
}

export const load = async ({ locals }) => {
    return {
        atmotubes: structuredClone(await locals.pb.collection("atmotubes").getFullList())
    }
}
