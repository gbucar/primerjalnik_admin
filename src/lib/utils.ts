export const calculateColor = (score: number) => {
    let x = score;
    return "hsl(" + (1.433333 * x - 0.026 * Math.pow(x, 2) + 0.0003466666667 * Math.pow(x, 3)) + ", 100%, 50%)";
}

export function clickOutside(node: any) {

    const handleClick = (event: any) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('clickOutside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);
    document.addEventListener('touchstart', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('touchstart', handleClick, true);
        }
    }
}

export const validateNoisecaptureId = async (noisecaptureId: string) => {

    // TEMPORARY SOLUTION, UNTIL THEY FIX THEIR CERTIFICATE
    let noisecaptureIdRegex = /([0-9]|[a-f]){8}-([0-9]|[a-f]){4}-([0-9]|[a-f]){4}-([0-9]|[a-f]){4}-([0-9]|[a-f]){12}/;
    return noisecaptureIdRegex.test(noisecaptureId)
    // TEMPORARY SOLUTION, UNTIL THEY FIX THEIR CERTIFICATE

    const result = await fetch(`https://data.noise-planet.org/raw/${noisecaptureId.slice(0, 2)}/${noisecaptureId.slice(2, 4)}/${noisecaptureId.slice(4, 6)}/${noisecaptureId}`)
    return result.status != 404
}

export const formatDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}
export const formatTime = (date: Date) => {
    date = new Date(date);
    return date.toTimeString().substring(0, 5);
}

export const formatIntakeNg = (intake: number) => {
    // return Math.round(intake * 10e3);
    return Math.round(intake * 10e3) / 10e2;
};
