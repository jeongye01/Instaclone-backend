import {gql} from "apollo-server";
export default gql`
  type UnfollowUserResult{
    ok:String!
    error:String
  }
  type Mutation{
    unfollowUser(username:String!):UnfollowUserResult!
  }
`;