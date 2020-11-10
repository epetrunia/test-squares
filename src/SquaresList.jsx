import React, { Component } from 'react';
import './App.css';

class SquaresList extends Component {
  constructor() {
    super();

    this.state = {
      list: getSquares(),
      error: null,
    };
  }

  handleClick = (id) => {
    this.setState((state) => {
      const sq = state.list.find((item) => item.id === id);
      const newList = state.list.map((item) =>
        item.id === id ? { ...sq, isActive: !sq.isActive } : item
      );

      return {
        list: newList,
      };
    });
  };

  handleSubmit = () => {
    const { list } = this.state;
    const blueSelectedSquares = list.filter(
      (square) => square.color === 'blue' && square.isActive
    );
    const allSelectedSquares = list.filter((square) => square.isActive);

    const isValidated =
      allSelectedSquares.length === blueSelectedSquares.length &&
      !!allSelectedSquares.length &&
      !!blueSelectedSquares.length;

    if (isValidated) {
      alert('Success!');
      this.setState({ list: getSquares(), error: false });
    } else {
      console.error('Validation failed');
      this.setState({ error: true });
    }
  };

  render() {
    const { list, error } = this.state;
    return (
      <div className='container'>
        <h1 className='header'>Choose all blue squares</h1>
        <div className='list'>
          {list.map((square) => {
            const style = {
              backgroundColor: square.color,
              borderColor: square.isActive ? 'yellow' : 'transparent',
            };
            return (
              <div
                key={square.id}
                className='square'
                style={style}
                onClick={() => this.handleClick(square.id)}
              ></div>
            );
          })}
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        {error && <p className='error'>Validation failed. Try again.</p>}
      </div>
    );
  }
}

export default SquaresList;

function getSquares() {
  let blueSquares = [],
    totalBlue = Math.floor(Math.random() * (4 - 1)) + 1;
  while (totalBlue--) blueSquares.push({ color: 'blue', isActive: false });

  function getRandomColor() {
    const colors = ['Black', 'Grey', 'LightSeaGreen'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  let randomSquares = [],
    totalRandom = 6 - blueSquares.length;
  while (totalRandom--)
    randomSquares.push({ color: getRandomColor(), isActive: false });

  const squares = [...blueSquares, ...randomSquares];
  squares.forEach((item, i) => (item.id = i + 1));
  return squares;
}
