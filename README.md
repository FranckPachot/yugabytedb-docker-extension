# yugabytedb-docker-extension

https://www.docker.com/blog/build-your-first-docker-extension/

```
docker login
docker extension ls
docker extension rm pachot/yugabytedb-docker-extension

make build-extension
docker extension install --force pachot/yugabytedb-docker-extension
docker extension ls

make build-extension
docker extension update -f pachot/yugabytedb-docker-extension

docker extension dev --help
docker extension dev reset pachot/yugabytedb-docker-extension
docker extension dev debug pachot/yugabytedb-docker-extension

```
