import gql from "graphql-tag";

export const VERIFY_EMAIL_MUTATION = gql`
  mutation emailLoginVerify($email: String!, $token: String!) {
    emailLoginVerify(email: $email, token: $token) {
      token
      user {
        id
        email
        username
        privacyPolicyAccepted
        marketingAccepted
        consent_id
        sanBalance
        ethAccounts {
          address
          sanBalance
        }
      }
    }
  }
`;
