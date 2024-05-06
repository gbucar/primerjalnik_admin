export const load = async ({ locals }: any) => {
    const records: any = structuredClone(await locals.pb.collection('records').getFullList({
        sort: '-start',
    }));

    const users = structuredClone(await locals.pb.collection('users').getFullList()).map(a => {
        a.records = records.filter(record => record.owner === a.id);
        a.collapsed = true;
        return a;
    })

    return {
        users: users || [],
        records: records
    }

}
