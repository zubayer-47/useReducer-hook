import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

const initialState = {
  data: [],
  click: false,
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'success':
      return {
        data: action.data,
      };
    case 'failed':
      return {
        click: action.status,
      };
    default:
      return state;
  }
};

export default function App() {
  const [{ data, click }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function getData() {
      try {
        const res =
          click &&
          (await axios.get('https://jsonplaceholder.typicode.com/posts/'));
        dispatch({
          type: 'success',
          data: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [click]);

  const handleClick = () => {
    dispatch({
      type: 'failed',
      status: true,
    });
  };
  return (
    <div>
      <p>{click && 'Hello'}</p>
      <ol typeof="number">
        {data &&
          data.map(({ id, body }) => (
            <li
              style={{
                background: `rgba(0, ${id}, ${id}, 0.${id})`,
                margin: '5px 0',
                padding: '10px 5px',
              }}
              key={id}
            >
              {body}
            </li>
          ))}
      </ol>

      {!click && <button onClick={handleClick}>get data</button>}
    </div>
  );
}
