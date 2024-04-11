
interface retornoAPI extends httpClienteInterface{
  result : string;
  documentation ?: string;
  terms_of_use ?: string,
  time_last_update_unix ?: number,
  
}


/**
 * Interface para método de chamada da API
 */
interface httpClienteInterface{
  get <T> (url: string, params: string[]): Promise<Array<T>>;
};

export {httpClienteInterface};