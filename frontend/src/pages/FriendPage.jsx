import { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './scss/friendPage.scss';

const FriendPage = () => {
  const [friendId, setFriendId] = useState();
  const [showFriend, setShowFriend] = useState('');
  const [showFriends, setShowFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendExercises, setFriendExercises] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await fetch('http://localhost:8080/users', {
        credentials: 'include',
      });
      const data = await res.json();
      setFriends(data);
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const displayFriends = async () => {
      const res = await fetch('http://localhost:8080/friends', {
        credentials: 'include',
      });
      const data = await res.json();
      setShowFriends(data);
    };
    displayFriends();
  }, []);

  const addFriend = async () => {
    const friendName = showFriend;

    const res = await fetch('http://localhost:8080/friends', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ friendName }),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(res.text())
  };

  const getFriendsExercises = async (friend) => {
    const friendName = friend;

    const res = await fetch('http://localhost:8080/friends/Exercises', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ friendName }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (res.status === 500) {
      setFriendExercises([{ id: 0, task: 'This user has no Exercises' }]);
      return;
    }
    const data = await res.json();
    setFriendExercises(data);
  };

  const friendsChosen = (friend) => {
    setShowFriend(friend.username);
    setFriendId(friend._id);
  };

  return (
    <div className='friendPage'>
      <p>Search for friends:</p>
      {friends && (
        <ReactSearchAutocomplete
          items={friends}
          fuseOptions={{ keys: ['username'] }}
          resultStringKeyName='username'
          onSelect={friendsChosen}
        />
      )}
      <p>{showFriend}</p>
      {showFriend && <button onClick={addFriend}>Add this friend</button>}
      <ul>
        {showFriends?.map((friend, index) => {
          return (
            <div key={index}>
              <li>{friend}</li>
              <button
                onClick={() => {
                  getFriendsExercises(friend);
                }}
              >
                See Exercises
              </button>
            </div>
          );
        })}
      </ul>
      <div className='friendsExercises'>
        {friendExercises &&
          friendExercises.map((exercise) => {
            return (
              <p key={exercise._id}>
                {exercise._id} {exercise.exerciseName}
              </p>
          )
        })}
      </div>
    </div>
  );
};

export { FriendPage };
