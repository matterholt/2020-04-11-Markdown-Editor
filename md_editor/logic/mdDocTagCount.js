function htmlTags(mdString) {
  const htmlTag = /<(\w+)/.exec(mdString);
  return htmlTag[1];
}

function countTags(mdHtmlTags) {
  // make the tag
  const tagsAmount = {};

  for (let i = 0; i < mdHtmlTags.length; i++) {
    if (mdHtmlTags[i] in tagsAmount) {
      tagsAmount[mdHtmlTags[i]] += 1;
    } else {
      tagsAmount[mdHtmlTags[i]] = 1;
    }
  }
  return tagsAmount;
}

export default function docTagCounter(mdDocList) {
  // Get the list of Tag in doc
  const tagList = mdDocList.map((htmlString) => {
    return htmlTags(htmlString);
  });

  // Count Tags in list
  const tagAmount = countTags(tagList);

  return tagAmount;
}
