export const processHashtags=(caption)=>{
  const hashtags=cation.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag)=>({
    where:{hashtag},
    create:{hashtag},
  }));
}