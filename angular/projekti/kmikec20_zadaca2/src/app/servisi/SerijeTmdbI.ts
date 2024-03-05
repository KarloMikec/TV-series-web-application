export interface SerijeTmdbI {
  page: number;
  results: Array<SerijeTmdbI>;
  total_pages: number;
  total_results: number;
}

export interface SerijeTmdbI {
  adult: boolean;
  backDrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
