
interface httpClienteInterface {
  get <T> (url: string, params: string[]): Promise<unknown>;
};

export {httpClienteInterface};