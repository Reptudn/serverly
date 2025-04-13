package main

import (

	// "github.com/docker/docker/api/types"
	// "github.com/docker/docker/client"

	"context"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/net"
	"github.com/shirou/gopsutil/v3/process"
)

func getDiskUsage() (map[string]interface{}, error) {
	usage, err := disk.Usage("/")
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"total":      usage.Total,       // Total disk space in bytes
		"used":       usage.Used,        // Used disk space in bytes
		"free":       usage.Free,        // Free disk space in bytes
		"used_pct":   usage.UsedPercent, // Used disk space as a percentage
		"filesystem": usage.Fstype,      // Filesystem type
	}, nil
}

func getDockerContainers() ([]map[string]interface{}, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	containers, err := cli.ContainerList(context.Background(), container.ListOptions{
		All: true,
	})
	if err != nil {
		return nil, err
	}

	var containerList []map[string]interface{}
	for _, container := range containers {
		containerList = append(containerList, map[string]interface{}{
			"id":    container.ID,
			"image": container.Image,
			"state": container.State,
			"names": container.Names,
		})
	}

	return containerList, nil
}

func getNetworkStats() ([]map[string]interface{}, error) {
	ioStats, err := net.IOCounters(true)
	if err != nil {
		return nil, err
	}

	var stats []map[string]interface{}
	for _, io := range ioStats {
		stats = append(stats, map[string]interface{}{
			"interface":    io.Name,
			"bytes_sent":   io.BytesSent, // Total bytes sent
			"bytes_recv":   io.BytesRecv, // Total bytes received
			"packets_sent": io.PacketsSent,
			"packets_recv": io.PacketsRecv,
		})
	}

	return stats, nil
}

func getProcessCount() (int, error) {
	processes, err := process.Processes()
	if err != nil {
		return 0, err
	}

	return len(processes), nil
}

func getProcesses() ([]map[string]interface{}, error) {
	processes, err := process.Processes()
	if err != nil {
		return nil, err
	}

	var processList []map[string]interface{}
	for _, proc := range processes {
		name, _ := proc.Name()
		pid := proc.Pid
		cpuPercent, _ := proc.CPUPercent()
		memInfo, _ := proc.MemoryInfo()

		processList = append(processList, map[string]interface{}{
			"pid":         pid,
			"name":        name,
			"cpu_percent": cpuPercent,
			"memory": map[string]interface{}{
				"rss": memInfo.RSS,
				"vms": memInfo.VMS,
			},
		})
	}

	return processList, nil
}
