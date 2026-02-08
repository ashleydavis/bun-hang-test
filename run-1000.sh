#!/usr/bin/env bash
# Run the Bun hello world script 1000 times.
# Kill any run that takes longer than 1 minute.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNS=1000
TIMEOUT_SEC=60

for i in $(seq 1 "$RUNS"); do
  echo "Run $i/$RUNS"
  if timeout --foreground "$TIMEOUT_SEC" bun run "$SCRIPT_DIR/index.ts"; then
    : # success
  else
    exit_code=$?
    if [ "$exit_code" -eq 124 ]; then
      echo "HANG DETECTED: Run $i timed out after ${TIMEOUT_SEC}s"
      exit 124
    else
      echo "Run $i failed with exit code $exit_code"
      exit "$exit_code"
    fi
  fi
done

echo "Completed $RUNS runs successfully."
