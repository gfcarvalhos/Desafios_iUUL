/**
 * Interface para método de chamada da API
 */
interface httpClienteInterface {
  get <T> (url: string, params: string[]): Promise<unknown>;
};

export {httpClienteInterface};