{
    "targets": [
        {
            "target_name": "node-hll",
            "sources": [
                "src/module.cc",
                "deps/hll/src/hll.c",
                "deps/hll/deps/MurmurHash3/MurmurHash3.c"
            ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")",
                "<!(node -e \"require('nnu')\")",
                "deps/hll/src"
            ]
        }
    ]
}