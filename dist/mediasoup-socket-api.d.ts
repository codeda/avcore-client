import { Socket } from 'socket.io-client';
import { ConnectTransportRequest, ConsumerData, ConsumeRequest, ConsumeResponse, ConsumerPreferredLayers, NumWorkersData, PipeFromRemoteProducerRequest, PipeToRemoteProducerRequest, PipeTransportConnectData, PipeTransportData, ProducerData, ProduceRequest, ProduceResponse, ServerConfigs, RecordingData, StatsInput, StatsOutput, StreamFileRequest, TransportBitrateData, TransportData, WorkerLoadData, StreamListData, StreamData, FilePathInput, PushStreamInputsRequest, PushStreamInputsResponse, PullStreamInputsRequest, PullStreamInputsResponse, RecordingRequest, StreamKindsData, LiveStreamRequest, KindsByFileInput, KindsOptionsData, PushStreamOptionsRequest, PushStreamOptionsResponse, PushStreamRequest, StreamKindData, StreamListenData, MixerUpdateData, MixerRemoveData, MixerInput, MixerAddAudioData, MixerAddVideoData, MixerPipeLiveData, MixerPipeInput, MixerPipeRtmpData, MixerPipeRecordingData, MixerPipeStopInput, MixerStartOptions, Omit, MixerPipeHlsData, LiveToHlsRequest, MixerAddVideoFileData, MixerAddAudioFileData, MixerCommandInput, ListRecordingsData, ConsumeRequestOriginDataServer, ConsumeRequestOriginData, MixerStreamData, MixerAddVideoTcpData, MixerAddAudioTcpData, TcpPortData, MixerPipePortData, TcpStreamingRequest, StreamingPortsData, ClearPipeTransportsInput } from './client-interfaces';
import { TransportOptions } from 'mediasoup-client/lib/Transport';
import { IMediasoupApi, IMediasoupApiClient } from './i-mediasoup-api';
import { CloudApi } from './cloud-api';
export interface ApiSocket extends Omit<Socket, "on">, IMediasoupApiClient {
}
export declare class MediasoupSocketApi implements IMediasoupApi {
    private readonly log;
    private _client;
    private readonly url;
    private readonly worker;
    private readonly token;
    private readonly cloudApi;
    private closed;
    constructor(url: string, worker: number, token: string, log?: typeof console.log, cloudApi?: CloudApi);
    get client(): ApiSocket;
    private connectSocket;
    resumeConsumer(json: ConsumerData): Promise<void>;
    pauseConsumer(json: ConsumerData): Promise<void>;
    setPreferredLayers(json: ConsumerPreferredLayers): Promise<void>;
    closeConsumer(json: ConsumerData): Promise<void>;
    resumeProducer(json: ProducerData): Promise<void>;
    pauseProducer(json: ProducerData): Promise<void>;
    closeProducer(json: ProducerData): Promise<void>;
    produce(json: ProduceRequest): Promise<ProduceResponse>;
    consume(json: ConsumeRequest): Promise<ConsumeResponse>;
    createPipeTransport(): Promise<PipeTransportData>;
    connectPipeTransport(json: PipeTransportConnectData): Promise<void>;
    closeTransport(json: TransportData): Promise<void>;
    getServerConfigs(): Promise<ServerConfigs>;
    createTransport(): Promise<TransportOptions>;
    connectTransport(json: ConnectTransportRequest): Promise<void>;
    setMaxIncomingBitrate(json: TransportBitrateData): Promise<void>;
    producersStats(json: StatsInput): Promise<StatsOutput>;
    producersStatsByStream(json: StreamKindsData): Promise<StatsOutput>;
    consumersStats(json: StatsInput): Promise<StatsOutput>;
    transportStats(json: StatsInput): Promise<StatsOutput>;
    workerLoad(): Promise<WorkerLoadData>;
    numWorkers(): Promise<NumWorkersData>;
    pipeToRemoteProducer(json: PipeToRemoteProducerRequest): Promise<void>;
    pipeFromRemoteProducer(json: PipeFromRemoteProducerRequest): Promise<void>;
    startRecording(json: RecordingRequest): Promise<void>;
    stopRecording(json: RecordingData): Promise<void>;
    fileStreaming(json: StreamFileRequest): Promise<void>;
    stopFileStreaming(json: StreamKindsData): Promise<void>;
    recordedStreams(): Promise<StreamListData>;
    streamRecordings(json: StreamData): Promise<ListRecordingsData>;
    deleteStreamRecordings(json: StreamData): Promise<void>;
    deleteRecording(json: FilePathInput): Promise<void>;
    pushToServerInputs(json: PushStreamInputsRequest): Promise<PushStreamInputsResponse>;
    pushToServerOptions(json: PushStreamOptionsRequest): Promise<PushStreamOptionsResponse>;
    pushToServer(json: PushStreamRequest): Promise<void>;
    pullFromServerInputs(json: PullStreamInputsRequest): Promise<PullStreamInputsResponse>;
    kindsByFile(json: KindsByFileInput): Promise<KindsOptionsData>;
    requestKeyframe(json: ConsumerData): Promise<void>;
    listenStreamStarted(json: StreamListenData): Promise<boolean>;
    listenStreamStopped(json: StreamKindData): Promise<boolean>;
    liveStreaming(json: LiveStreamRequest): Promise<void>;
    liveToHls(json: LiveToHlsRequest): Promise<MixerPipeInput>;
    tcpStreaming(json: TcpStreamingRequest): Promise<StreamingPortsData>;
    allocatePort(): Promise<TcpPortData>;
    releasePort(json: TcpPortData): Promise<void>;
    mixerStart(json: MixerStartOptions): Promise<MixerInput>;
    mixerClose(json: MixerInput): Promise<void>;
    mixerAdd(json: MixerAddAudioData | MixerAddVideoData): Promise<void>;
    mixerAddTcp(json: MixerAddVideoTcpData | MixerAddAudioTcpData): Promise<void>;
    mixerAddFile(json: MixerAddVideoFileData | MixerAddAudioFileData): Promise<void>;
    mixerUpdate(json: MixerUpdateData): Promise<void>;
    mixerRemove(json: MixerRemoveData): Promise<void>;
    mixerPipeStart(json: MixerPipeLiveData | MixerPipeRecordingData | MixerPipeRtmpData | MixerPipeHlsData | MixerPipePortData): Promise<MixerPipeInput>;
    mixerPipeStop(json: MixerPipeStopInput): Promise<void>;
    mixerCommand(json: MixerCommandInput): Promise<void>;
    listenMixerStopped(json: MixerInput): Promise<boolean>;
    listenMixerFileStarted(json: MixerStreamData): Promise<boolean>;
    listenMixerFileStopped(json: MixerStreamData): Promise<boolean>;
    clearPipeTransports(json: ClearPipeTransportsInput): Promise<void>;
    heapSnapshot(): Promise<void>;
    hlsUrl(pipeId: string): string;
    location(): string;
    streamOrigin(source: ConsumeRequestOriginDataServer): ConsumeRequestOriginData | undefined;
    clear(): void;
    private request;
    private socketRequest;
    private restRequest;
}
