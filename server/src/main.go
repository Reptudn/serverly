package main

// get ip with `ifconfig | grep inet`

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
)

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

	// Return all stats as a map
	return map[string]interface{}{
		"cpu_usage": cpuPercentages[0], // CPU usage as a percentage
		"memory": map[string]interface{}{
			"total":     virtualMemory.Total,
			"available": virtualMemory.Available,
			"used":      virtualMemory.Used,
			"used_pct":  virtualMemory.UsedPercent,
		},
	}, nil
}

func getStatusFull() (map[string]interface{}, error) {
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
	dockerContainers, err := getDockerContainers()
	if err != nil {
		return nil, err
	}
	if dockerContainers == nil {
		dockerContainers = []map[string]interface{}{}
	}

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
		"disk":          diskUsage,
		"docker":        dockerContainers,
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

	router.GET("/status/full", func(c *gin.Context) {
		stats, err := getStatusFull()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, stats)
	})

	router.Run("0.0.0.0:8080")
}
