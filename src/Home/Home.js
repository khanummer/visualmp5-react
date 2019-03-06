import React from 'react';
import  { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const User = ({data, mutate}) => {
  console.log(data)

  if(data.loading){
    return <p>Loading...</p>
  }
  
  if(data.error){
    return <p>{data.error.message}</p>
  }

  const deleteUser = (id, e) => {
    mutate({
      variables: {id: id},
      update: (store, {data: {deleteUser}, error }) => {
        console.log(error, 'this is error');
        const data = store.readQuery({ query: usersListQuery});
        const newUsers = data.getUsers.filter((user) => user.id != id);

        store.writeQuery({ query: usersListQuery, data: {getUsers: newUsers}})
      }

    })
  } 

  const usersList = data.getUsers.map((user) => {
    return (
      <li key={user.id}>
        {user.profilePic}
        {user.username}
        {user.email}
        <button onClick={deleteUser.bind(null, user.id)}>DELETE </button>
      </li>
    )
  })

    return (
    <div>
        <ul>
            {usersList}
        </ul>
    </div>

    );
}
export const usersListQuery = gql `
  query {
    getUsers {
      id 
      username
      password
      email
      profilePic
    }
  }
`

export const deleteUserMutation = gql `

  mutation deleteUser($id: ID!)
  {
    deleteUser(id: $id)
  }

`
export default compose(
  graphql(usersListQuery),
  graphql(deleteUserMutation)
)(User)
