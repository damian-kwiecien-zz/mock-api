export class HttpMethodEnum {
    static readonly get = 'get'
    static readonly post = 'post'
    static readonly put = 'put'
    static readonly delete = 'delet'
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'