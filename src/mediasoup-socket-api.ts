import io from 'socket.io-client';
import {default as axios} from 'axios';
import {ACTION, ERROR, HLS, PATH, SOCKET_ONLY_ACTIONS} from './constants';
import {
    ConnectTransportRequest,
    ConsumerData,
    ConsumeRequest,
    ConsumeResponse,
    ConsumerPreferredLayers,
    NumWorkersData,
    PipeFromRemoteProducerRequest,
    PipeToRemoteProducerRequest,
    PipeTransportConnectData,
    PipeTransportData,
    ProducerData,
    ProduceRequest,
    ProduceResponse,
    ServerConfigs,
    RecordingData,
    StatsInput,
    StatsOutput,
    StreamFileRequest,
    TransportBitrateData,
    TransportData,
    WorkerLoadData,
    StreamListData,
    StreamData,
    FilePathInput,
    PushStreamInputsRequest,
    PushStreamInputsResponse,
    PullStreamInputsRequest,
    PullStreamInputsResponse,
    RecordingRequest,
    StreamKindsData,
    LiveStreamRequest,
    KindsByFileInput,
    KindsOptionsData,
    PushStreamOptionsRequest,
    PushStreamOptionsResponse,
    PushStreamRequest,
    StreamKindData,
    StreamListenData,
    MixerUpdateData,
    MixerRemoveData,
    MixerInput,
    MixerAddAudioData,
    MixerAddVideoData,
    MixerPipeLiveData,
    MixerPipeInput,
    MixerPipeRtmpData,
    MixerPipeRecordingData,
    MixerPipeStopInput,
    MixerStartOptions,
    Omit,
    MixerPipeHlsData,
    LiveToHlsRequest,
    MixerAddVideoFileData,
    MixerAddAudioFileData,
    MixerCommandInput,
    ListRecordingsData,
    ConsumeRequestOriginDataServer,
    ConsumeRequestOriginData,
    MixerStreamData,
    PortData,
    MixerAddVideoTcpData, MixerAddAudioTcpData
} from './client-interfaces';
import {TransportOptions} from 'mediasoup-client/lib/Transport';
import {IMediasoupApi, IMediasoupApiClient} from './i-mediasoup-api';
import {CloudApi} from './cloud-api';
export interface ApiSocket extends Omit< SocketIOClient.Socket, "on">,IMediasoupApiClient{
}
export class MediasoupSocketApi implements IMediasoupApi{
    private readonly log:typeof console.log;
    private _client: ApiSocket;
    private readonly url: string;
    private readonly worker: number;
    private readonly token: string;
    private readonly cloudApi: CloudApi|undefined;
    private closed=false;
    constructor(url:string,worker:number,token:string,log?:typeof console.log, cloudApi?:CloudApi){
        this.log=log||console.log;
        this.url=url;
        this.worker=worker;
        this.token=token;
        this.cloudApi=cloudApi;
    }
    get client():ApiSocket{
        if(!this._client){
            this._client = io(this.url, {
                path:"",
                transports:['websocket'],
                query: `auth_token=${this.token}&mediasoup_worker=${this.worker}`,
                forceNew: true
            }) as ApiSocket;
        }
        return this._client;
    }
    private connectSocket(): Promise<void> {
        return new Promise((resolve,reject) => {
            if(this.client.connected){
                resolve();
            }
            else {
                this.client.on('error', (e)=>{
                    if(e.message==='Not enough or too many segments'){
                        e.errorId=ERROR.UNAUTHORIZED;
                    }
                    else {
                        e.errorId=ERROR.UNKNOWN;
                    }
                    reject(e);
                });
                this.client.on('connect', resolve)
            }
        });
    }
    async resumeConsumer(json:ConsumerData):Promise<void>{
        await this.request(ACTION.RESUME_CONSUMER, json);
    }
    async pauseConsumer(json:ConsumerData):Promise<void>{
        await this.request(ACTION.PAUSE_CONSUMER, json);
    }
    async setPreferredLayers(json:ConsumerPreferredLayers):Promise<void>{
        await this.request(ACTION.SET_PREFERRED_LAYERS, json);
    }
    async closeConsumer(json:ConsumerData):Promise<void>{
        await this.request(ACTION.CLOSE_CONSUMER, json);
    }
    async resumeProducer(json:ProducerData):Promise<void>{
        await this.request(ACTION.RESUME_PRODUCER, json);
    }
    async pauseProducer(json:ProducerData):Promise<void>{
        await this.request(ACTION.PAUSE_PRODUCER, json);
    }
    async closeProducer(json:ProducerData):Promise<void>{
        await this.request(ACTION.CLOSE_PRODUCER, json);
    }
    async produce(json:ProduceRequest):Promise<ProduceResponse>{
        return (await this.request(ACTION.PRODUCE, json)) as ProduceResponse;
    }
    async consume(json:ConsumeRequest):Promise<ConsumeResponse>{
        return (await this.request(ACTION.CONSUME, json)) as ConsumeResponse;
    }
    async createPipeTransport():Promise<PipeTransportData>{
        return (await this.request(ACTION.CREATE_PIPE_TRANSPORT)) as PipeTransportData;
    }
    async connectPipeTransport(json:PipeTransportConnectData):Promise<void>{
        await this.request(ACTION.CONNECT_PIPE_TRANSPORT, json);
    }
    async closeTransport(json:TransportData):Promise<void>{
        await this.request(ACTION.CLOSE_TRANSPORT, json);
    }
    async getServerConfigs():Promise<ServerConfigs>{
        return (await this.request(ACTION.GET_SERVER_CONFIGS)) as ServerConfigs;
    }
    async createTransport():Promise<TransportOptions>{
        return (await this.request(ACTION.CREATE_TRANSPORT)) as TransportOptions;
    }
    async connectTransport(json:ConnectTransportRequest):Promise<void>{
        await this.request(ACTION.CONNECT_TRANSPORT,json);
    }
    async setMaxIncomingBitrate(json:TransportBitrateData):Promise<void>{
        await this.request(ACTION.SET_MAX_INCOMING_BITRATE, json);
    }
    async producersStats(json:StatsInput):Promise<StatsOutput>{
        return (await this.request(ACTION.PRODUCERS_STATS, json)) as StatsOutput;
    }
    async consumersStats(json:StatsInput):Promise<StatsOutput>{
        return (await this.request(ACTION.CONSUMERS_STATS, json)) as StatsOutput;
    }
    async transportStats(json:StatsInput):Promise<StatsOutput>{
        return (await this.request(ACTION.TRANSPORT_STATS, json)) as StatsOutput;
    }
    async workerLoad():Promise<WorkerLoadData>{
        return (await this.request(ACTION.WORKER_LOAD)) as WorkerLoadData;
    }
    async numWorkers():Promise<NumWorkersData>{
        return (await this.request(ACTION.NUM_WORKERS)) as NumWorkersData;
    }
    async pipeToRemoteProducer(json:PipeToRemoteProducerRequest):Promise<void>{
        await this.request(ACTION.PIPE_TO_REMOTE_PRODUCER, json);
    }
    async pipeFromRemoteProducer(json:PipeFromRemoteProducerRequest):Promise<void>{
        await this.request(ACTION.PIPE_FROM_REMOTE_PRODUCER, json);
    }
    async startRecording(json:RecordingRequest):Promise<void>{
        if(!json.origin && this.cloudApi){
            json.origin=await this.cloudApi.streamOrigin(this,json.stream)
        }
        await this.request(ACTION.START_RECORDING,json);
    }
    async stopRecording(json:RecordingData):Promise<void>{
        await this.request(ACTION.STOP_RECORDING,json);
    }
    async fileStreaming(json:StreamFileRequest):Promise<void>{
        await this.request(ACTION.FILE_STREAMING,json);
    }
    async stopFileStreaming(json:StreamKindsData):Promise<void>{
        await this.request(ACTION.STOP_FILE_STREAMING,json);
    }
    async recordedStreams():Promise<StreamListData>{
        return (await this.request(ACTION.RECORDED_STREAMS) as StreamListData);
    }
    async streamRecordings(json:StreamData):Promise<ListRecordingsData>{
        return (await this.request(ACTION.STREAM_RECORDINGS,json) as ListRecordingsData);
    }
    async deleteStreamRecordings(json:StreamData):Promise<void>{
        await this.request(ACTION.DELETE_STREAM_RECORDINGS,json);
    }
    async deleteRecording(json:FilePathInput):Promise<void>{
        await this.request(ACTION.DELETE_RECORDING,json);
    }
    async pushToServerInputs(json:PushStreamInputsRequest):Promise<PushStreamInputsResponse>{
        return (await this.request(ACTION.PUSH_TO_SERVER_INPUTS,json) as PushStreamInputsResponse);
    }
    async pushToServerOptions(json:PushStreamOptionsRequest):Promise<PushStreamOptionsResponse>{
        return (await this.request(ACTION.PUSH_TO_SERVER_OPTIONS,json) as PushStreamOptionsResponse);
    }
    async pushToServer(json:PushStreamRequest):Promise<void>{
        await this.request(ACTION.PUSH_TO_SERVER,json);
    }
    async pullFromServerInputs(json:PullStreamInputsRequest):Promise<PullStreamInputsResponse>{
        return (await this.request(ACTION.PULL_FROM_SERVER_INPUTS,json) as PullStreamInputsResponse);
    }
    async kindsByFile(json:KindsByFileInput):Promise<KindsOptionsData>{
        return (await this.request(ACTION.KINDS_BY_FILE,json) as KindsOptionsData);
    }
    async requestKeyframe(json:ConsumerData):Promise<void>{
        await this.request(ACTION.REQUEST_KEYFRAME, json);
    }
    async listenStreamStarted(json:StreamListenData):Promise<boolean>{
        return (await this.request(ACTION.LISTEN_STREAM_STARTED,json) as boolean);
    }
    async listenStreamStopped(json:StreamKindData):Promise<boolean>{
        return (await this.request(ACTION.LISTEN_STREAM_STOPPED,json) as boolean);
    }
    async liveStreaming(json:LiveStreamRequest):Promise<void>{
        await this.request(ACTION.LIVE_STREAMING,json);
    }
    async liveToHls(json:LiveToHlsRequest):Promise<MixerPipeInput>{
        return (await this.request(ACTION.LIVE_TO_HLS,json) as MixerPipeInput);
    }
    async allocatePort():Promise<PortData>{
        return (await this.request(ACTION.ALLOCATE_PORT) as PortData);
    }
    async releasePort(json:PortData):Promise<void>{
        await this.request(ACTION.RELEASE_PORT);
    }
    async mixerStart(json:MixerStartOptions):Promise<MixerInput>{
        return (await this.request(ACTION.MIXER_START,json) as MixerInput);
    }
    async mixerClose(json:MixerInput):Promise<void>{
        await this.request(ACTION.MIXER_CLOSE,json);
    }
    async mixerAdd(json:MixerAddAudioData|MixerAddVideoData):Promise<void>{
        if(!json.origin && this.cloudApi){
            json.origin=await this.cloudApi.streamOrigin(this,json.stream)
        }
        await this.request(ACTION.MIXER_ADD,json);
    }
    async mixerAddTcp(json:MixerAddVideoTcpData|MixerAddAudioTcpData):Promise<void>{
        await this.request(ACTION.MIXER_ADD_TCP,json);
    }
    async mixerAddFile(json:MixerAddVideoFileData|MixerAddAudioFileData):Promise<void>{
        await this.request(ACTION.MIXER_ADD_FILE,json);
    }
    async mixerUpdate(json:MixerUpdateData):Promise<void>{
        await this.request(ACTION.MIXER_UPDATE,json);
    }
    async mixerRemove(json:MixerRemoveData):Promise<void>{
        await this.request(ACTION.MIXER_REMOVE,json);
    }
    async mixerPipeStart(json:MixerPipeLiveData|MixerPipeRecordingData|MixerPipeRtmpData|MixerPipeHlsData):Promise<MixerPipeInput>{
        return (await this.request(ACTION.MIXER_PIPE_START,json) as MixerPipeInput);
    }
    async mixerPipeStop(json:MixerPipeStopInput):Promise<void>{
        await this.request(ACTION.MIXER_PIPE_STOP,json);
    }
    async mixerCommand(json:MixerCommandInput):Promise<void>{
        await this.request(ACTION.MIXER_COMMAND,json);
    }
    async listenMixerStopped(json:MixerInput):Promise<boolean>{
        return (await this.request(ACTION.LISTEN_MIXER_STOPPED,json) as boolean);
    }
    async listenMixerFileStarted(json:MixerStreamData):Promise<boolean>{
        return (await this.request(ACTION.LISTEN_MIXER_FILE_STARTED,json) as boolean);
    }
    async listenMixerFileStopped(json:MixerStreamData):Promise<boolean>{
        return (await this.request(ACTION.LISTEN_MIXER_FILE_STOPPED,json) as boolean);
    }
    async heapSnapshot():Promise<void>{
        await this.request(ACTION.HEAP_SNAPSHOT);
    }
    hlsUrl(pipeId:string){
        return `${this.url}/${HLS.ROOT}/${pipeId}/${HLS.PLAYLIST}`
    }
    location(){
        return this.url
    }
    streamOrigin(source:ConsumeRequestOriginDataServer):ConsumeRequestOriginData|undefined{
        if(source && source.url!==this.url){
            const {url,token,worker}=this;
            return {source,target:{url,token,worker}}
        }
    }
    clear():void{
        this.closed=true;
        if(this._client){
            this._client.removeAllListeners();
            if(this.client.connected){
                this._client.disconnect();
            }
        }
    }
    private async request(action:ACTION,json={}):Promise<object|boolean|void>{
        if(!this.closed){
            if(!this._client && !SOCKET_ONLY_ACTIONS.includes(action)
                && (action!==ACTION.MIXER_START || !(json as MixerStartOptions).closeOnDisconnected)){
                return this.restRequest(action,json)
            }
            else {
                return this.socketRequest(action,json)
            }
        }

    }
    private async socketRequest(action:ACTION,json={}):Promise<object|boolean>{
        await this.connectSocket();
        this.log('sent message', action, JSON.stringify(json));
        return new Promise((resolve,reject) => {
            this.client.emit(action,json,(data:object|boolean)=>{
                if(data && typeof data!=='boolean' && data.hasOwnProperty('errorId')){
                    this.log('got error',  action, JSON.stringify(data));
                    reject(data);
                }
                else {
                    this.log('got message',  action, JSON.stringify(data));
                    resolve(data)
                }
            })
        });

    }
    private async restRequest(action:ACTION,json={}):Promise<object|boolean>{
        try {
            const {data} =  await axios.post(`${this.url}/${PATH.API}/${this.worker}/${action}`,json,{
                headers: { 'Content-Type': 'application/json', "Authorization":`Bearer ${this.token}` },
            });
            this.log('got message',  action, JSON.stringify(data));
            return data;
        }
        catch (e) {
            let errorId:ERROR=ERROR.UNKNOWN;
            this.log('got error',e);
            if(e.response && e.response.status && ERROR[e.response.status]){
                errorId=e.response.status
            }
            throw {errorId};
        }

    }
}
