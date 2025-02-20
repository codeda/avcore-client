import { MediaKind, RtpCapabilities, RtpEncodingParameters, RtpParameters } from 'mediasoup-client/lib/RtpParameters';
import { ProducerCodecOptions } from 'mediasoup-client/lib/Producer';
import { DtlsParameters } from 'mediasoup-client/lib/Transport';
import { CODEC, MIXER_PIPE_TYPE, MIXER_RENDER_TYPE } from './constants';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface ConsumerData {
    consumerId: string;
}
export interface ConsumerPreferredLayers extends ConsumerData {
    layers: ConsumerLayers;
}
export interface ConsumerLayers {
    spatialLayer: number;
    temporalLayer?: number;
}
export interface ProducerData {
    producerId: string;
}
export interface ProduceRequest extends StreamKindData {
    transportId: string;
    rtpParameters: RtpParameters;
    paused?: boolean;
    keyFrameRequestDelay?: number;
    appData?: any;
}
export interface ProduceResponse {
    id: string;
}
export interface ConsumeResponse {
    producerId: string;
    id: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
    type: string;
    producerPaused: boolean;
}
export interface ConsumeRequestOriginDataServer extends ConferenceInputOrigin {
    token: string;
}
export interface ConsumeRequestOriginData {
    source: ConsumeRequestOriginDataServer;
    target: ConsumeRequestOriginDataServer;
}
export interface ConsumeRequest extends StreamKindData {
    rtpCapabilities: RtpCapabilities;
    transportId: string;
}
export interface PipeToRemoteProducerRequest extends StreamKindData {
    origin: ConsumeRequestOriginData;
    sameHost: boolean;
}
export interface PipeFromRemoteProducerRequest extends ProducerData, StreamKindData {
    workerId: number;
}
export interface PipeTransportData {
    pipeTransportId: string;
    ip: string;
    port: number;
}
export interface PipeTransportConnectData extends PipeTransportData {
    transportId: string;
}
export interface WorkerLoadData {
    currentLoad: number;
}
export interface NumWorkersData {
    num: number;
}
export interface StatsInput {
    ids: string[];
}
export interface StatsOutput {
    [x: string]: {};
}
export interface TransportData {
    transportId: string;
}
export interface TransportBitrateData extends TransportData {
    bitrate: number;
}
export interface IceServer {
    urls: string[];
    username?: string;
    credential?: string;
}
export interface Simulcast {
    encodings?: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
}
export interface ServerConfigs {
    routerRtpCapabilities: RtpCapabilities;
    iceServers?: IceServer[];
    simulcast?: Simulcast;
    timeout?: {
        stats: number;
        transport: number;
        consumer: number;
    };
}
export interface ConnectTransportRequest extends TransportData {
    transportId: string;
    dtlsParameters: DtlsParameters;
}
export interface RecordingData extends StreamKindsData {
}
export interface RecordingRequest extends StreamKindsData {
    layer?: number;
    origin?: ConsumeRequestOriginData;
}
export interface KindsOptionsData extends SizeData {
    kinds: MediaKind[];
    duration: number;
}
export interface SizeData {
    width?: number;
    height?: number;
}
export interface KindsData {
    kinds?: MediaKind[];
}
export interface StreamKindsData extends StreamData, KindsData {
}
export interface StreamKindData extends StreamData {
    kind: MediaKind;
}
export interface StreamKindOrigin extends StreamKindData {
    origin?: boolean;
}
export interface StreamListenData extends StreamKindData {
    origin?: ConsumeRequestOriginData;
}
export interface StreamData {
    stream: string;
}
export interface StreamFileRequestOptions {
    restartOnExit?: boolean;
    additionalInputOptions?: string[];
}
export type CodecCopyKinds = {
    [kind in MediaKind]?: boolean;
};
export interface CodecCopyOption {
    codecCopy?: CodecCopyKinds;
}
export interface StreamFileRequest extends StreamKindsData, KindsByFileInput, StreamingOptions, PushSimulcastInput, StreamFileRequestOptions, CodecCopyOption, CodecKindsData {
}
export interface LiveStreamRequest extends StreamKindsData, StreamingOptions, PushSimulcastInput, CodecCopyOption, CodecKindsData {
    url: string;
    rwTimeout?: number;
    restartOnExit?: boolean;
    restartTimeout?: number;
}
export interface TcpStreamingRequest extends StreamKindsData, CodecKindsData {
    formats: {
        audio?: AudioFormatOptions;
        video?: VideoFormatOptions & BitrateOptions;
    };
    listenExternalIp?: boolean;
}
export interface BitrateOptions {
    videoBitrate?: string;
}
export interface AudioFormatOptions {
    audioSampleRate?: number;
    audioChannels?: number;
}
export interface VideoFormatOptions extends SizeData {
    frameRate?: number;
}
export interface MixerCreateOptions extends VideoFormatOptions, AudioFormatOptions {
}
export interface MixerStartOptions extends MixerCreateOptions {
    closeOnDisconnected?: number;
}
export interface StreamingOptions extends BitrateOptions, MixerCreateOptions {
}
export interface KindsByFileInput {
    filePath: string;
    relativePath?: boolean;
}
export interface PushStreamInputsResponse {
    options: string[];
}
export interface PushStreamInputsRequest extends PullStreamInputsRequest, PushStreamInputsResponse, CodecKindsData {
}
export interface PushStreamOptionsResponse {
    portsData: {
        [kind in MediaKind]?: PortData;
    };
    listenIp: string;
}
export interface PortData {
    payloadType: number;
    ssrcs: number[];
    rtpPort: number;
    rtcpPort: number;
    bindRtpPort?: number;
    bindRtcpPort?: number;
}
export interface PushSimulcastInput {
    simulcast?: SizeData[];
}
export type CodecKinds = {
    [kind in MediaKind]?: CODEC;
};
export interface CodecKindsData {
    codecs?: CodecKinds;
}
export interface PushStreamOptionsRequest extends PullStreamInputs, PushSimulcastInput, CodecKindsData {
    bindPorts?: boolean;
}
export interface PushStreamRequest extends StreamKindsData {
    options: string[];
    restartOnExit?: boolean;
    app?: string;
    stdIn?: string;
}
export interface StreamingPortsData {
    listenIp: string;
    tcpPorts: {
        [kind in MediaKind]?: number;
    };
}
export interface TransportListenIp {
    ip: string;
    announcedIp?: string;
}
export interface PullStreamInputs extends StreamKindsData {
    listenIp?: TransportListenIp | string;
    layer?: number;
}
export interface PullStreamInputsRequest extends PullStreamInputs {
    id: string;
}
export interface PullStreamInputsResponse extends Required<CodecKindsData> {
    sdp: string;
    consumerIds: {
        [id: string]: string;
    };
}
export interface ConferenceServer {
    url: string;
    worker: number;
}
export interface ConferenceInputOrigin extends ConferenceServer {
    token?: string;
}
export interface ProducerVideoCodecOptions {
    videoGoogleStartBitrate?: number;
    videoGoogleMaxBitrate?: number;
    videoGoogleMinBitrate?: number;
}
export interface ProducerAudioCodecOptions {
    opusStereo?: boolean;
    opusFec?: boolean;
    opusDtx?: boolean;
    opusMaxPlaybackRate?: number;
    opusPtime?: number;
}
export interface ConferenceBasicInput {
    stopTracks?: boolean;
    simulcast?: boolean;
    kinds?: MediaKind[];
    maxIncomingBitrate?: number;
    codecOptions?: {
        audio?: ProducerAudioCodecOptions;
        video?: ProducerVideoCodecOptions;
    };
}
export type BuiltinHandlerName = 'Chrome74' | 'Chrome70' | 'Chrome67' | 'Chrome55' | 'Firefox60' | 'Safari12' | 'Safari11' | 'Edge11' | 'ReactNative';
export interface ConferenceInput extends ConferenceBasicInput {
    worker?: number;
    url: string;
    origin?: ConferenceInputOrigin;
    stream: string;
    token: string;
    deviceHandlerName?: BuiltinHandlerName;
}
export interface ConferenceConfigTimeout {
    stats: number;
    transport: number;
    consumer: number;
}
export interface ConferenceConfig extends ConferenceInput {
    worker: number;
    kinds: MediaKind[];
    maxIncomingBitrate: number;
    timeout: ConferenceConfigTimeout;
}
export interface StreamListItem {
    stream: string;
    lastModified: number;
}
export interface StreamListData {
    list: StreamListItem[];
}
export interface StorageItem {
    key: string;
    fullKey: string;
    lastModified: number;
}
export interface ListRecordingItem extends StorageItem {
    url: string;
}
export interface ListRecordingsData {
    list: ListRecordingItem[];
}
export interface FilePathInput {
    filePath: string;
}
export interface MixerInput {
    mixerId: string;
}
export interface MixerOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    z: number;
    renderType?: MIXER_RENDER_TYPE;
}
export interface MixerOptionsData extends MixerInput {
    options: MixerOptions;
}
export interface MixerUpdateData extends StreamData, MixerOptionsData {
}
export interface MixerAddVideoData extends MixerUpdateData, StreamListenData {
    kind: 'video';
}
export interface MixerAddAudioData extends MixerInput, StreamListenData {
    kind: 'audio';
}
export interface MixerAddFileData extends MixerPipeData, StreamData, KindsByFileInput, StreamFileRequestOptions {
    loop?: boolean;
    skip?: number;
    removeOnExit?: boolean;
    restartTimeout?: number;
    filters?: {
        [kind in MediaKind]?: string[];
    };
}
export interface TcpPortData {
    port: number;
}
export interface TransparencyData {
    hasTransparency?: boolean;
}
export interface MixerAddTcpData extends MixerInput, TcpPortData, StreamData {
}
export interface MixerAddVideoTcpData extends MixerOptionsData, MixerAddTcpData, TransparencyData {
    kind: 'video';
}
export interface MixerAddAudioTcpData extends MixerAddTcpData {
    kind: 'audio';
}
export interface MixerAddAudioFileData extends MixerAddFileData {
    kinds: ['audio'];
}
export interface MixerAddVideoFileData extends MixerAddFileData, MixerOptionsData, TransparencyData {
    kinds: undefined | ['video'] | ['audio', 'video'] | ['video', 'audio'];
}
export interface MixerAddAudioFileData extends MixerAddFileData {
    kinds: ['audio'];
}
export interface MixerRemoveData extends MixerInput, StreamKindData {
}
export interface MixerPipeData extends MixerInput, KindsData {
}
export interface MixerStreamData extends MixerInput, StreamData {
}
export interface MixerHlsFormatPresetOptions extends SizeData, KindsData {
    preset?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium' | 'slow' | 'slower' | 'veryslow';
}
export interface MixerHlsFormatBitrateOptions extends MixerHlsFormatPresetOptions {
    videoBitrate?: number;
}
export interface MixerHlsFormatCrfOptions extends MixerHlsFormatPresetOptions {
    crf: number;
}
export type MixerHlsFormatOptions = MixerHlsFormatBitrateOptions | MixerHlsFormatCrfOptions;
export interface MixerPipeLiveData extends MixerPipeData, StreamData, PushSimulcastInput, BitrateOptions, CodecKindsData {
    type: MIXER_PIPE_TYPE.LIVE;
}
export interface MixerPipeRecordingData extends MixerPipeData {
    type: MIXER_PIPE_TYPE.RECORDING;
}
export interface MixerPipePortData extends MixerInput {
    type: MIXER_PIPE_TYPE.PORT;
    kind: MediaKind;
    port: number;
}
export interface HlsData {
    formats?: MixerHlsFormatOptions[];
    numChunks?: number;
    chunkDuration?: number;
}
export interface MixerPipeHlsData extends MixerPipeData, HlsData {
    type: MIXER_PIPE_TYPE.HLS;
    formats: MixerHlsFormatOptions[];
    location?: string;
    outputUrl?: string;
    playlistType?: 'event' | 'vod';
    publishMethod?: string;
}
export interface MixerPipeRtmpData extends MixerPipeData {
    type: MIXER_PIPE_TYPE.RTMP;
    url: string;
}
export interface MixerPipeInput {
    pipeId: string;
}
export interface MixerPipeStopInput extends MixerPipeInput, MixerInput {
}
export interface LiveToHlsRequest extends StreamKindsData, HlsData {
    url: string;
    restartOnExit?: boolean;
}
export interface MixerCommandInput extends MixerInput {
    command: string;
}
export interface ClearPipeTransportsInput {
    originUrl: string;
}
export interface StreamingOptionsOutput extends StreamingPortsData {
    options: string[];
    udpPorts: {
        [kind in MediaKind]?: number;
    };
}
export interface StreamFileOptions extends StreamFileRequest, CodecCopyOption, CodecKindsData {
    useFfmpeg?: boolean;
    checkKinds?: boolean;
    restartTimeout?: number;
    rwTimeout?: number;
}
export interface FileStreamingOptionsInput extends Omit<StreamFileOptions, 'restartTimeout' | 'restartOnExit' | 'checkKinds'>, StreamKindsData, KindsByFileInput, StreamingOptions, PushSimulcastInput, CodecCopyOption, CodecKindsData {
    duration?: number;
    listenExternalIp?: boolean;
}
export interface FileStreamingOptionsOutput extends StreamingOptionsOutput {
    ffmpegOptions?: string[];
}
