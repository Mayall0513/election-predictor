import { getRaces } from '../../../data/Races';

export default async (req, res) => {
    const races = await getRaces(1);
    
    return res
        .status(200)
        .json(races);
}

export const config = {
    api: {
        bodyParser: false,
    }
}