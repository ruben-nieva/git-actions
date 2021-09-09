# Running a new node

This document describes in detail how to configure infrastructure and deploy a new node (observer or validator).

If a new network needs to be initialized, please first follow the instructions for [creating a new network from genesis](setting-up-a-new-network.md).

If a new validator needs to be added to the existing network, please refer to [joining existing network](joining-existing-network.md) instruction.

---

## Setting up infrastructure

### Hardware requirements

Minimal:
- 1GB RAM
- 25GB of disk space
- 1.4 GHz CPU

Recommended (for highload applications):
- 2GB RAM
- 100GB SSD
- x64 2.0 GHz 2v CPU

More about hardware requirements can be found [here](https://docs.tendermint.com/master/nodes/running-in-production.html#hardware).

### Operating System

Current delivery is compiled and tested for `Ubuntu 20.04 LTS` so we recommend using this distribution for now. In the future, it will be possible to compile the application for a wide range of operating systems thanks to the Go language.

### Ports

To function properly node requires the following ports to be configured:

- P2P port:
  - This port is used for peer to peer node communication
  - Incoming and outcoming tcp connections must be allowed
  - `26656` by default
  - Can be configured in `config.toml`
- RPC port:
  - This port is used by client applications. Open it only if you want clients to be able to connect to your node.
  - Incoming tcp connections should be allowed.
  - SSL can also be configured separately
  - `26657` by default
  - Can be configured in `config.toml`

### Volumes

We recommend to use separate volume for `data` directory where blockchain is stored.

The directory location depends on the installation method:
- For binary distribution it's `$HOME/.cheqdnode/data` by default;
- If you install node using `deb` package, default location is: `/var/lib/cheqd/.cheqdnode/data`.

### Sentry nodes (optional)

You can read about sentry nodes [here](https://docs.tendermint.com/master/nodes/validators.html).



---

## Installing and configuring software

### Installing using .deb package

This is the most preferable way to get `cheqd-node`. Detailed information about changes made by the package can be found [here](deb-package-overview.md)

1. Get `deb` for Ubuntu 20.04 in [releases](https://github.com/cheqd/cheqd-node/releases);

2. Install the package;

    Command: `sudo dpkg -i <package_file>.deb`
    
    Example: `sudo dpkg -i cheqd-node_0.1.13_amd64.deb`

3. Switch to `cheqd` system user:

    You should always switch to `cheqd` system user before managing node. That's because node binary stores configuration files in home directory.

    ```
    sudo su cheqd
    ```

3. Initialize node config files:
        
    Command: `cheqd-noded init <node_name>`
    
    Example: `cheqd-noded init alice-node`

4. Set genesis:
        
    Genesis files for public networks are published in [this directory](https://github.com/cheqd/cheqd-node/tree/main/persistent_chains).
    
    Put corresponding `genesis.json` to: `/etc/cheqd-node/`
    
5. Set persistent peers:
        
    Persistent nodes addresses for public networks are also published in [this directory](https://github.com/cheqd/cheqd-node/tree/main/persistent_chains).
    
    Open node's config file: `/etc/cheqd-node/config.toml`
    
    Search for `persistent_peers` parameter and set it's value to a comma separated list of other participant node addresses.
    
    Format: `<node-0-id>@<node-0-ip>, <node-1-id>@<node-1-ip>, <node-n-id>@<node-n-ip>, ...`.
    
    Domain names can be used instead of IP addresses.
    
    Example:
    
    ```
    persistent_peers = "d45dcc54583d6223ba6d4b3876928767681e8ff6@node0:26656, 9fb6636188ad9e40a9caf86b88ffddbb1b6b04ce@node1:26656, abbcb709fb556ce63e2f8d59a76c5023d7b28b86@node2:26656, cda0d4dbe3c29edcfcaf4668ff17ddcb96730aec@node3:26656"
    ```

6. (optional) Make RPC endpoint available externally:
     
    This step is necessary if you want to allow incoming client application connections to your node. Otherwise, the node will be accessible only locally. 

    Open the node configuration file using the text editor that you prefer: `/etc/cheqd-node/config.toml`

    Search for `ladr` parameter in `RPC Server Configuration Options` section and replace it's value to `0.0.0.0:26657`
        
    Example: `laddr = "tcp://0.0.0.0:26657"`

7. Enable `cheqd-noded` service:

    ```
    systemctl enable cheqd-noded
    ```

### Installing using binary

You can get the binary in several ways:

- Compile from source code - [instruction](../README.md);
- Get `tar` archive with the binary compiled for Ubuntu 20.04 in [releases](https://github.com/cheqd/cheqd-node/releases);

### Other ways

- Get docker image form [packages](https://github.com/cheqd/cheqd-node/pkgs/container/cheqd-node).

---

## Getting node info

### Node id

Node id is a part of peer info. To get `node id` run the following command on the node's machine:

```
cheqd-noded tendermint show-node-id
```

### Validator public key

Validator public key is used to promote node to the validator. To get it run the following command on the node's machine:

```
cheqd-noded tendermint show-validator
```

### Peer information

Peer info is used to connect to peers when setting up a new node. It has the following format:

```
<node-id>@<node-url>
```

Example:

```
ba1689516f45be7f79c7450394144711e02e7341@3.13.19.41:26656
```

---

## Additional information

You can read other advices about running node in production [here](https://docs.tendermint.com/master/nodes/running-in-production.html).

[Сosmovisor](https://docs.cosmos.network/master/run-node/cosmovisor.html) can be used for automatic updates.
