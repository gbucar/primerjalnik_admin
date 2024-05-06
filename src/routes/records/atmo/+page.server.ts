import { ATMOTUBE_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, url }) => {
    let atmotube: string | null = url.searchParams.get("atmotube_id") || null;
    let atmotube_id: string = "";
    if (atmotube == null)
        return { atmotubeData: [] }
    if (atmotube.match(/^[a-fA-F0-9:]{17}|[a-fA-F0-9]{12}$/) == null) {
        atmotube_id = (await locals.pb.collection("atmotubes").getFirstListItem(`id="${atmotube}"`))["atmotube_id"];
    }

    let atmotubeApiUrl = "https://api.atmotube.com/api/v1/data?";
    let date: Date = new Date(url.searchParams.get("date") || new Date());

    let start_date: Date = new Date(date);
    start_date.setDate(start_date.getDate() - 0)

    let end_date: Date = new Date(date);
    end_date.setDate(end_date.getDate() + 0)

    let data: any = (await (await fetch(atmotubeApiUrl + new URLSearchParams({
        api_key: ATMOTUBE_API_KEY,
        mac: atmotube_id,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        format: "json",
        order: "asc",
    }))).json());

    return {
        atmotubeData: data.data.items
    }

}
