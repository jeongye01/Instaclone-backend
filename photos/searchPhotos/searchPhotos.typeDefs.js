export default gql`
  type Query{
    searchPhotos(keyword:String!):[Photo]
  }
`;