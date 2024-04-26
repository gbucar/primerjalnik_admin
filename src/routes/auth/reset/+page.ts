export const load = ({ url }) => {
    return {
        TOKEN: url.searchParams.get("TOKEN")
    }

}
