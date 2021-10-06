import { gql } from 'apollo-server-core';

export default gql`
  type SeeFollowersResult{
    ok:Boolean!
    error:String
    followers:[User]
    totalPages:Int
  }
  type Query{
    seeFollwers(username:String!,page:Int!):SeeFollowersResult!
  }
`;