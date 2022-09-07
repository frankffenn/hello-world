package main

import (
	"context"
	"fmt"
	"github.com/asim/go-micro/plugins/registry/consul/v4"
	pb "github.com/frankffenn/worker-srv/proto"
	"go-micro.dev/v4/registry"
	"github.com/frankffenn/worker-srv/wrapper"
	"go-micro.dev/v4/client"
)

var srvName = "go.micro.worker"
var rpcClient = pb.NewWorkerService(srvName, client.NewClient(
	client.Wrap(wrapper.NewSelectWrapper("127.0.0.1:8888")),
	client.Registry(consul.NewRegistry(registry.Addrs("127.0.0.1:8888")))),
)

func main() {

	resp, err := rpcClient.SealCommit2(context.Background(), &pb.SealCommit2Request{Sector: &pb.SectorID{Miner: uint64(1), Number: uint64(2)}, Commit1Out: []byte("hello workld")})
	if err != nil {
		fmt.Println("err", err)
		return
	}
	fmt.Println(resp.Proof)
}
