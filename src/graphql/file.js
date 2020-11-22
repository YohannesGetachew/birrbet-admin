import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($id: String!, $image: String!) {
    updateProfileImage(id: $id, image: $image) {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      accountBalance
      profileImage
      createdAt
    }
  }
`;
