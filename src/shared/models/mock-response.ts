import { HttpMethod } from '../others'

export interface MockResponse {
    readonly id: number
    name: string
    method: HttpMethod
    endpoint: string
    body: string
}

export interface MockResponseAddModel {
    name: string
    method: HttpMethod
    endpoint: string
    body: string
}
