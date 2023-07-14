/**
 * Create new array on each iteration.
 * 
 * const enhanceApiResponseBad = (apiResponse) => {
 *   const filteredChannels = []
 *   const identificatorChannels = []
 *   const modifyImagesChannels = []
 * 
 *   for (const channel of apiResponse.channels) {}
 *   for (const channel of filteredChannels) {}
 *   for (const channel of identificatorChannels) {}
 *   for (const channel of modifyImagesChannels) {}
 * 
 *   return channels;
 * }
 */

const enhanceApiResponseBad = (apiResponse) => {
  const channels = apiResponse.channels
    .filter(filterEmptyTimelines)
    .map(addIdentificator)
    .map(modifyImages)
    .map(removeParams)
    .map(setSession)

  return channels;
}

/**
 * Create only one array.
 */
const enhanceApiResponseGood = (apiResponse) => {
  const channels = apiResponse.channels.reduce((acc, channel) => {
    if (!hasEmptyTimelines(channel.timelines)) {
      acc.push(
        setChannelURL(reduceImagesObject(addIDToChannel(channel)))
      );
    }

    return acc;
  }, []);
 
  return channels;
}