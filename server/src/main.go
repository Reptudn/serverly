package main

// get ip with `ifconfig | grep inet`

import (
	"net/http"

	// "github.com/docker/docker/api/types"
	// "github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
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

/*
func getDockerContainers() ([]map[string]interface{}, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{
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
*/

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

func getStatus() (map[string]interface{}, error) {
	// Get CPU usage
	cpuPercentages, err := cpu.Percent(0, false)
	if err != nil {
		return nil, err
	}

	// Get memory usage
	virtualMemory, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}

	// Get disk usage
	diskUsage, err := getDiskUsage()
	if err != nil {
		return nil, err
	}

	// Get Docker containers
	/*
		dockerContainers, err := getDockerContainers()
		if err != nil {
			return nil, err
		}
	*/

	// Get network stats
	networkStats, err := getNetworkStats()
	if err != nil {
		return nil, err
	}

	// Get process count
	processCount, err := getProcessCount()
	if err != nil {
		return nil, err
	}

	// Return all stats as a map
	return map[string]interface{}{
		"cpu_usage": cpuPercentages[0], // CPU usage as a percentage
		"memory": map[string]interface{}{
			"total":     virtualMemory.Total,
			"available": virtualMemory.Available,
			"used":      virtualMemory.Used,
			"used_pct":  virtualMemory.UsedPercent,
		},
		"disk": diskUsage,
		// "docker":        dockerContainers,
		"network":       networkStats,
		"process_count": processCount,
	}, nil
}

func main() {
	router := gin.Default()

	router.GET("/status", func(c *gin.Context) {
		stats, err := getStatus()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, stats)
	})

	router.Run("0.0.0.0:8080")
}
