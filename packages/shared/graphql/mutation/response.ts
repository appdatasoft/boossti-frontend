import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation($formId: ID!, $parentId: ID, $values: [FieldValue2Input]) {
    createResponse(formId: $formId, parentId: $parentId, values: $values) {
      _id
      formId
      parentId
      values {
        _id
        field
        value
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
      }
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_RESPONSE = gql`
  mutation MyMutation($_id: ID!, $values: [FieldValue2Input]) {
    updateResponse(_id: $_id, values: $values) {
      _id
      formId
      parentId
      values {
        _id
        field
        value
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
      }
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const DELETE_RESPONSE = gql`
  mutation MyMutation($_id: ID!) {
    deleteResponse(_id: $_id)
  }
`;