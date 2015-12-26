# riak-help-json
JSON files describing riak stats, config settings and bucket properties (for
help tips and graphing usage).

## Contents

1. [Riak Stats Help](#riak-stats-help)
2. [Bucket Properties Help](#bucket-properties-help)

## Riak Stats Help

The **[riak_status.json](riak_status.json)** file contains a hashmap (JSON
object) of some 400-plus Riak stats, in the following format:

```json
{
  "node_put_fsm_time_median": {
      "category": "latency",
      "concern": "kv",
      "description": "Median time between reception of client PUT request and subsequent response to client",
      "example": "0",
      "json_schema_type": "number",
      "metric_type": "interval",
      "name": "node_put_fsm_time_median",
      "period": "1 minute",
      "scope": "node",
      "units": "microseconds"
  },
  ...
}
```

These can be useful for:

* Displaying Help text for Riak stats in the [Riak Explorer GUI](https://github.com/basho-labs/riak-explorer-gui) project
* Generating Basho Docs help text for stats
* Auto-generating configs for third-party Riak Monitoring plugins
    (such as [newrelic_riak_plugin](https://github.com/basho/newrelic_riak_plugin)).

Note: This currently does not include MDC Replication stats (see
[issue #3](https://github.com/basho-labs/riak-help-json/issues/3)).

Each statistic has the following attributes.

#### `id`
The stats are keyed by "stat id" -- for example, `node_put_fsm_time_median` above.

#### `category`

The Category attribute is meant to classify all stats according
to their general category -- latency stats, various types of throughput,
library versions. These can be used as broad sections (or tabs in a GUI)
that organize the stats by topic.

Currently used category values:

* `cluster state` - Cluster membership information (connected nodes, ring size,
    etc).
* `config` - String configuration values (node name, backend, Erlang VM config
    settings)
* `errors` - Errors of all types (read, write, query, indexing)
* `latency` - Min/Max/Avg/etc latencies for all types of Riak operations
* `load` - Stats related to cluster load (number of FSMs created, active connections,
    operations rejected by overload protection, and so on)
* `meta` - A few stats related to the Riak Stats system itself (like
    `riak_kv_stat_ts`)
* `object size` - Object size statistics
* `ring activity` - Stats related to transfers and ring rebalancing operations
* `siblings` - Sibling count statistics
* `throughput - 2i` - Throughput metrics related to Secondary Index operations
* `throughput - read` - All read-related throughput metrics (plain, CRDT, SC, write_once, etc)
* `throughput - search` - Throughput metrics related to Riak Search (YZ) operations
* `throughput - write` - All write-related throughput metrics (plain, CRDT, SC, write_once, etc)
* `usage` - Currently only houses the disk usage stat.
* `versions` - Library versions.

Some category notes:

- `versions` stats generally do not change, and so can be ignored (and do not
    need to be aggregated)
- `config` and `cluster state` (and, usually `ring activity`) settings also do
    not change between restarts, and do not need to be aggregated
- The sum of `throughput - read` and `throughput - write` can give an overall
    "Cluster K/V Ops/second" statistic (as well as an overall Read:Write ratio).

#### `concern`

The Concern attribute categorizes the stats by relevance, by "subsystem" to
which they apply. For example, `search` stats, `kv` stats, `crdt`, `secondary_index`,
and so on.

It's meant to be used to divide up graphs by smaller sections, combined with
`category` above. Things like, "Search Latencies", "K/V Throughput", etc.
Also, they're useful for filtering the aggregation and storage of stats only
to subsystems that are turned on for the cluster. So, if Search is not enabled
on the cluster, it's safe to not aggregate stats with `concern == 'search'`.

Currently used `concern` values:

* `config` - Versions and Riak Config related stats
* `core` - Riak Core related stats (ring rebalancing, transfers, gossip
    operations, active connections, other misc stats)
* `crdt` - Riak Data Type related stats
* `kv` - Plain Riak Key/Value operation stats
* `map/reduce` - Related to Riak Pipe and Map/Reduce operations
* `resources` - Disk usage, Erlang VM system resources usage
* `search` - Riak [Search](http://docs.basho.com/riak/latest/dev/using/search/) related stats
* `secondary_index` - Secondary Index stats (LevelDB and Memory backends only)
* `strong_consistency` - Riak Strong Consistency related stats
* `write_once` - Write-optimized type stats introduced in Riak 2.1

#### `description`

Description / explanation for the stat, meant to be displayed as help text
or tooltips for graphs.

If a description is empty (`description == ""`), it means the stat is currently
undocumented in the Basho Docs -- these should be filled in asap (see
[issue #1](https://github.com/basho-labs/riak-help-json/issues/1) and
[basho_docs/#1884](https://github.com/basho/basho_docs/issues/1884)).

Note: Some `category == 'versions'` stats link to the relevant libraries in
Markdown format -- this should probably be changed to straight HTML.

#### `example`

These are example values for the stat; these should be improved (there's a lot
of `0`s currently, it could be updated to some representative numbers).

#### `json_schema_type`

Classifies the stats by
[JSON Schema primitive types](http://json-schema.org/latest/json-schema-core.html#anchor8).
(`string`, `number`, `boolean`, `array`, `object`).

#### `metric_type`

Classifies the stats by statistical metric type, to aid with deciding which to
aggregate and to graph, and how.

One of:

* `nominal` - These are "named" values that don't generally change. For example,
    library versions, node names, config values, etc.
* `interval` - These are stats that are sampled during an interval of time (in
    the case of Riak stats, usually 1 minute). Used for latencies, ops/minute and
    so on. These need to be stored and aggregated by any sort of monitoring or
    graphing services.
* `summary` - These are aggregate stats, here used to denote the various `*_total`
    counts (generally tallied since the start of the node). These typically don't
    need to be stored in the same time-series like way as the `interval` type
    stats, since only their *latest* total values are interesting.

#### `name`

This is meant to store human-readable stat names, such as you would use for
labels under a graph.

In the initial implementation, the name just stores the `id`s (so, it currently
stores `node_put_fsm_time_median` instead of `Node Median Put Time`).

#### `period`

The time period for which the stats were collected / aggregated.

One of:

* `1 minute` - Most stats with `metric_type == interval` are gathered over the
    period of 1 minute.
* `since start` - Most totals (`metric_type == summary`) are kept since node
    start. Restarting a node resets these to 0.
* `current` - Some stats are supposed to display the "current" state of the
    node or the system (for example, `cpu_nprocs`). It's unclear what the
    time-interval resolution for these is (that is, how recent these are and
    how frequently they change). However, since all Riak stats are cached on a
    1 minute basis, assume that these are "current to within 1 minute".
* `?` - These stats are undocumented, and it's unknown to the initial implementers
    what the time period is. All `?` values should be fixed/filled in.

#### `scope`

The Score attribute denotes whether the stat applies to the whole cluster (
such as the various cluster state stats), the node, or its vnodes.
This one is also meant to aid in separating stats into tabs / sections on a
graphing GUI.

One of:

* `cluster` - These stats apply to the whole cluster (and are kept in the
    cluster_metadata directory, or gossiped around the ring)
* `config` - Config settings and library versions. While these can technically
    vary from node to node (such as when a live cluster is being upgraded),
    generally these should be the same among all the nodes.
* `erlang vm` - Stats that apply to a particular node's Erlang VM.
* `node` - Per-node stats. Generally mean "these are the operations this node
    has *coordinated*".
* `vnode` - Per-vnode average stats (local to this node). Generally these mean
    "these are the operations that the node has performed *locally*, as opposed
    to coordinated with other nodes". Comparing `node` vs `vnode` stats is a
    good way to diagnose disk and network problems. For example, if the `vnode`
    latencies are drastically higher than the `node` latencies, it means that the
    local disk I/O is having problems (whereas operations sent to other nodes
    doing fine).

#### `units`

Units for the stats. Meant to be displayed under graphs.

Most latency type stats are in `microseconds`, except that some ring operations
like `converge_delay_mean` are in `milliseconds`.

Units with value `n/a` generally means that these are not for graphing, such as
library versions. Units with value `?` means that these are undocumented / unclear,
and should be fixed.

### Riak Stats code snippets

Python script to output un-documented stats (that aren't library versions):

```python
# undocumented_stats.py
import json

with open('riak_status.json') as data_file:
    stats = json.load(data_file)

for key in stats:
    if stats[key]["description"] == '' and stats[key]["category"] != "versions":
        print key
```

You can generate a sorted list of stats with empty descriptions, and use `grep`
against a local `basho_docs` repo to see if they've been documented there.
(Assumes that the `basho_docs` repo is in the parent directory
containing the `riak-help-json` repo -- that is, one level up.)

```bash
python undocumented_stats.py | sort  > undocumented.txt
grep -rnf undocumented.txt ../basho_docs/ --exclude ../basho_docs/.git/* --include ../basho_docs/*/*.md
```

## Bucket Properties Help

The **[bucket_props.json](bucket_props.json)** file contains a hashmap (JSON
object) of bucket and bucket type properties, in the following format:

```json
{
    "active": {
        "default": true,
        "description": "Has this bucket type been activated?",
        "editable": false,
        "json_schema_type": "boolean",
        "name": "Activated"
    },
}
```

Each Bucket or Bucket Type property has the following attributes.

#### `default`
The default value for this property, used for all newly-created bucket types.
Note: a default of `"*"` just means that this property is absent by default.
For example, the `search_index` or `datatype` properties are not present in a
bucket type's properties, unless explicitly set.

#### `description`
A more detailed helptext description for the property. If the property has been
deprecated, the description starts with the string `(Deprecated)`.

#### `editable`
Can this property be edited via a Edit Bucket Type Props call? Some properties
can only be set when *creating* a bucket type, such as `datatype`, `consistent`,
`write_once` or `name`. Others cannot be changed at all, such as the `claimant`
property, which is there only for informational purposes, or the `chash_keyfun`
property, which has been deprecated.

#### `json_schema_type`
Specifies the property's
[JSON Schema primitive type](http://json-schema.org/latest/json-schema-core.html#anchor8).
(`string`, `number`, `boolean`, `array`, `object`). In case a property accepts
several different value types, the types are separated by a `|` character.
For example, the various Quorum properties have a schema type of `integer|string`,
because they can contain either integer values, or symbolic quorum string values
such as `all`, `one` or `quorum`.

#### `name`
Human-readable name for the property.
