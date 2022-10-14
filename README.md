# yugabytedb-docker-extension

YugabyteDB is an open-source PostgreSQL compatible Distributed SQL database

This is very basic, just starts one YugabyteDB node with `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'` and waits that the endpoint `http://localhost:7000` includes `>LEADER<` to show `http://localhost:7000`

Ideally this extension should:
- start a container `yb1` with `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'`
- display the webconsole from `http://yb1:7000` (may open it in the browser)
- open a shell running `ysqlsh -h yb1` to give SQL access
- open pour 5433 to connect with any PostgreSQL client
- have a button to add two nodes: `yb2` with `bin/yugabyted start --daemon=false --listen=yb2 --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `yb3` with `bin/yugabyted start --daemon=false --listen=yb2 --listen=yb1 --tserver_flags='ysql_enable_auth=false' and `bin/yugabyted start --daemon=false --listen=yb1 --tserver_flags='ysql_enable_auth=false'

In the future, it would be nice to include all commands available in `bin/yugabyted` and also the possibility to stop containers to test high availability


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
