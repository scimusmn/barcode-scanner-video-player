#!/bin/bash

# Creates a JSON file containing a list of videos
# in the public/videos directory.

set -eou pipefail

VIDEO_DIR="public/videos/"
FILE="videos.json"

OUTPUT=""

for i in "${VIDEO_DIR}"*.mp4
do
    FILENAME=${i/${VIDEO_DIR}/""}
    # Skip the screensaver.
    if [[ ${FILENAME} != *"_idle"* ]];
    then
        OUTPUT=\"$FILENAME\",${OUTPUT}
    fi
done

OUTPUT_JSON="[${OUTPUT::${#OUTPUT}-1}]"
echo "${OUTPUT_JSON}" > "${FILE}"
