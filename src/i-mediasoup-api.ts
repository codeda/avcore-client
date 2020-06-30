import {TransportOptions} from 'mediasoup-client/lib/Transport';
import {ACTION, EVENT} from './constants';
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
    ListData,
    StreamData,
    FilePathInput,
    PullStreamInputsRequest,
    PushStreamInputsRequest,
    PullStreamInputsResponse,
    PushStreamInputsResponse,
    RecordingRequest,
    StreamKindsData,
    KindsByFileInput,
    KindsData,
    PushStreamOptionsResponse,
    PushStreamOptionsRequest,
    PushStreamRequest,
    LiveStreamRequest, StreamKindData, StreamListenData
} from './client-interfaces';
import {Observable} from 'rxjs/index';
export interface IMediasoupApiClient {
    listen<T>(event: EVENT): Observable<T>;
}
export interface IMediasoupApi extends Record<ACTION, (json:{})=>Promise<{}|void>>{
    readonly client:IMediasoupApiClient;
    [ACTION.RESUME_CONSUMER](json:ConsumerData):Promise<void>
    [ACTION.PAUSE_CONSUMER](json:ConsumerData):Promise<void>
    [ACTION.SET_PREFERRED_LAYERS](json:ConsumerPreferredLayers):Promise<void>
    [ACTION.RESUME_PRODUCER](json:ProducerData):Promise<void>
    [ACTION.PAUSE_PRODUCER](json:ProducerData):Promise<void>
    [ACTION.CLOSE_PRODUCER](json:ProducerData):Promise<void>
    [ACTION.PRODUCE](json:ProduceRequest):Promise<ProduceResponse>
    [ACTION.CONSUME](json:ConsumeRequest):Promise<ConsumeResponse>
    [ACTION.CREATE_PIPE_TRANSPORT]():Promise<PipeTransportData>
    [ACTION.CONNECT_PIPE_TRANSPORT](json:PipeTransportConnectData):Promise<void>
    [ACTION.CLOSE_TRANSPORT](json:TransportData):Promise<void>
    [ACTION.GET_SERVER_CONFIGS]():Promise<ServerConfigs>
    [ACTION.CREATE_TRANSPORT]():Promise<TransportOptions>
    [ACTION.CONNECT_TRANSPORT](json:ConnectTransportRequest):Promise<void>
    [ACTION.FILE_STREAMING](json:StreamFileRequest):Promise<void>
    [ACTION.LIVE_STREAMING](json:LiveStreamRequest):Promise<void>
    [ACTION.STOP_FILE_STREAMING](json:StreamKindsData):Promise<void>
    [ACTION.START_RECORDING](json:RecordingRequest):Promise<void>
    [ACTION.STOP_RECORDING](json:RecordingData):Promise<void>
    [ACTION.SET_MAX_INCOMING_BITRATE](json:TransportBitrateData):Promise<void>
    [ACTION.TRANSPORT_STATS](json:StatsInput):Promise<StatsOutput>
    [ACTION.CONSUMERS_STATS](json:StatsInput):Promise<StatsOutput>
    [ACTION.PRODUCERS_STATS](json:StatsInput):Promise<StatsOutput>
    [ACTION.PIPE_TO_REMOTE_PRODUCER](json:PipeToRemoteProducerRequest):Promise<void>
    [ACTION.PIPE_FROM_REMOTE_PRODUCER](json:PipeFromRemoteProducerRequest):Promise<void>
    [ACTION.WORKER_LOAD]():Promise<WorkerLoadData>
    [ACTION.NUM_WORKERS]():Promise<NumWorkersData>
    [ACTION.RECORDED_STREAMS]():Promise<ListData>
    [ACTION.STREAM_RECORDINGS](json:StreamData):Promise<ListData>
    [ACTION.DELETE_STREAM_RECORDINGS](json:StreamData):Promise<void>
    [ACTION.DELETE_RECORDING](json:FilePathInput):Promise<void>
    [ACTION.PUSH_TO_SERVER_INPUTS](json:PushStreamInputsRequest):Promise<PushStreamInputsResponse>
    [ACTION.PUSH_TO_SERVER_OPTIONS](json:PushStreamOptionsRequest):Promise<PushStreamOptionsResponse>
    [ACTION.PUSH_TO_SERVER](json:PushStreamRequest):Promise<void>
    [ACTION.PULL_FROM_SERVER_INPUTS](json:PullStreamInputsRequest):Promise<PullStreamInputsResponse>
    [ACTION.KINDS_BY_FILE](json:KindsByFileInput):Promise<KindsData>
    [ACTION.REQUEST_KEYFRAME](json:ConsumerData):Promise<void>
    [ACTION.LISTEN_STREAM_STARTED](json:StreamListenData):Promise<boolean>
    [ACTION.LISTEN_STREAM_STOPPED](json:StreamKindData):Promise<boolean>
}