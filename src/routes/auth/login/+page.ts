export const load = ({ url }: any) => {
    const passwordChangeSuccess = url.searchParams.get("passwordChangeSuccess");
    let data: any = {}
    if (passwordChangeSuccess === "false" || passwordChangeSuccess === "true") {
        data["passwordChangeSuccess"] = passwordChangeSuccess === "true";
    }
    return data

}
