export const load = async ({ locals }: any) => {
    const records: any = await locals.pb.collection('noisecapture_records').getFullList({
        sort: '-start',
    });

    const users: any[] = structuredClone(await locals.pb.collection('users').getFullList(1, 50, {
        filter: 'noisecapture_id != null',
    })).map((user: any) => {
        user.noise = records.filter((record: any) => record.noisecapture_id === user.noisecapture_id)
        return user
    });

    return {
        users: structuredClone(users) || [],
        records: structuredClone(users) || []
    }

}
