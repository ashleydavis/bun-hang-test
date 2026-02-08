# Bun Startup Hang – Reproduction

This repo helps reproduce a bug where **Bun sometimes hangs on startup** when running a script that uses commander + picocolors (see minimal repro in `index.ts`).

**Intermittency:** The hang is intermittent—a full 5000-run test may complete or may hit a hang (e.g. run 408, 2471, 3405). In the Photosphere project, the same class of hang shows up **more frequently** in smoke tests than in this minimal repro; this repo is tuned to reproduce it with a small script and many iterations.

## Bun versions that exhibit the hang

| Bun version | Hang reproduced? | Notes |
|-------------|------------------|--------|
| 1.3.8       | Yes              | Run 2471 (commander 14.0.3) |
| 1.3.7       | Yes              | Run 408  |
| 1.3.6       | No               | 11 full runs (5000× each) completed without hang |

## Operating systems

The hang has been reproduced on:

- **Linux** (e.g. kernel 6.14.0-37-generic)

Other operating systems (macOS, Windows) have not been tested in this repo. If you confirm the issue on another OS, please add it here.

## Prerequisites

- **Bun 1.3.8** (or the version you want to test)
- Bash (for the runner script)

Check your Bun version:

```bash
bun --version
```

## Contents

| File          | Description                                      |
|---------------|--------------------------------------------------|
| `index.ts`    | Minimal Bun “hello world” script                 |
| `run-test.sh` | Runs `index.ts` 5000 times with a 1-minute timeout per run |
| `README.md`   | This file                                        |

## How to Reproduce

### One-off run (manual)

Run the hello world script once:

```bash
bun run index.ts
```

Expected: it prints `Hello, world!` and exits.  
If it hangs, you’ve hit the bug.

### Automated run (5000 runs, 1-minute timeout)

1. Make the runner executable (if needed):

   ```bash
   chmod +x run-test.sh
   ```

2. Run the script:

   ```bash
   ./run-test.sh
   ```

The script:

- Runs `bun run index.ts` **5000 times** in a loop.
- Uses `timeout --foreground 60` so each run is killed if it takes **longer than 1 minute**.
- If a run times out (exit code 124), it prints `HANG DETECTED` and exits with 124 so you can see which run number hung.
- If any run fails for another reason, it exits with that exit code.

So:

- **No hang**: script finishes and prints `Completed 5000 runs successfully.`
- **Hang**: one run exceeds 1 minute, you get `HANG DETECTED: Run N timed out after 60s` and exit code 124.

## For the Bun Bug Report

When reporting to the Bun team, you can include:

- **Bun version**: `bun --version` (e.g. 1.3.8)
- **OS**: e.g. Linux 6.14.0-37-generic
- **Reproduction**: “Run `./run-test.sh`; occasionally a run hangs and is killed after 60s (exit 124).”
- **Single-run hang**: “Sometimes `bun run index.ts` hangs and never exits.”
- **Script**: The `index.ts` and `run-test.sh` from this repo (or a link to the repo).

You can also run a smaller batch to save time, e.g. change `RUNS=5000` to `RUNS=100` in `run-test.sh`.
