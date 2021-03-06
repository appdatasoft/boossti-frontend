import { gql } from '@apollo/client';

export const GET_LIST_TYPES = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getListTypes(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        media {
          url
          caption
        }
        inUse
        active
        createdAt
        createdBy {
          _id
          name
        }
      }
    }
  }
`;

export const GET_LIST_TYPE_BY_SLUG = gql`
  query MyQuery($slug: String!) {
    getListTypeBySlug(slug: $slug) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
      fields {
        _id
        label
        fieldType
        options
        typeId {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
      options
      createdAt
      createdBy {
        _id
        name
      }
    }
  }
`;

export const GET_MENU_LIST_TYPES = gql`
  query getMenuListTypes {
    getMenuListTypes {
      _id
      slug
      title
    }
  }
`;

export const GET_LIST_ITEMS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $types: [ID], $search: String) {
    getListItems(limit: $limit, page: $page, types: $types, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        types {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        createdAt
        createdBy {
          _id
          name
        }
      }
    }
  }
`;

export const GET_LIST_ITEMS = gql`
  query MyQuery($limit: Int, $page: Int, $types: [ID], $search: String) {
    getListItems(limit: $limit, page: $page, types: $types, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        types {
          _id
          title
          slug
        }
      }
    }
  }
`;

export const GET_MENTION_ITEMS = gql`
  query MyQuery($search: String) {
    getMentionItems(search: $search) {
      title
      _id
      category
      type
    }
  }
`;

export const GET_LIST_ITEM_BY_SLUG = gql`
  query getListItemBySlug($slug: String!) {
    getListItemBySlug(slug: $slug) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
      createdAt
      createdBy {
        _id
        name
      }
      values {
        _id
        field
        value
        values
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
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const GET_LIST_ITEM_BY_ID = gql`
  query MyQuery($_id: ID!) {
    getListItem(_id: $_id) {
      slug
      types {
        slug
      }
    }
  }
`;

export const GET_LIST_PAGE_MENTIONS = gql`
  query MyQuery($_id: ID!) {
    getListPageMentions(_id: $_id) {
      data {
        _id
      }
    }
  }
`;
