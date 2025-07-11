
import { NEWS } from '../lib/constants/api-urls';
import Api from "../lib/api-call";

export class NewsService {

    static instance;
    constructor() { }

    static getInstance() {
      if (!NewsService.instance) {
        NewsService.instance = new NewsService();
      }
      return NewsService.instance;
    }
    getNews = async (params)=> {
      let newsResponse = await Api.get(NEWS.GET_NEWS,params);
      return newsResponse;
    }
  }