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

interface Process {
	pid: number; // Process ID
	name: string; // Process name
	cpu_percent: number; // CPU usage percentage
	memory: {
		rss: number; // Resident Set Size (memory in bytes)
		vms: number; // Virtual Memory Size (memory in bytes)
	};
}

interface ServerProcessResponse {
	processes: Process[]
}

interface ServerResponseSmall {
	cpu_usage: number,
	memory: Memory
}

interface ServerResponseBig {
	cpu_usage: number,
	memory: Memory
	disk: Disk,
	docker: DockerContainer[],
	network: Network[]
	process_count: number
}