function docString(docString) {
  if (docString != "") {
    return docString;
  }
}

function docNewLineReplace(docString) {
  const replaceNewLine = docString.replace(/(\r\n|\n|\r)/gm, " ");
  return replaceNewLine;
}

export default function mdCleanUpList(mdDocList) {
  // filter the undefined dom elems
  const filterOutSpaces = mdDocList.filter((docItem) => {
    return docString(docItem);
  });

  const cleanList = filterOutSpaces.map((docString) => {
    return docNewLineReplace(docString);
  });

  return cleanList;
}
