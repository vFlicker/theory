const enhanceApiResponseBad = (apiResponse) => {
  const channels = apiResponse.channels
    .filter(filterEmptyTimelines)
    .map(addIdentificator)
    .map(modifyImages)
    .map(removeParams)
    .map(setSession)

  return channels;
}

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