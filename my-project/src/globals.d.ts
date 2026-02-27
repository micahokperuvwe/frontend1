declare interface Window {
    Buffer: any;
    process: any;
}

declare module 'process' {
    const process: any;
    export default process;
}

declare module 'simple-peer/simplepeer.min.js' {
    const Peer: any;
    export default Peer;
}
