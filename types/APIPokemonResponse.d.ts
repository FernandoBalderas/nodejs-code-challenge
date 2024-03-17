export interface APIPokemonResponse {
  id: number;
  height: number;
  name: string;
  stats: StatsEntity[];
  types: TypesEntity[];
  weight: number;
}
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: StatOrType;
}
export interface StatOrType {
  name: string;
  url: string;
}
export interface TypesEntity {
  slot: number;
  type: StatOrType;
}
