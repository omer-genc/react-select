import request from "@/app/core/request";
import type { Paginated, Request } from "@/app/core/types";
import { Character, ListParams } from "./character.types";

type List = Request<ListParams, null, Paginated<Character>>;

export const list: List = async (config) => request({
  method: 'GET',
  url: '/character',
  ...config,
})

const characterService = {
  list,
}

export default characterService;
