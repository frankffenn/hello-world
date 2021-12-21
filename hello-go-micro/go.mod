module hello-world/hello-farmplanet

go 1.16

require (
	github.com/asim/go-micro/plugins/registry/consul/v4 v4.0.0-20211220083148-8e52761edb49
	github.com/frankffenn/worker-srv v0.0.1-rc1
	go-micro.dev/v4 v4.5.0
)

replace github.com/frankffenn/worker-srv => ../../ssss.top/lotus/worker-srv
