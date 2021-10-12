#!/bin/bash

# Checks the size of generated files and verifies they aren't growing
# unreasonably.

# These values should be updated with each release

# Size of blockly_compressed.js
# Q2 2019	2.20190722.0	812688
# Q3 2019	3.20191014.0	538781
# Q4 2019	3.20200123.0	609855
# Q1 2020	3.20200402.0	619341
# Q2 2020	3.20200625.0	621811
# Q3 2020	3.20200924.0	641216
# Q4 2020   4.20201217.0    653624
# Q1 2021   5.20210325.0    653957
blockly_size_expected=653957

# Size of blocks_compressed.js
# Q2 2019	2.20190722.0	75618
# Q3 2019	3.20191014.0	76455
# Q4 2019	3.20200123.0	75629
# Q1 2020	3.20200402.0	75805
# Q2 2020	3.20200625.0	76360
# Q3 2020	3.20200924.0	76429
# Q4 2020   4.20201217.0    76693
# Q1 2021   5.20210325.0    76693
blocks_size_expected=76693

# Size of blockly_compressed.js.gz
# Q2 2019	2.20190722.0	180925
# Q3 2019	3.20191014.0	119064
# Q4 2019	3.20200123.0	131897
# Q1 2020	3.20200402.0	134133
# Q2 2020	3.20200625.0	135181
# Q3 2020	3.20200924.0	138003
# Q4 2020   4.20201217.0    138115
# Q1 2021   5.20210325.0    136118
blockly_gz_size_expected=136118

# Size of blocks_compressed.js.gz
# Q2 2019	2.20190722.0	14552
# Q3 2019	3.20191014.0	15064
# Q4 2019	3.20200123.0	14897
# Q1 2020	3.20200402.0	14966
# Q2 2020	3.20200625.0	15195
# Q3 2020	3.20200924.0	15231
# Q4 2020   4.20201217.0    15224
# Q1 2021   5.20210325.0    15285
blocks_gz_size_expected=15285

# ANSI colors
BOLD_GREEN='\033[1;32m'
BOLD_RED='\033[1;31m'
ANSI_RESET='\033[0m'

# Build the compressed files for core and blocks
echo "Building files"
npm install
gulp buildCompressed
gulp buildBlocks

# GZip them for additional size comparisons
echo "Zipping the compressed files"
gzip -c blockly_compressed.js > blockly_compressed.js.gz
gzip -c blocks_compressed.js > blocks_compressed.js.gz

# Check the sizes of the files

has_failed=0

compare_size() {
	local name=$1
	local expected=$2
	local compare=$(echo "$expected * 1.1 / 1" | bc)

	local size=$(wc -c <"$name")

	if (( $size > $compare))
	then
		echo -e "${BOLD_RED}Failed: Size of $name has grown more than 10%. $size vs $expected ${ANSI_RESET}" >&2
  		has_failed=1
  	else
  		echo -e "${BOLD_GREEN}Size of $name at $size compared to previous $expected.${ANSI_RESET}"
  	fi
}

compare_size "blockly_compressed.js" $blockly_size_expected
compare_size "blocks_compressed.js" $blocks_size_expected
compare_size "blockly_compressed.js.gz" $blockly_gz_size_expected
compare_size "blocks_compressed.js.gz" $blocks_gz_size_expected

exit $has_failed
