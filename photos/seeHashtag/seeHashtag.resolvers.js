import client from "../../client";

export default{
  Query:{
    seeHashtag:(_,{hashtag})=>client.hashtag.findUnique({
      where:{
        hashtag,
      }
    }),
    Hashtag:{
      photos:({id},{page},{loggedInUser})=>client.hashtag.findUnique({
        where:{id}
      }).photos(),
      totalPhotos:({id})=>client.photo.count({
        where:{
          hashtags:{
            some:{
              id
            }
          }
        }}),
    }
  }
}