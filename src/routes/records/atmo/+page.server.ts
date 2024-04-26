import { ATMOTUBE_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, url }) => {
    let atmotube: string = (await locals.pb.collection('atmotubes').getOne(locals.user.atmotube_id)).atmotube_id;
    let atmotubeApiUrl = "https://api.atmotube.com/api/v1/data?";
    let date:Date = new Date(url.searchParams.get("date") || new Date());

    let start_date:Date = new Date(date);
    start_date.setDate(start_date.getDate() - 0)

    let end_date:Date = new Date(date);
    end_date.setDate(end_date.getDate() + 0)
        
    let data: any = (await (await fetch(atmotubeApiUrl + new URLSearchParams({
            api_key: ATMOTUBE_API_KEY,
            mac: atmotube,
            start_date: start_date.toISOString(),
            end_date: end_date.toISOString(),
            format: "json",
            order: "asc",
    }))).json());

    let dataWithoutLocation = data["data"]["items"].map((point:any) => {
        return {
          time: point.time,
          voc: point.voc,
          pm1: point.pm1,
          pm25: point.pm25,
          pm10: point.pm10,
          t: point.t,
          h: point.h,
          p: point.p
        };
    });
    

    return {
        atmotubeData: dataWithoutLocation
    }

}
