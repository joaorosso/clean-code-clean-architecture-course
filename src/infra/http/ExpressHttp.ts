import express from "express";
import Http from "./Http";

export default class ExpressHttp implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](this.convertUrl(url), async (req: any, res: any) => {
      const data = await fn(req.params, req.body);
      res.json(data);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port);
  }

  convertUrl(url: string) {
    return url.replace(/\$\{/g, ':').replace(/\}/g, '');
  }
}