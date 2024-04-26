export const load = async ({ locals }: any) => {
    const records: any = await locals.pb.collection('records').getFullList({
        sort: '-start',
    });
    return {
        records: structuredClone(records) || []
    }

}
