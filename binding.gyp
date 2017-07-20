{
    "targets": [
        {
            "target_name": "node-hll",
            "sources": [
                "src/module.cc",
                "deps/hll/src/hll.c"
            ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")",
                "<!(node -e \"require('nnu')\")",
                "deps/hll/src"
            ]
        }
    ]
}