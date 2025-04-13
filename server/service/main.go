package main

// get ip with `ifconfig | grep inet`

import (
	"fmt"
	"net/http"
	"os"

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

	serverPassword := os.Getenv("SERVER_PASSWORD")

	router := gin.Default()

	router.Use(func(c *gin.Context) {

		fmt.Println("Headers", c.Request.Header)

		if serverPassword == "" {
			c.Next()
			return
		}

		pass := c.GetHeader("password")
		fmt.Println("Received password header:", pass)
		if pass != serverPassword {
			fmt.Println("Password err: " + pass + " != " + serverPassword)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized or password not given!"})
			c.Abort()
			return
		}
		c.Next()
	})

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

	router.GET("/processes", func(c *gin.Context) {
		processes, err := getProcesses()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, processes)
	})

	fmt.Print("Running Server...\nPassword? ")
	if serverPassword == "" {
		fmt.Println("No")
	} else {
		fmt.Println("Yes")
	}

	router.Run("0.0.0.0:8080")
}
