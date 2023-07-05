export interface NgrokEndpoint {
    id: string;
    region: string;
    created_at: string;
    updated_at: string;
    public_url: string;
    proto: string;
    hostport: string;
    type: string;
    tunnel: {
        id: string;
        uri: string;
    };
}

export interface NgrokAPIRequestSuccess {
    endpoints: NgrokEndpoint[];
    uri: string;
    next_page_uri: string;
}

export interface ServerStatusAPIRequestSuccess {
    online: boolean;
    ip: string;
    port: number;
    hostname?: string;
    debug: {
        ping: boolean;
        query: boolean;
        srv: boolean;
        querymismatch: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        animatedmotd: boolean;
        cachehit: boolean;
        cachetime: number;
        cacheexpire: number;
        apiversion: number;
    };
    version: string;
    protocol?: number;
    icon?: string;
    software?: string;
    map: string;
    eula_blocked: boolean;
    motd: {
        raw: string[];
        clean: string[];
        html: string[];
    };
    players: {
        online: number;
        max: number;
        list?: string[];
        uuid?: {
            [key: string]: string;
        };
    };
    plugins?: {
        names: string[];
        raw: string[];
    };
    mods?: {
        names: string[];
        raw: string[];
    };
    info?: {
        raw: string[];
        clean: string[];
        html: string[];
    };
}
