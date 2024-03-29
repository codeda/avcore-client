import { API_OPERATION } from './constants';
import { MediasoupSocketApi } from './mediasoup-socket-api';
import { ConsumeRequestOriginData } from './client-interfaces';
export declare class CloudApi {
    private readonly url;
    private readonly token;
    private readonly log;
    constructor(url: string, token: string, log?: typeof console.log);
    create(operation: API_OPERATION, mixerId?: string, stream?: string): Promise<MediasoupSocketApi>;
    streamOrigin(api: MediasoupSocketApi, stream: string): Promise<ConsumeRequestOriginData | undefined>;
}
