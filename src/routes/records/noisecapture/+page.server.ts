export const load = async ({ locals }: any) => {
    const records: any = await locals.pb.collection('noisecapture_records').getFullList({
        sort: '-start',
    });
    return {
        noisecapture_records: structuredClone(records) || []
    }

}
