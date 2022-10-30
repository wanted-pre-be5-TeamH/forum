export interface IService<Parameters extends unknown[], Response> {
  execute: (...parameters: Parameters) => Response;
}
