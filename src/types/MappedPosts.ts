import PostWithUser from "./PostWithUser"

export default interface MappedPosts extends PostWithUser {
  isSaved: boolean
}
