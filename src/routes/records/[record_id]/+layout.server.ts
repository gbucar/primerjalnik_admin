export const load = async ({ locals, params }: any) => {
    const record_id = params.record_id;
    let record: any = await locals.pb.collection('records').getOne(record_id,
        {
            expand: "data_points"

        });
    return {
        record_id: record_id,
        record: structuredClone(record),
        data_points: structuredClone(record.expand.data_points)
    }
}
