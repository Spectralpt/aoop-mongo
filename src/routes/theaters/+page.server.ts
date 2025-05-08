import {getTheaters} from "$lib/server/queries";

export const load = async () => {
    const theaters = await getTheaters();
    return{
        theaters
    }
};