# yugabytedb-docker-extension


Quick install
```
docker login
docker extension ls
make build-extension
docker extension install --force pachot/yugabytedb-docker-extension
docker extension update -f pachot/yugabytedb-docker-extension

#docker extension dev --help
#docker extension dev reset pachot/yugabytedb-docker-extension
#docker extension dev debug pachot/yugabytedb-docker-extension
```
This is very basic, just starts one YugabyteDB node with `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'` and waits that the endpoint `http://localhost:7000` includes `>LEADER<` to show `http://localhost:7000`

Ideally this extension should:
- start a container `yb1` with `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'`
- display the webconsole from `http://yb1:7000`
- open a shell running `ysqlsh -h yb1`
- have a button to add two nodes: `yb2` with `bin/yugabyted start --daemon=false --listen=yb2 --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `yb3` with `bin/yugabyted start --daemon=false --listen=yb2 --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'
