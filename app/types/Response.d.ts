interface Memory {
    total: number,
    available: number,
    used: number,
    used_pct: number
}

interface Network {
    interface: string,
    bytes_sent: number,
    bytes_recv: number,
    packets_sent: number,
    packets_recv: number
}

interface DockerContainer {
    id: string,
    image: string,
    state: string,
    names: string[]
}

interface Disk {
    total: number,
    used: number,
    free: number,
    used_pct: number,
    filesystem: string
}

interface ServerResponseSmall {
    cpu_usage: number,
    memory: Memory[]
}

interface ServerResponseBig {
    cpu_usage: number,
    memory: Memory[]
    disk: Disk,
    docker?: DockerContainer[],
    network: Network[]
    process_count: number
}