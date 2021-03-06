let RiakConfigHelp = {
    "anti_entropy": {
        "default": "active",
        "description": "How Riak will repair out-of-sync keys. Some features require\nthis to be set to 'active', including search.\n* active: out-of-sync keys will be repaired in the background\n* passive: out-of-sync keys are only repaired on read\n* active-debug: like active, but outputs verbose debugging\ninformation",
        "example": "passive",
        "internal_key": "riak_kv.anti_entropy",
        "valid": ["active", "passive", "active-debug"]
    },
    "anti_entropy.bloomfilter": {
        "default": "on",
        "description": "Each database .sst table file can include an optional \"bloom\nfilter\" that is highly effective in shortcutting data queries that\nare destined to not find the requested key. The Bloom filter\ntypically increases the size of an .sst table file by about\n2%.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_leveldb_opts.use_bloomfilter",
        "valid": ["on", "off"]
    },
    "anti_entropy.concurrency_limit": {
        "default": "2",
        "description": "Limit how many AAE exchanges or builds can happen concurrently.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_concurrency",
        "valid": "an integer"
    },
    "anti_entropy.data_dir": {
        "default": "$(platform_data_dir)/anti_entropy",
        "description": "The directory where AAE hash trees are stored.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_data_dir",
        "valid": "the path to a directory"
    },
    "anti_entropy.max_open_files": {
        "default": "20",
        "description": "",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_leveldb_opts.max_open_files",
        "valid": "an integer"
    },
    "anti_entropy.throttle": {
        "default": "on",
        "description": "Whether the distributed throttle for active anti-entropy is\nenabled.",
        "example": "",
        "internal_key": "riak_kv.aae_throttle_kill_switch",
        "valid": ["on", "off"]
    },
    "anti_entropy.tree.build_limit.number": {
        "default": "1",
        "description": "Restrict how fast AAE can build hash trees. Building the tree\nfor a given partition requires a full scan over that partition's\ndata. Once built, trees stay built until they are expired.\n* .number is the number of builds\n* .per_timespan is the amount of time in which that .number of builds\noccurs\nDefault is 1 build per hour.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_build_limit",
        "valid": "an integer"
    },
    "anti_entropy.tree.build_limit.per_timespan": {
        "default": "",
        "description": "",
        "example": "",
        "internal_key": "",
        "valid": ""
    },
    "anti_entropy.tree.expiry": {
        "default": "1w",
        "description": "Determine how often hash trees are expired after being built.\nPeriodically expiring a hash tree ensures the on-disk hash tree\ndata stays consistent with the actual k/v backend data. It also\nhelps Riak identify silent disk failures and bit rot. However,\nexpiration is not needed for normal AAE operation and should be\ninfrequent for performance reasons. The time is specified in\nmilliseconds.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_expire",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "anti_entropy.trigger_interval": {
        "default": "15s",
        "description": "The tick determines how often the AAE manager looks for work\nto do (building/expiring trees, triggering exchanges, etc).\nThe default is every 15 seconds. Lowering this value will\nspeedup the rate that all replicas are synced across the cluster.\nIncreasing the value is not recommended.",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_tick",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "anti_entropy.use_background_manager": {
        "default": "off",
        "description": "Whether to use the background manager to limit AAE tree\nrebuilds. This will help to prevent system response degradation\nunder times of heavy load from multiple background tasks that\ncontend for the same resources.\nSee also:\n    background_manager",
        "example": "",
        "internal_key": "riak_kv.aae_use_background_manager",
        "valid": ["on", "off"]
    },
    "anti_entropy.write_buffer_size": {
        "default": "4MB",
        "description": "The LevelDB options used by AAE to generate the LevelDB-backed\non-disk hashtrees.\nSee also:\n    leveldb.write_buffer_size",
        "example": "",
        "internal_key": "riak_kv.anti_entropy_leveldb_opts.write_buffer_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "background_manager": {
        "default": "off",
        "description": "Whether to enable the background manager globally. When\nenabled, participating Riak subsystems will coordinate access to\nshared resources. This will help to prevent system response\ndegradation under times of heavy load from multiple background\ntasks. Specific subsystems may also have their own controls over\nuse of the background manager.",
        "example": "",
        "internal_key": "riak_core.use_background_manager",
        "valid": ["on", "off"]
    },
    "bitcask.data_root": {
        "default": "$(platform_data_dir)/bitcask",
        "description": "A path under which bitcask data files will be stored.",
        "example": "$(platform_data_dir)/bitcask",
        "internal_key": "bitcask.data_root",
        "valid": "the path to a directory"
    },
    "bitcask.expiry": {
        "default": "off",
        "description": "By default, Bitcask keeps all of your data around. If your\ndata has limited time-value, or if for space reasons you need to\npurge data, you can set the `expiry` option. If you needed to\npurge data automatically after 1 day, set the value to `1d`.\nDefault is: `off` which disables automatic expiration",
        "example": "",
        "internal_key": "bitcask.expiry_secs",
        "valid": "the text 'off', or a time duration with units, e.g. '10s' for 10 seconds"
    },
    "bitcask.expiry.grace_time": {
        "default": "",
        "description": "By default, Bitcask will trigger a merge whenever a data file\ncontains an expired key. This may result in excessive merging under\nsome usage patterns. To prevent this you can set the\n`bitcask.expiry.grace_time` option. Bitcask will defer triggering\na merge solely for key expiry by the configured number of\nseconds. Setting this to `1h` effectively limits each cask to\nmerging for expiry once per hour.\nDefault is: `0`",
        "example": "",
        "internal_key": "bitcask.expiry_grace_time",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "bitcask.fold.max_age": {
        "default": "unlimited",
        "description": "Fold keys thresholds will reuse the keydir if another fold was\nstarted less than `fold.max_age` ago and there were less than\n`fold.max_puts` updates. Otherwise it will wait until all current\nfold keys complete and then start. Set either option to unlimited\nto disable.",
        "example": "",
        "internal_key": "bitcask.max_fold_age",
        "valid": "the text 'off', or a time duration with units, e.g. '10s' for 10 seconds"
    },
    "bitcask.fold.max_puts": {
        "default": "0",
        "description": "Fold keys thresholds will reuse the keydir if another fold was\nstarted less than `fold.max_age` ago and there were less than\n`fold.max_puts` updates. Otherwise it will wait until all current\nfold keys complete and then start. Set either option to unlimited\nto disable.",
        "example": "",
        "internal_key": "bitcask.max_fold_puts",
        "valid": "an integer"
    },
    "bitcask.hintfile_checksums": {
        "default": "strict",
        "description": "Require the CRC to be present at the end of hintfiles.\nSetting this to `allow_missing` runs Bitcask in a backward\ncompatible mode where old hint files will still be accepted without\nCRC signatures.",
        "example": "",
        "internal_key": "bitcask.require_hint_crc",
        "valid": ["strict", "allow_missing"]
    },
    "bitcask.io_mode": {
        "default": "erlang",
        "description": "Configure how Bitcask writes data to disk.\nerlang: Erlang's built-in file API\nnif: Direct calls to the POSIX C API\nThe NIF mode provides higher throughput for certain\nworkloads, but has the potential to negatively impact\nthe Erlang VM, leading to higher worst-case latencies\nand possible throughput collapse.",
        "example": "erlang",
        "internal_key": "bitcask.io_mode",
        "valid": ["erlang", "nif"]
    },
    "bitcask.max_file_size": {
        "default": "2GB",
        "description": "Describes the maximum permitted size for any single data file\nin the Bitcask directory. If a write causes the current file to\nexceed this size threshold then that file is closed, and a new file\nis opened for writes.",
        "example": "",
        "internal_key": "bitcask.max_file_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "bitcask.max_merge_size": {
        "default": "100GB",
        "description": "Maximum amount of data to merge in one go in the Bitcask backend.",
        "example": "",
        "internal_key": "riak_kv.bitcask_max_merge_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "bitcask.merge.policy": {
        "default": "always",
        "description": "Lets you specify when during the day merge operations are\nallowed to be triggered. Valid options are:\n* `always` (default) No restrictions\n* `never` Merge will never be attempted\n* `window` Hours during which merging is permitted, where\n`bitcask.merge.window.start` and `bitcask.merge.window.end` are\nintegers between 0 and 23.\nIf merging has a significant impact on performance of your cluster,\nor your cluster has quiet periods in which little storage activity\noccurs, you may want to change this setting from the default.",
        "example": "",
        "internal_key": "bitcask.merge_window",
        "valid": ["always", "never", "window"]
    },
    "bitcask.merge.thresholds.dead_bytes": {
        "default": "128MB",
        "description": "Describes the minimum amount of data occupied by dead keys in\na file to cause it to be included in the merge. Increasing the\nvalue will cause fewer files to be merged, decreasing the value\nwill cause more files to be merged.\nDefault is: 128MB",
        "example": "",
        "internal_key": "bitcask.dead_bytes_threshold",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "bitcask.merge.thresholds.fragmentation": {
        "default": "40",
        "description": "Describes what ratio of dead keys to total keys in a file will\ncause it to be included in the merge. The value of this setting is\na percentage (0-100). For example, if a data file contains 4 dead\nkeys and 6 live keys, it will be included in the merge at the\ndefault ratio. Increasing the value will cause fewer files to be\nmerged, decreasing the value will cause more files to be merged.\nDefault is: `40`",
        "example": "",
        "internal_key": "bitcask.frag_threshold",
        "valid": "an integer"
    },
    "bitcask.merge.thresholds.small_file": {
        "default": "10MB",
        "description": "Describes the minimum size a file must have to be _excluded_\nfrom the merge. Files smaller than the threshold will be\nincluded. Increasing the value will cause _more_ files to be\nmerged, decreasing the value will cause _fewer_ files to be merged.\nDefault is: 10MB",
        "example": "",
        "internal_key": "bitcask.small_file_threshold",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "bitcask.merge.triggers.dead_bytes": {
        "default": "512MB",
        "description": "Describes how much data stored for dead keys in a single file\nwill trigger merging. The value is in bytes. If a file meets or\nexceeds the trigger value for dead bytes, merge will be\ntriggered. Increasing the value will cause merging to occur less\noften, whereas decreasing the value will cause merging to happen\nmore often.\nWhen either of these constraints are met by any file in the\ndirectory, Bitcask will attempt to merge files.\nDefault is: 512MB",
        "example": "",
        "internal_key": "bitcask.dead_bytes_merge_trigger",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "bitcask.merge.triggers.fragmentation": {
        "default": "60",
        "description": "Describes what ratio of dead keys to total keys in a file will\ntrigger merging. The value of this setting is a percentage\n(0-100). For example, if a data file contains 6 dead keys and 4\nlive keys, then merge will be triggered at the default\nsetting. Increasing this value will cause merging to occur less\noften, whereas decreasing the value will cause merging to happen\nmore often.\nDefault is: `60`",
        "example": "",
        "internal_key": "bitcask.frag_merge_trigger",
        "valid": "an integer"
    },
    "bitcask.merge.window.end": {
        "default": "23",
        "description": "Lets you specify when during the day merge operations are\nallowed to be triggered. Valid options are:\n* `always` (default) No restrictions\n* `never` Merge will never be attempted\n* `window` Hours during which merging is permitted, where\n`bitcask.merge.window.start` and `bitcask.merge.window.end` are\nintegers between 0 and 23.\nIf merging has a significant impact on performance of your cluster,\nor your cluster has quiet periods in which little storage activity\noccurs, you may want to change this setting from the default.",
        "example": "",
        "internal_key": "bitcask.merge_window",
        "valid": "an integer"
    },
    "bitcask.merge.window.start": {
        "default": "0",
        "description": "Lets you specify when during the day merge operations are\nallowed to be triggered. Valid options are:\n* `always` (default) No restrictions\n* `never` Merge will never be attempted\n* `window` Hours during which merging is permitted, where\n`bitcask.merge.window.start` and `bitcask.merge.window.end` are\nintegers between 0 and 23.\nIf merging has a significant impact on performance of your cluster,\nor your cluster has quiet periods in which little storage activity\noccurs, you may want to change this setting from the default.",
        "example": "",
        "internal_key": "bitcask.merge_window",
        "valid": "an integer"
    },
    "bitcask.merge_check_interval": {
        "default": "3m",
        "description": "Time in between the checks that trigger Bitcask merges.",
        "example": "",
        "internal_key": "riak_kv.bitcask_merge_check_interval",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "bitcask.merge_check_jitter": {
        "default": "30%",
        "description": "Jitter used to randomize the time in between the checks that trigger\nBitcask merges.",
        "example": "",
        "internal_key": "riak_kv.bitcask_merge_check_jitter",
        "valid": "text"
    },
    "bitcask.open_timeout": {
        "default": "4s",
        "description": "Specifies the maximum time Bitcask will block on startup while\nattempting to create or open the data directory. You generally need\nnot change this value. If for some reason the timeout is exceeded\non open you'll see a log message of the form: \"Failed to start\nbitcask backend: .... \" Only then should you consider a longer\ntimeout.",
        "example": "",
        "internal_key": "bitcask.open_timeout",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "bitcask.sync.strategy": {
        "default": "none",
        "description": "Changes the durability of writes by specifying when to\nsynchronize data to disk. The default setting protects against data\nloss in the event of application failure (process death) but leaves\nopen a small window wherein data could be lost in the event of\ncomplete system failure (e.g. hardware, O/S, power).\nThe default mode, `none`, writes data into operating system buffers\nwhich which will be written to the disks when those buffers are\nflushed by the operating system. If the system fails (power loss,\ncrash, etc.) before before those buffers are flushed to stable\nstorage that data is lost.\nThis is prevented by the setting `o_sync` which forces the\noperating system to flush to stable storage at every write. The\neffect of flushing each write is better durability, however write\nthroughput will suffer as each write will have to wait for the\nwrite to complete.\nAvailable Sync Strategies:\n* `none` - (default) Lets the operating system manage syncing\nwrites.\n* `o_sync` - Uses the O_SYNC flag which forces syncs on every\nwrite.\n* `interval` - Riak will force Bitcask to sync every\n`bitcask.sync.interval` seconds.",
        "example": "",
        "internal_key": "bitcask.sync_strategy",
        "valid": ["none", "o_sync", "interval"]
    },
    "buckets.default.allow_mult": {
        "default": "false",
        "description": "Whether or not siblings are allowed, by default, for untyped buckets.\nNote: See Vector Clocks for a discussion of sibling resolution.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.allow_mult",
        "valid": [true, false]
    },
    "buckets.default.basic_quorum": {
        "default": "false",
        "description": "Whether not-founds will invoke the \"basic quorum\"\noptimization. This setting will short-circuit fetches where the\nmajority of replicas report that the key is not found. Only used\nwhen notfound_ok = false.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.basic_quorum",
        "valid": [true, false]
    },
    "buckets.default.dw": {
        "default": "quorum",
        "description": "The number of replicas which must reply to a write request,\nindicating that the write was committed to durable storage.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.dw",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "buckets.default.last_write_wins": {
        "default": "false",
        "description": "Whether conflicting writes resolve via timestamp.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.last_write_wins",
        "valid": [true, false]
    },
    "buckets.default.merge_strategy": {
        "default": "1",
        "description": "The strategy used when merging objects that potentially have\nconflicts.\n* 2: Riak 2.0 typed bucket default - reduces sibling creation through additional\nmetadata on each sibling (also known as dotted version vectors)\n* 1: Riak 1.4, default buckets, and earlier default - may duplicate siblings\nfrom interleaved writes (sibling explosion.)",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.dvv_enabled",
        "valid": ["1", "2"]
    },
    "buckets.default.n_val": {
        "default": "3",
        "description": "The number of replicas stored. Note: See Replication\nProperties for further discussion.\nhttp://docs.basho.com/riak/latest/dev/advanced/cap-controls/",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.n_val",
        "valid": "an integer"
    },
    "buckets.default.notfound_ok": {
        "default": "true",
        "description": "Whether not-founds will count toward a quorum of reads.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.notfound_ok",
        "valid": [true, false]
    },
    "buckets.default.pr": {
        "default": "0",
        "description": "The number of primary replicas (non-fallback) that must reply\nto a read request.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.pr",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "buckets.default.pw": {
        "default": "0",
        "description": "The number of primary replicas (non-fallback) which must reply\nto a write request.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.pw",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "buckets.default.r": {
        "default": "quorum",
        "description": "The number of replicas which must reply to a read request.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.r",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "buckets.default.rw": {
        "default": "quorum",
        "description": "The number of replicas which must reply to a delete request.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.rw",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "buckets.default.w": {
        "default": "quorum",
        "description": "The number of replicas which must reply to a write request,\nindicating that the write was received.",
        "example": "",
        "internal_key": "riak_core.default_bucket_props.w",
        "valid": "an integer, or a symbolic quorum value (one of: 'quorum', 'all')"
    },
    "check_crl": {
        "default": "on",
        "description": "Whether to check the CRL of a client certificate. This defaults to\non but some CAs may not maintain or define a CRL, so this can be disabled\nif no CRL is available.",
        "example": "",
        "internal_key": "riak_api.check_crl",
        "valid": ["on", "off"]
    },
    "datatypes.compression_level": {
        "default": "1",
        "description": "Whether serialized datatypes will use compression, and at what\nlevel. When an integer, this refers to the aggressiveness (and\nslowness) of compression, on a scale from 0 to 9. 'on' is\nequivalent to 6, 'off' is equivalent to 0.",
        "example": "",
        "internal_key": "riak_dt.binary_compression",
        "valid": "an integer"
    },
    "distributed_cookie": {
        "default": "riak",
        "description": "Cookie for distributed node communication. All nodes in the\nsame cluster should use the same cookie or they will not be able to\ncommunicate.",
        "example": "riak",
        "internal_key": "vm_args.-setcookie",
        "valid": "text"
    },
    "dtrace": {
        "default": "off",
        "description": "DTrace support Do not enable 'dtrace' unless your Erlang/OTP\nruntime is compiled to support DTrace. DTrace is available in\nR15B01 (supported by the Erlang/OTP official source package) and in\nR14B04 via a custom source repository & branch.",
        "example": "off",
        "internal_key": "riak_core.dtrace_support",
        "valid": ["on", "off"]
    },
    "erlang.K": {
        "default": "on",
        "description": "Enables or disables the kernel poll functionality if the\nemulator supports it. If the emulator does not support kernel poll,\nand the K flag is passed to the emulator, a warning is issued at\nstartup.\nSimilar information at: http://erlang.org/doc/man/erl.html",
        "example": "",
        "internal_key": "vm_args.+K",
        "valid": ["on", "off"]
    },
    "erlang.W": {
        "default": "w",
        "description": "Sets the mapping of warning messages for error_logger.\nMessages sent to the error logger using one of the warning\nroutines can be mapped either to errors (default), warnings\n(w - default), or info reports (i).",
        "example": "",
        "internal_key": "vm_args.+W",
        "valid": "text"
    },
    "erlang.async_threads": {
        "default": "64",
        "description": "Sets the number of threads in async thread pool, valid range\nis 0-1024. If thread support is available, the default is 64.\nMore information at: http://erlang.org/doc/man/erl.html",
        "example": "64",
        "internal_key": "vm_args.+A",
        "valid": "an integer"
    },
    "erlang.crash_dump": {
        "default": "./log/erl_crash.dump",
        "description": "Set the location of crash dumps",
        "example": "",
        "internal_key": "vm_args.-env ERL_CRASH_DUMP",
        "valid": "the path to a file"
    },
    "erlang.distribution_buffer_size": {
        "default": "32MB",
        "description": "For nodes with many busy_dist_port events, Basho recommends\nraising the sender-side network distribution buffer size.\n32MB may not be sufficient for some workloads and is a suggested\nstarting point. Erlangers may know this as +zdbbl.\nThe Erlang/OTP default is 1024 (1 megabyte).\nSee: http://www.erlang.org/doc/man/erl.html#%2bzdbbl",
        "example": "",
        "internal_key": "vm_args.+zdbbl",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "erlang.fullsweep_after": {
        "default": "0",
        "description": "A non-negative integer which indicates how many times\ngenerational garbage collections can be done without forcing a\nfullsweep collection. In low-memory systems (especially without\nvirtual memory), setting the value to 0 can help to conserve\nmemory.\nMore information at:\nhttp://www.erlang.org/doc/man/erlang.html#system_flag-2",
        "example": "",
        "internal_key": "vm_args.-env ERL_FULLSWEEP_AFTER",
        "valid": "an integer"
    },
    "erlang.max_ets_tables": {
        "default": "256000",
        "description": "Raise the ETS table limit",
        "example": "",
        "internal_key": "vm_args.+e",
        "valid": "an integer"
    },
    "erlang.max_ports": {
        "default": "65536",
        "description": "The number of concurrent ports/sockets\nValid range is 1024-134217727",
        "example": "65536",
        "internal_key": "vm_args.+Q",
        "valid": "an integer"
    },
    "erlang.process_limit": {
        "default": "256000",
        "description": "Raise the default erlang process limit",
        "example": "",
        "internal_key": "vm_args.+P",
        "valid": "an integer"
    },
    "erlang.schedulers.compaction_of_load": {
        "default": "false",
        "description": "Enable or disable scheduler compaction of load. By default\nscheduler compaction of load is enabled. When enabled, load\nbalancing will strive for a load distribution which causes as many\nscheduler threads as possible to be fully loaded (i.e., not run out\nof work). This is accomplished by migrating load (e.g. runnable\nprocesses) into a smaller set of schedulers when schedulers\nfrequently run out of work. When disabled, the frequency with which\nschedulers run out of work will not be taken into account by the\nload balancing logic.\nMore information: http://www.erlang.org/doc/man/erl.html#+scl",
        "example": "",
        "internal_key": "vm_args.+scl",
        "valid": [true, false]
    },
    "erlang.schedulers.force_wakeup_interval": {
        "default": "500",
        "description": "Set scheduler forced wakeup interval. All run queues will be\nscanned each Interval milliseconds. While there are sleeping\nschedulers in the system, one scheduler will be woken for each\nnon-empty run queue found. An Interval of zero disables this\nfeature, which also is the default.\nThis feature is a workaround for lengthy executing native code, and\nnative code that do not bump reductions properly.\nMore information: http://www.erlang.org/doc/man/erl.html#+sfwi",
        "example": "",
        "internal_key": "vm_args.+sfwi",
        "valid": "an integer"
    },
    "erlang.smp": {
        "default": "enable",
        "description": "Starts the Erlang runtime system with SMP support\nenabled. This may fail if no runtime system with SMP support is\navailable. The 'auto' setting starts the Erlang runtime system with\nSMP support enabled if it is available and more than one logical\nprocessor are detected. -smp disable starts a runtime system\nwithout SMP support.\nNOTE: The runtime system with SMP support will not be available on\nall supported platforms. See also the erlang.schedulers settings.\nNOTE: Some native extensions (NIFs) require use of the SMP\nemulator.\nMore information at: http://erlang.org/doc/man/erl.html",
        "example": "",
        "internal_key": "vm_args.-smp",
        "valid": ["enable", "auto", "disable"]
    },
    "handoff.inbound": {
        "default": "on",
        "description": "Enables/disables inbound handoff transfers for this node. If you\nturn this setting off at runtime with riak-admin, it will kill any\ninbound handoffs currently running.",
        "example": "",
        "internal_key": "riak_core.disable_inbound_handoff",
        "valid": ["on", "off"]
    },
    "handoff.ip": {
        "default": "127.0.0.1",
        "description": "handoff.ip is the network address that Riak binds to for\nintra-cluster data handoff.",
        "example": "",
        "internal_key": "riak_core.handoff_ip",
        "valid": "text"
    },
    "handoff.max_rejects": {
        "default": "6",
        "description": "The maximum number of times that a secondary system like Riak\nSearch 2.0 can block handoff of primary key-value data. The\napproximate maximum duration handoff of a vnode can be blocked for\ncan be determined by multiplying this number by the value of\n\"vnode_management_timer\". To prevent handoff from ever being\nblocked by a secondary system set this value to 0.\nSee also:\n    vnode_management_timer",
        "example": "",
        "internal_key": "riak_kv.handoff_rejected_max",
        "valid": "an integer"
    },
    "handoff.outbound": {
        "default": "on",
        "description": "Enables/disables outbound handoff transfers for this node. If you\nturn this setting off at runtime with riak-admin, it will kill any\noutbound handoffs currently running.",
        "example": "",
        "internal_key": "riak_core.disable_outbound_handoff",
        "valid": ["on", "off"]
    },
    "handoff.port": {
        "default": "8099",
        "description": "handoff.port is the TCP port that Riak uses for\nintra-cluster data handoff.",
        "example": "",
        "internal_key": "riak_core.handoff_port",
        "valid": "an integer"
    },
    "handoff.use_background_manager": {
        "default": "off",
        "description": "Whether to use the background manager to limit KV handoff.\nThis will help to prevent system response degradation under times\nof heavy load from multiple background tasks that contend for the\nsame resources.\nSee also:\n    background_manager",
        "example": "",
        "internal_key": "riak_kv.handoff_use_background_manager",
        "valid": ["on", "off"]
    },
    "honor_cipher_order": {
        "default": "on",
        "description": "Whether to prefer the order in which the server lists its\nciphers. When set to 'off', the client's preferred cipher order\ndictates which cipher is chosen.",
        "example": "",
        "internal_key": "riak_api.honor_cipher_order",
        "valid": ["on", "off"]
    },
    "javascript.hook_pool_size": {
        "default": "2",
        "description": "How many JavaScript virtual machines are available for\nexecuting pre-commit hook functions.",
        "example": "",
        "internal_key": "riak_kv.hook_js_vm_count",
        "valid": "an integer"
    },
    "javascript.map_pool_size": {
        "default": "8",
        "description": "How many JavaScript virtual machines are available for\nexecuting map functions.",
        "example": "",
        "internal_key": "riak_kv.map_js_vm_count",
        "valid": "an integer"
    },
    "javascript.maximum_heap_size": {
        "default": "8MB",
        "description": "The maximum amount of memory allocated to each JavaScript\nvirtual machine.",
        "example": "",
        "internal_key": "riak_kv.js_max_vm_mem",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "javascript.maximum_stack_size": {
        "default": "16MB",
        "description": "The maximum amount of thread stack memory to allocate\nto each JavaScript virtual machine.",
        "example": "",
        "internal_key": "riak_kv.js_thread_stack",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "javascript.reduce_pool_size": {
        "default": "6",
        "description": "How many JavaScript virtual machines are available for\nexecuting reduce functions.",
        "example": "",
        "internal_key": "riak_kv.reduce_js_vm_count",
        "valid": "an integer"
    },
    "leveldb.block.restart_interval": {
        "default": "16",
        "description": "Defines the key count threshold for a new key entry in the key\nindex for a block. Most deployments should leave this parameter\nalone.",
        "example": "",
        "internal_key": "eleveldb.block_restart_interval",
        "valid": "an integer"
    },
    "leveldb.block.size": {
        "default": "4KB",
        "description": "Defines the size threshold for a block / chunk of data within\none .sst table file. Each new block gets an index entry in the .sst\ntable file's master index.",
        "example": "",
        "internal_key": "eleveldb.sst_block_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "leveldb.block.size_steps": {
        "default": "16",
        "description": "Defines the number of incremental adjustments to attempt\nbetween the block.size value and the maximum block.size for an .sst\ntable file. Value of zero disables the underlying dynamic\nblock_size feature.\nSee also:\n    leveldb.block.size",
        "example": "",
        "internal_key": "eleveldb.block_size_steps",
        "valid": "an integer"
    },
    "leveldb.block_cache_threshold": {
        "default": "32MB",
        "description": "Defines the limit where block cache memory can no longer be\nreleased in favor of the page cache. This has no impact with\nregard to release in favor of file cache. The value is per\nvnode.",
        "example": "",
        "internal_key": "eleveldb.block_cache_threshold",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "leveldb.bloomfilter": {
        "default": "on",
        "description": "Each database .sst table file can include an optional \"bloom\nfilter\" that is highly effective in shortcutting data queries that\nare destined to not find the requested key. The Bloom filter\ntypically increases the size of an .sst table file by about\n2%.",
        "example": "",
        "internal_key": "eleveldb.use_bloomfilter",
        "valid": ["on", "off"]
    },
    "leveldb.compaction.trigger.tombstone_count": {
        "default": "1000",
        "description": "Controls when a background compaction initiates solely\ndue to the number of delete tombstones within an individual\n.sst table file. Value of 'off' disables the feature.",
        "example": "",
        "internal_key": "eleveldb.delete_threshold",
        "valid": "an integer"
    },
    "leveldb.compression": {
        "default": "on",
        "description": "Enables or disables the compression of data on disk.\nEnabling (default) saves disk space. Disabling may reduce read\nlatency but increase overall disk activity. Option can be\nchanged at any time, but will not impact data on disk until\nnext time a file requires compaction.",
        "example": "",
        "internal_key": "eleveldb.compression",
        "valid": ["on", "off"]
    },
    "leveldb.data_root": {
        "default": "$(platform_data_dir)/leveldb",
        "description": "Where LevelDB will store its data.",
        "example": "",
        "internal_key": "eleveldb.data_root",
        "valid": "the path to a directory"
    },
    "leveldb.fadvise_willneed": {
        "default": "false",
        "description": "Option to override LevelDB's use of fadvise(DONTNEED) with\nfadvise(WILLNEED) instead. WILLNEED can reduce disk activity on\nsystems where physical memory exceeds the database size.",
        "example": "",
        "internal_key": "eleveldb.fadvise_willneed",
        "valid": [true, false]
    },
    "leveldb.limited_developer_mem": {
        "default": "off",
        "description": "limited_developer_mem is a Riak specific option that is used\nwhen a developer is testing a high number of vnodes and/or several\nVMs on a machine with limited physical memory. Do NOT use this\noption if making performance measurements. This option overwrites\nvalues given to write_buffer_size_min and write_buffer_size_max.",
        "example": "",
        "internal_key": "eleveldb.limited_developer_mem",
        "valid": ["on", "off"]
    },
    "leveldb.maximum_memory.percent": {
        "default": "70",
        "description": "This parameter defines the percentage of total server memory\nto assign to LevelDB. LevelDB will dynamically adjust its internal\ncache sizes to stay within this size. The memory size can\nalternately be assigned as a byte count via leveldb.maximum_memory\ninstead.\nSee also:\n    leveldb.maximum_memory",
        "example": "70",
        "internal_key": "eleveldb.total_leveldb_mem_percent",
        "valid": "an integer"
    },
    "leveldb.sync_on_write": {
        "default": "off",
        "description": "Whether LevelDB will flush after every write. Note: If you are\nfamiliar with fsync, this is analagous to calling fsync after every\nwrite.",
        "example": "",
        "internal_key": "eleveldb.sync",
        "valid": ["on", "off"]
    },
    "leveldb.threads": {
        "default": "71",
        "description": "The number of worker threads performing LevelDB operations.",
        "example": "",
        "internal_key": "eleveldb.eleveldb_threads",
        "valid": "an integer"
    },
    "leveldb.tiered": {
        "default": "off",
        "description": "leveldb can be configured to use different mounts for\ndifferent levels. This tiered option defaults to off, but you can\nconfigure it to trigger at levels 1-6. If you do this, anything\nstored at the chosen level or greater will be stored on\nleveldb.tiered.mounts.slow, while everything at the levels below will\nbe stored on leveldb.tiered.mounts.fast\nLevels 3 or 4 are recommended settings.\nWARNING: There is no dynamic reallocation of leveldb\ndata across mounts. If you change this setting without manually\nmoving the level files to the correct mounts, leveldb will act in\nan unexpected state.\nSee also:\n    leveldb.tiered.mounts.fast\n    leveldb.tiered.mounts.slow",
        "example": "",
        "internal_key": "eleveldb.tiered_slow_level",
        "valid": "an integer, or the string \"off\""
    },
    "leveldb.verify_checksums": {
        "default": "on",
        "description": "Enables or disables the verification of the data fetched from\nLevelDB against internal checksums.",
        "example": "",
        "internal_key": "eleveldb.verify_checksums",
        "valid": ["on", "off"]
    },
    "leveldb.verify_compaction": {
        "default": "on",
        "description": "Enables or disables the verification of LevelDB data during\ncompaction.",
        "example": "",
        "internal_key": "eleveldb.verify_compaction",
        "valid": ["on", "off"]
    },
    "leveldb.write_buffer_size_max": {
        "default": "60MB",
        "description": "Each vnode first stores new key/value data in a memory based\nwrite buffer. This write buffer is in parallel to the recovery log\nmentioned in the \"sync\" parameter. Riak creates each vnode with a\nrandomly sized write buffer for performance reasons. The random\nsize is somewhere between write_buffer_size_min and\nwrite_buffer_size_max.",
        "example": "",
        "internal_key": "eleveldb.write_buffer_size_max",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "leveldb.write_buffer_size_min": {
        "default": "30MB",
        "description": "Each vnode first stores new key/value data in a memory based\nwrite buffer. This write buffer is in parallel to the recovery log\nmentioned in the \"sync\" parameter. Riak creates each vnode with a\nrandomly sized write buffer for performance reasons. The random\nsize is somewhere between write_buffer_size_min and\nwrite_buffer_size_max.\nSee also:\n    leveldb.sync",
        "example": "",
        "internal_key": "eleveldb.write_buffer_size_min",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "listener.http.internal": {
        "default": "127.0.0.1:8098",
        "description": "listener.http.<name> is an IP address and TCP port that the Riak\nHTTP interface will bind.",
        "example": "0.0.0.0:8098",
        "internal_key": "riak_api.http",
        "valid": "an IP/port pair, e.g. 127.0.0.1:10011"
    },
    "listener.protobuf.internal": {
        "default": "127.0.0.1:8087",
        "description": "listener.protobuf.<name> is an IP address and TCP port that the Riak\nProtocol Buffers interface will bind.",
        "example": "0.0.0.0:8087",
        "internal_key": "riak_api.pb",
        "valid": "an IP/port pair, e.g. 127.0.0.1:10011"
    },
    "log.console": {
        "default": "file",
        "description": "Where to emit the default log messages (typically at 'info'\nseverity):\noff: disabled\nfile: the file specified by log.console.file\nconsole: to standard output (seen when using `riak attach-direct`)\nboth: log.console.file and standard out.",
        "example": "file",
        "internal_key": "lager.handlers",
        "valid": ["off", "file", "console", "both"]
    },
    "log.console.file": {
        "default": "$(platform_log_dir)/console.log",
        "description": "When 'log.console' is set to 'file' or 'both', the file where\nconsole messages will be logged.",
        "example": "$(platform_log_dir)/console.log",
        "internal_key": "lager.handlers",
        "valid": "the path to a file"
    },
    "log.console.level": {
        "default": "info",
        "description": "The severity level of the console log, default is 'info'.",
        "example": "info",
        "internal_key": "lager.handlers",
        "valid": ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency", "none"]
    },
    "log.crash": {
        "default": "on",
        "description": "Whether to enable the crash log.",
        "example": "on",
        "internal_key": "lager.crash_log",
        "valid": ["on", "off"]
    },
    "log.crash.file": {
        "default": "$(platform_log_dir)/crash.log",
        "description": "If the crash log is enabled, the file where its messages will\nbe written.",
        "example": "$(platform_log_dir)/crash.log",
        "internal_key": "lager.crash_log",
        "valid": "the path to a file"
    },
    "log.crash.maximum_message_size": {
        "default": "64KB",
        "description": "Maximum size in bytes of individual messages in the crash log",
        "example": "64KB",
        "internal_key": "lager.crash_log_msg_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "log.crash.rotation": {
        "default": "$D0",
        "description": "The schedule on which to rotate the crash log. For more\ninformation see:\nhttps://github.com/basho/lager/blob/master/README.md#internal-log-rotation",
        "example": "$D0",
        "internal_key": "lager.crash_log_date",
        "valid": "text"
    },
    "log.crash.rotation.keep": {
        "default": "5",
        "description": "The number of rotated crash logs to keep. When set to\n'current', only the current open log file is kept.",
        "example": "5",
        "internal_key": "lager.crash_log_count",
        "valid": "an integer"
    },
    "log.crash.size": {
        "default": "10MB",
        "description": "Maximum size of the crash log in bytes, before it is rotated",
        "example": "10MB",
        "internal_key": "lager.crash_log_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "log.error.file": {
        "default": "$(platform_log_dir)/error.log",
        "description": "The file where error messages will be logged.",
        "example": "$(platform_log_dir)/error.log",
        "internal_key": "lager.handlers",
        "valid": "the path to a file"
    },
    "log.error.messages_per_second": {
        "default": "100",
        "description": "Maximum number of error_logger messages to handle in a second",
        "example": "",
        "internal_key": "lager.error_logger_hwm",
        "valid": "an integer"
    },
    "log.error.redirect": {
        "default": "on",
        "description": "Whether to redirect error_logger messages into lager -\ndefaults to true",
        "example": "",
        "internal_key": "lager.error_logger_redirect",
        "valid": ["on", "off"]
    },
    "log.syslog": {
        "default": "off",
        "description": "When set to 'on', enables log output to syslog.",
        "example": "off",
        "internal_key": "lager.handlers",
        "valid": ["on", "off"]
    },
    "log.syslog.facility": {
        "default": "daemon",
        "description": "Syslog facility to log entries from Riak.",
        "example": "",
        "internal_key": "lager.handlers",
        "valid": ["kern", "user", "mail", "daemon", "auth", "syslog", "lpr",
            "news", "uucp", "clock", "authpriv", "ftp", "cron", "local0", "local1",
            "local2", "local3", "local4", "local5", "local6", "local7"]
    },
    "log.syslog.ident": {
        "default": "riak",
        "description": "When set to 'on', enables log output to syslog.",
        "example": "",
        "internal_key": "lager.handlers",
        "valid": "text"
    },
    "log.syslog.level": {
        "default": "info",
        "description": "The severity level at which to log entries to syslog, default is 'info'.",
        "example": "",
        "internal_key": "lager.handlers",
        "valid": ["debug", "info", "notice", "warning", "error", "critical",
            "alert", "emergency", "none"]
    },
    "max_concurrent_requests": {
        "default": "50000",
        "description": "The maximum number of concurrent requests of each type (get or\nput) that is allowed. Setting this value to infinite disables\noverload protection. The 'erlang.process_limit' should be at least\n3 times more than this setting.\nSee also:\n    erlang.process_limit",
        "example": "",
        "internal_key": "riak_kv.fsm_limit",
        "valid": "an integer"
    },
    "metadata_cache_size": {
        "default": "off",
        "description": "Controls the size of the metadata cache for each vnode. Set to\n'off' to disable the cache. This shouldn't be necessary on-disk\nbased backends, but can help performance in some cases (i.e. memory\nbackend, data fits in block cache, etc). Note that this is the size\nof the ETS table, rather than the actual data, to keep the size\ncalculation simple, thus more space may be used than the simple\nsize * vnode_count calculation would imply.\nCaution: Do not use without extensive benchmarking.\ndisabled by default, 256KB is a reasonable value",
        "example": "",
        "internal_key": "riak_kv.vnode_md_cache_size",
        "valid": "a byte size with units, e.g. 10GB, or the string \"off\""
    },
    "nodename": {
        "default": "riak@127.0.0.1",
        "description": "Name of the Erlang node",
        "example": "riak@127.0.0.1",
        "internal_key": "vm_args.-name",
        "valid": "text"
    },
    "object.format": {
        "default": "1",
        "description": "Controls which binary representation of a riak value is stored\non disk.\n* 0: Original erlang:term_to_binary format. Higher space overhead. (Obsolete)\n* 1: New format for more compact storage of small values.",
        "example": "1",
        "internal_key": "riak_kv.object_format",
        "valid": ["0", "1"]
    },
    "object.siblings.maximum": {
        "default": "100",
        "description": "Writing an object with more than this number of siblings will\nsend a failure to the client.",
        "example": "100",
        "internal_key": "riak_kv.max_siblings",
        "valid": "an integer"
    },
    "object.siblings.warning_threshold": {
        "default": "25",
        "description": "Writing an object with more than this number of siblings will\ngenerate a warning in the logs.",
        "example": "25",
        "internal_key": "riak_kv.warn_siblings",
        "valid": "an integer"
    },
    "object.size.maximum": {
        "default": "50MB",
        "description": "Writing an object bigger than this will send a failure to the\nclient.",
        "example": "50MB",
        "internal_key": "riak_kv.max_object_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "object.size.warning_threshold": {
        "default": "5MB",
        "description": "Reading or writing objects bigger than this size will write a\nwarning in the logs.",
        "example": "5MB",
        "internal_key": "riak_kv.warn_object_size",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "platform_bin_dir": {
        "default": "./bin",
        "description": "Platform-specific installation paths (substituted by rebar)",
        "example": "./bin",
        "internal_key": "riak_core.platform_bin_dir",
        "valid": "the path to a directory"
    },
    "platform_data_dir": {
        "default": "./data",
        "description": "Platform-specific installation paths (substituted by rebar)",
        "example": "./data",
        "internal_key": "riak_core.platform_data_dir",
        "valid": "the path to a directory"
    },
    "platform_etc_dir": {
        "default": "./etc",
        "description": "Platform-specific installation paths (substituted by rebar)",
        "example": "./etc",
        "internal_key": "riak_core.platform_etc_dir",
        "valid": "the path to a directory"
    },
    "platform_lib_dir": {
        "default": "./lib",
        "description": "Platform-specific installation paths (substituted by rebar)",
        "example": "./lib",
        "internal_key": "riak_core.platform_lib_dir",
        "valid": "the path to a directory"
    },
    "platform_log_dir": {
        "default": "./log",
        "description": "Platform-specific installation paths (substituted by rebar)",
        "example": "./log",
        "internal_key": "riak_core.platform_log_dir",
        "valid": "the path to a directory"
    },
    "protobuf.backlog": {
        "default": "128",
        "description": "The maximum length to which the queue of pending connections\nmay grow. If set, it must be an integer > 0. If you anticipate a\nhuge number of connections being initialized *simultaneously*, set\nthis number higher.",
        "example": "",
        "internal_key": "riak_api.pb_backlog",
        "valid": "an integer"
    },
    "protobuf.nagle": {
        "default": "off",
        "description": "Turns off Nagle's algorithm for Protocol Buffers\nconnections. This is equivalent to setting the TCP_NODELAY option\non the socket.",
        "example": "",
        "internal_key": "riak_api.disable_pb_nagle",
        "valid": ["on", "off"]
    },
    "retry_put_coordinator_failure": {
        "default": "on",
        "description": "If forwarding to a replica-local coordinator on PUT fails,\nthis setting will retry the operation when set to 'on'.\n* on = Riak 2.0 behavior (strongly recommended)\n* off = Riak 1.x behavior",
        "example": "",
        "internal_key": "riak_kv.retry_put_coordinator_failure",
        "valid": ["on", "off"]
    },
    "riak_control": {
        "default": "off",
        "description": "Set to 'off' to disable the admin panel.",
        "example": "off",
        "internal_key": "riak_control.enabled",
        "valid": ["on", "off"]
    },
    "riak_control.auth.mode": {
        "default": "off",
        "description": "Authentication mode used for access to the admin panel.",
        "example": "off",
        "internal_key": "riak_control.auth",
        "valid": ["off", "userlist"]
    },
    "ring.state_dir": {
        "default": "$(platform_data_dir)/ring",
        "description": "Default location of ringstate",
        "example": "",
        "internal_key": "riak_core.ring_state_dir",
        "valid": "the path to a directory"
    },
    "ring_size": {
        "default": "64",
        "description": "Number of partitions in the cluster (only valid when first\ncreating the cluster). Must be a power of 2, minimum 8 and maximum\n1024.",
        "example": "128",
        "internal_key": "riak_core.ring_creation_size",
        "valid": "an integer"
    },
    "runtime_health.thresholds.busy_ports": {
        "default": "2",
        "description": "The threshold at which to warn about the number of ports that\nare overly busy. Ports with full input buffers count toward this\nthreshold.",
        "example": "",
        "internal_key": "riak_sysmon.port_limit",
        "valid": "an integer"
    },
    "runtime_health.thresholds.busy_processes": {
        "default": "30",
        "description": "The threshold at which to warn about the number of processes\nthat are overly busy. Processes with large heaps or that take a\nlong time to garbage collect will count toward this threshold.",
        "example": "",
        "internal_key": "riak_sysmon.process_limit",
        "valid": "an integer"
    },
    "runtime_health.triggers.distribution_port": {
        "default": "on",
        "description": "Whether distribution ports with full input buffers will be\ncounted as busy. Distribution ports connect Riak nodes within a\nsingle cluster.\nSee also:\n    runtime_health.thresholds.busy_ports",
        "example": "",
        "internal_key": "riak_sysmon.busy_dist_port",
        "valid": ["on", "off"]
    },
    "runtime_health.triggers.port": {
        "default": "on",
        "description": "Whether ports with full input buffers will be counted as\nbusy. Ports can represent open files or network sockets.\nSee also:\n    runtime_health.thresholds.busy_ports",
        "example": "",
        "internal_key": "riak_sysmon.busy_port",
        "valid": ["on", "off"]
    },
    "runtime_health.triggers.process.garbage_collection": {
        "default": "off",
        "description": "A process will become busy when it exceeds this amount of time\ndoing garbage collection.\nNOTE: Enabling this setting can cause performance problems on\nmulti-core systems.\nSee also:\n    runtime_health.thresholds.busy_processes",
        "example": "",
        "internal_key": "riak_sysmon.gc_ms_limit",
        "valid": "the text 'off', or a time duration with units, e.g. '10s' for 10 seconds"
    },
    "runtime_health.triggers.process.heap_size": {
        "default": "160444000",
        "description": "A process will become busy when its heap exceeds this size.\nSee also:\n    runtime_health.thresholds.busy_processes",
        "example": "",
        "internal_key": "riak_sysmon.heap_word_limit",
        "valid": "a byte size with units, e.g. 10GB"
    },
    "runtime_health.triggers.process.long_schedule": {
        "default": "off",
        "description": "A process will become busy when it exceeds this amount of time\nduring a single process scheduling & execution cycle.",
        "example": "",
        "internal_key": "riak_sysmon.schedule_ms_limit",
        "valid": "the text 'off', or a time duration with units, e.g. '10s' for 10 seconds"
    },
    "sasl": {
        "default": "off",
        "description": "Whether to enable Erlang's built-in error logger.",
        "example": "",
        "internal_key": "sasl.sasl_error_logger",
        "valid": ["on", "off"]
    },
    "search": {
        "default": "off",
        "description": "To enable Search set this 'on'.",
        "example": "on",
        "internal_key": "yokozuna.enabled",
        "valid": ["on", "off"]
    },
    "search.anti_entropy.data_dir": {
        "default": "$(platform_data_dir)/yz_anti_entropy",
        "description": "The directory where Search's Active Anti-Entropy data files\nare stored",
        "example": "",
        "internal_key": "yokozuna.anti_entropy_data_dir",
        "valid": "the path to a directory"
    },
    "search.root_dir": {
        "default": "$(platform_data_dir)/yz",
        "description": "The root directory for Search, under which index data and\nconfiguration is stored.",
        "example": "",
        "internal_key": "yokozuna.root_dir",
        "valid": "the path to a directory"
    },
    "search.solr.jmx_port": {
        "default": "8985",
        "description": "The port number which Solr JMX binds to.\nNOTE: Binds on every interface.",
        "example": "8985",
        "internal_key": "yokozuna.solr_jmx_port",
        "valid": "an integer"
    },
    "search.solr.jvm_options": {
        "default": "-d64 -Xms1g -Xmx1g -XX:+UseStringCache -XX:+UseCompressedOops",
        "description": "The options to pass to the Solr JVM. Non-standard options,\ni.e. -XX, may not be portable across JVM implementations.\nE.g. -XX:+UseCompressedStrings",
        "example": "-d64 -Xms1g -Xmx1g -XX:+UseStringCache -XX:+UseCompressedOops",
        "internal_key": "yokozuna.solr_jvm_opts",
        "valid": "text"
    },
    "search.solr.port": {
        "default": "8093",
        "description": "The port number which Solr binds to.\nNOTE: Binds on every interface.",
        "example": "8093",
        "internal_key": "yokozuna.solr_port",
        "valid": "an integer"
    },
    "search.solr.start_timeout": {
        "default": "30s",
        "description": "How long Riak will wait for Solr to start. The start sequence\nwill be tried twice. If both attempts timeout, then the Riak node\nwill be shutdown. This may need to be increased as more data is\nindexed and Solr takes longer to start. Values lower than 1s will\nbe rounded up to the minimum 1s.",
        "example": "30s",
        "internal_key": "yokozuna.solr_startup_wait",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    },
    "secure_referer_check": {
        "default": "on",
        "description": "Measures were added to Riak 1.2 to counteract cross-site\nscripting and request-forgery attacks. Some reverse-proxies cannot\nremove the Referer header and make serving data directly from Riak\nimpossible. Turning secure_referer_check = off disables this\nsecurity check.",
        "example": "",
        "internal_key": "riak_kv.secure_referer_check",
        "valid": ["on", "off"]
    },
    "storage_backend": {
        "default": "bitcask",
        "description": "Specifies the storage engine used for Riak's key-value data\nand secondary indexes (if supported).",
        "example": "bitcask",
        "internal_key": "riak_kv.storage_backend",
        "valid": ["bitcask", "leveldb", "memory", "multi", "prefix_multi"]
    },
    "strong_consistency": {
        "default": "off",
        "description": "Enable consensus subsystem. Set to 'on' to enable the\nconsensus subsystem used for strongly consistent Riak operations.",
        "example": "",
        "internal_key": "riak_core.enable_consensus",
        "valid": ["on", "off"]
    },
    "tls_protocols.sslv3": {
        "default": "off",
        "description": "Determine which SSL/TLS versions are allowed. By default only TLS 1.2\nis allowed, but other versions can be enabled if clients don't support the\nlatest TLS standard. It is *strongly* recommended that SSLv3 is not enabled\nunless absolutely necessary. More than one protocol can be enabled at once.",
        "example": "",
        "internal_key": "riak_api.tls_protocols",
        "valid": ["on", "off"]
    },
    "tls_protocols.tlsv1": {
        "default": "off",
        "description": "Determine which SSL/TLS versions are allowed. By default only TLS 1.2\nis allowed, but other versions can be enabled if clients don't support the\nlatest TLS standard. It is *strongly* recommended that SSLv3 is not enabled\nunless absolutely necessary. More than one protocol can be enabled at once.",
        "example": "",
        "internal_key": "riak_api.tls_protocols",
        "valid": ["on", "off"]
    },
    "tls_protocols.tlsv1.1": {
        "default": "off",
        "description": "Determine which SSL/TLS versions are allowed. By default only TLS 1.2\nis allowed, but other versions can be enabled if clients don't support the\nlatest TLS standard. It is *strongly* recommended that SSLv3 is not enabled\nunless absolutely necessary. More than one protocol can be enabled at once.",
        "example": "",
        "internal_key": "riak_api.tls_protocols",
        "valid": ["on", "off"]
    },
    "tls_protocols.tlsv1.2": {
        "default": "on",
        "description": "Determine which SSL/TLS versions are allowed. By default only TLS 1.2\nis allowed, but other versions can be enabled if clients don't support the\nlatest TLS standard. It is *strongly* recommended that SSLv3 is not enabled\nunless absolutely necessary. More than one protocol can be enabled at once.",
        "example": "",
        "internal_key": "riak_api.tls_protocols",
        "valid": ["on", "off"]
    },
    "transfer_limit": {
        "default": "2",
        "description": "Number of concurrent node-to-node transfers allowed.",
        "example": "",
        "internal_key": "riak_core.handoff_concurrency",
        "valid": "an integer"
    },
    "vnode_management_timer": {
        "default": "10s",
        "description": "Interval of time between vnode management\nactivities. Modifying this will change the amount of time between\nattemps to trigger handoff between this node and any other member\nof the cluster.",
        "example": "",
        "internal_key": "riak_core.vnode_management_timer",
        "valid": "a time duration with units, e.g. '10s' for 10 seconds"
    }
};

export default RiakConfigHelp;
