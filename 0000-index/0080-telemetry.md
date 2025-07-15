

## telemetry

- **loki** [📁](./loki) [🌐](https://github.com/GerHobbelt/loki) -- Grafana Loki: like Prometheus, but for logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by [Prometheus](https://prometheus.io/). It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
- **ms_cpp_client_telemetry** [📁](./ms_cpp_client_telemetry) [🌐](https://github.com/GerHobbelt/cpp_client_telemetry) -- 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **opentelemetry-cpp** [📁](./opentelemetry-cpp) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp) -- The OpenTelemetry C++ Client
- **opentelemetry-cpp-contrib** [📁](./opentelemetry-cpp-contrib) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp-contrib) -- OpenTelemetry C++ Contrib repository which contains set of components extending functionality of the OpenTelemetry SDK. Instrumentation libraries, exporters, and other components can find their home here.
- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **statsite** [📁](./statsite) [🌐](https://github.com/GerHobbelt/statsite) -- a metrics aggregation server. Statsite is based heavily on Etsy's StatsD <https://github.com/etsy/statsd>, and is wire compatible.
- **TelemetrySourcerer** [📁](./TelemetrySourcerer) [🌐](https://github.com/GerHobbelt/TelemetrySourcerer) -- Telemetry Sourcerer can enumerate and disable common sources of telemetry used by AV/EDR on Windows. Red teamers and security enthusiasts can use this tool in a lab environment for various purposes, including ETW event monitoring.
- **tempo** [📁](./tempo) [🌐](https://github.com/GerHobbelt/tempo) -- Grafana Tempo is an open source, easy-to-use and high-scale distributed tracing backend. Tempo is cost-efficient, requiring only object storage to operate, and is deeply integrated with Grafana, Prometheus, and Loki. Tempo is Jaeger, Zipkin, Kafka, OpenCensus and OpenTelemetry compatible.  It ingests batches in any of the mentioned formats, buffers them and then writes them to Azure, GCS, S3 or local disk.  As such it is robust, cheap and easy to operate! Tempo implements [TraceQL](https://grafana.com/docs/tempo/latest/traceql/), a traces-first query language inspired by LogQL and PromQL. This query language allows users to very precisely and easily select spans and jump directly to these spans.















	
----

🡸 [previous section](./0079-etw.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0081-ocr.md)
