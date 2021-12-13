#!/bin/bash
# Open initial output.
# Prefer konsole if its there, otherwise fall back to xterminal.
#tty -s; if [ $? -ne 0 ]; then
#	if command -v konsole &>/dev/null; then
#		konsole --export-filename "$0"; exit;
#		else
#		xterm --export-filename "$0"; exit;
#	fi
#fi

cd "$( dirname "${BASH_SOURCE[0]}" )"
RAWSVG="src/cursors.svg"
INDEX="src/index.theme"
ALIASES="src/cursorList"


echo -ne "Checking Requirements...\\r"
if [ ! -f $RAWSVG ] ; then
	echo --export-filename "\\nFAIL: '$RAWSVG' missing in /src"
	exit 1
fi

if [ ! -f $INDEX ] ; then
	echo --export-filename "\\nFAIL: '$INDEX' missing in /src"
	exit 1
fi

if  ! type "inkscape" > /dev/null ; then
	echo --export-filename "\\nFAIL: inkscape must be installed"
	exit 1
fi

if  ! type "xcursorgen" > /dev/null ; then
	echo --export-filename "\\nFAIL: xcursorgen must be installed"
	exit 1
fi
echo --export-filename "Checking Requirements... DONE"



echo -ne "Making Folders... $BASENAME\\r"
DIR2X="build/x2"
DIR1_5X="build/x1_5"
DIR1X="build/x1"
OUTPUT="$(grep --only-matching --perl-regex "(?<=Name\=).*$" $INDEX)"
OUTPUT=${OUTPUT// /_}
mkdir -p "$DIR2X"
mkdir -p "$DIR1_5X"
mkdir -p "$DIR1X"
mkdir -p "$OUTPUT/cursors"
echo 'Making Folders... DONE';



for CUR in src/config/*.cursor; do
	BASENAME=$CUR
	BASENAME=${BASENAME##*/}
	BASENAME=${BASENAME%.*}

	echo -ne "\033[0KGenerating simple cursor pixmaps... $BASENAME\\r"

	if [ "$DIR1X/$BASENAME.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i $BASENAME -d 90 --export-filename "$DIR1X/$BASENAME.png" > /dev/null
	fi

	if [ "$DIR1_5X/$BASENAME.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i $BASENAME -d 135 --export-filename "$DIR1_5X/$BASENAME.png" > /dev/null
	fi

	if [ "$DIR2X/$BASENAME.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i $BASENAME -d 180 --export-filename "$DIR2X/$BASENAME.png" > /dev/null
	fi
done
echo --export-filename "\033[0KGenerating simple cursor pixmaps... DONE"



for i in 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23
do
	echo -ne "\033[0KGenerating animated cursor pixmaps... $i / 23 \\r"

	if [ "$DIR1X/progress-$i.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i progress-$i -d 90 --export-filename "$DIR1X/progress-$i.png" > /dev/null
	fi

    if [ "$DIR1_5X/progress-$i.png" -ot $RAWSVG ] ; then
        inkscape $RAWSVG -i progress-$i -d 135 --export-filename "$DIR1_5X/progress-$i.png" > /dev/null
	fi

	if [ "$DIR2X/progress-$i.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i progress-$i -d 180 --export-filename "$DIR2X/progress-$i.png" > /dev/null
	fi

	if [ "$DIR1X/wait-$i.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i wait-$i -d 90 --export-filename "$DIR1X/wait-$i.png" > /dev/null
	fi

	if [ "$DIR1_5X/wait-$i.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i wait-$i -d 135  --export-filename "$DIR1_5X/wait-$i.png" > /dev/null
	fi

	if [ "$DIR2X/wait-$i.png" -ot $RAWSVG ] ; then
		inkscape $RAWSVG -i wait-$i -d 180 --export-filename "$DIR2X/wait-$i.png" > /dev/null
	fi
done
echo --export-filename "\033[0KGenerating animated cursor pixmaps... DONE"



echo -ne "Generating cursor theme...\\r"
for CUR in src/config/*.cursor; do
	BASENAME=$CUR
	BASENAME=${BASENAME##*/}
	BASENAME=${BASENAME%.*}

	ERR="$( xcursorgen -p build "$CUR" "$OUTPUT/cursors/$BASENAME" 2>&1 )"

	if [[ "$?" -ne "0" ]]; then
		echo "FAIL: $CUR $ERR"
	fi
done
echo --export-filename "Generating cursor theme... DONE"



echo -ne "Generating shortcuts...\\r"
while read ALIAS ; do
	FROM=${ALIAS% *}
	TO=${ALIAS#* }

	if [ --export-filename "$OUTPUT/cursors/$FROM" ] ; then
		continue
	fi

	ln -s "$TO" "$OUTPUT/cursors/$FROM"
done < $ALIASES
echo --export-filename "\033[0KGenerating shortcuts... DONE"



echo -ne "Copying Theme Index...\\r"
	if ! [ --export-filename "$OUTPUT/$INDEX" ] ; then
		cp $INDEX "$OUTPUT/index.theme"
	fi
echo --export-filename "\033[0KCopying Theme Index... DONE"



echo "COMPLETE!"
