import { Song } from './songs';

export interface List{
    id: number,
    name: string,
    n_songs: number,
    duration: number,
    songs: Song[]
}